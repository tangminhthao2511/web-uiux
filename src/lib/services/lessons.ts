import crypto from "node:crypto";
import { getLessonStructuredContent } from "@/lib/curriculum/lessons";
import { CURRICULUM_LESSONS } from "@/lib/curriculum/seed-data";
import { getDb, getLocalDateKey } from "@/lib/db/sqlite";
import { getDashboardSnapshot } from "@/lib/services/dashboard";
import type { LessonDetailSnapshot } from "@/types/learning";

interface MilestoneRow {
  theory_confirmed: number;
  quiz_passed: number;
  note_saved: number;
}

interface QuizAttemptRow {
  score: number;
  total_questions: number;
  passed: number;
  answers_json: string;
  created_at: string;
}

function ensureMilestoneRow(lessonId: string): MilestoneRow {
  const db = getDb();
  const lesson = CURRICULUM_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) {
    throw new Error("Không tìm thấy bài học.");
  }

  const existing = db
    .prepare(
      "SELECT theory_confirmed, quiz_passed, note_saved FROM lesson_milestones WHERE lesson_id = ?"
    )
    .get(lessonId) as MilestoneRow | undefined;

  if (existing) {
    return existing;
  }

  const defaultNoteSaved = lesson.hasPracticeTask ? 0 : 1;
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO lesson_milestones (lesson_id, theory_confirmed, quiz_passed, note_saved, updated_at)
     VALUES (?, 0, 0, ?, ?)`
  ).run(lessonId, defaultNoteSaved, now);

  return {
    theory_confirmed: 0,
    quiz_passed: 0,
    note_saved: defaultNoteSaved,
  };
}

function reconcileLessonProgress(lessonId: string): void {
  const db = getDb();
  const lesson = CURRICULUM_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return;

  const milestones = ensureMilestoneRow(lessonId);
  const completedCount =
    (milestones.theory_confirmed ? 1 : 0) +
    (milestones.quiz_passed ? 1 : 0) +
    (milestones.note_saved ? 1 : 0);

  const isAllDone =
    milestones.theory_confirmed === 1 &&
    milestones.quiz_passed === 1 &&
    milestones.note_saved === 1;

  const now = new Date().toISOString();
  const today = getLocalDateKey();

  const existingProgress = db
    .prepare("SELECT status FROM lesson_progress WHERE lesson_id = ?")
    .get(lessonId) as { status: string } | undefined;

  const nextStatus = isAllDone ? "completed" : "in_progress";
  const completedAt = isAllDone ? now : null;

  if (!existingProgress) {
    db.prepare(
      `INSERT INTO lesson_progress (
        lesson_id, status, milestones_completed, total_milestones, last_accessed_at, completed_at, updated_at
      ) VALUES (?, ?, ?, 3, ?, ?, ?)`
    ).run(lessonId, nextStatus, completedCount, now, completedAt, now);
  } else {
    db.prepare(
      `UPDATE lesson_progress
       SET status = CASE WHEN status = 'completed' THEN 'completed' ELSE ? END,
           milestones_completed = ?,
           total_milestones = 3,
           last_accessed_at = ?,
           completed_at = COALESCE(completed_at, ?),
           updated_at = ?
       WHERE lesson_id = ?`
    ).run(nextStatus, completedCount, now, completedAt, now, lessonId);
  }

  if (isAllDone) {
    const alreadyAwarded = db
      .prepare(
        "SELECT id FROM xp_transactions WHERE source_type = 'lesson' AND source_id = ? LIMIT 1"
      )
      .get(lessonId);

    if (!alreadyAwarded) {
      db.prepare(
        `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
         VALUES (?, ?, 'lesson_completed', ?, ?)`
      ).run(crypto.randomUUID(), today, lessonId, now);

      db.prepare(
        `INSERT INTO xp_transactions (id, source_type, source_id, amount, activity_date, created_at)
         VALUES (?, 'lesson', ?, 25, ?, ?)`
      ).run(crypto.randomUUID(), lessonId, today, now);
    }
  }
}

export function getLessonDetail(lessonId: string): LessonDetailSnapshot {
  const dashboard = getDashboardSnapshot();
  let targetLesson = null;
  let targetStage = null;

  for (const stage of dashboard.stages) {
    for (const mod of stage.modules) {
      const found = mod.lessons.find((l) => l.id === lessonId);
      if (found) {
        targetLesson = found;
        targetStage = stage;
        break;
      }
    }
    if (targetLesson) break;
  }

  if (!targetLesson || !targetStage) {
    throw new Error("Không tìm thấy bài học được yêu cầu.");
  }

  const db = getDb();
  const milestones = ensureMilestoneRow(lessonId);
  const content = getLessonStructuredContent(lessonId);

  const attemptRow = db
    .prepare(
      `SELECT score, total_questions, passed, answers_json, created_at
       FROM quiz_attempts
       WHERE lesson_id = ?
       ORDER BY created_at DESC
       LIMIT 1`
    )
    .get(lessonId) as QuizAttemptRow | undefined;

  let latestQuizAttempt: LessonDetailSnapshot["latestQuizAttempt"] = null;
  if (attemptRow) {
    let parsedAnswers: Record<string, string> = {};
    try {
      parsedAnswers = JSON.parse(attemptRow.answers_json) as Record<
        string,
        string
      >;
    } catch {
      parsedAnswers = {};
    }
    latestQuizAttempt = {
      score: attemptRow.score,
      totalQuestions: attemptRow.total_questions,
      passed: attemptRow.passed === 1,
      answers: parsedAnswers,
      createdAt: attemptRow.created_at,
    };
  }

  const noteRow = db
    .prepare("SELECT content FROM user_notes WHERE lesson_id = ?")
    .get(lessonId) as { content: string } | undefined;

  // Find next lesson in curriculum
  const allLessons = dashboard.stages.flatMap((s) =>
    s.modules.flatMap((m) =>
      m.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        stageOrder: s.order,
      }))
    )
  );
  const currentIdx = allLessons.findIndex((l) => l.id === lessonId);
  const nextLesson =
    currentIdx >= 0 && currentIdx + 1 < allLessons.length
      ? allLessons[currentIdx + 1]
      : null;

  const milestonesDoneCount =
    (milestones.theory_confirmed ? 1 : 0) +
    (milestones.quiz_passed ? 1 : 0) +
    (milestones.note_saved ? 1 : 0);

  return {
    lesson: {
      ...targetLesson,
      milestonesCompleted: milestonesDoneCount,
      totalMilestones: 3,
    },
    stageOrder: targetStage.order,
    stageTitle: targetStage.title,
    isStageLocked: targetStage.status === "locked",
    lockReason: targetStage.lockReason,
    content,
    milestones: {
      theoryConfirmed: milestones.theory_confirmed === 1,
      quizPassed: milestones.quiz_passed === 1,
      noteSaved: milestones.note_saved === 1,
    },
    latestQuizAttempt,
    personalNote: noteRow?.content ?? "",
    nextLesson,
  };
}

export function confirmLessonTheory(lessonId: string): {
  detail: LessonDetailSnapshot;
  dashboard: ReturnType<typeof getDashboardSnapshot>;
} {
  ensureMilestoneRow(lessonId);
  const db = getDb();
  const now = new Date().toISOString();

  db.prepare(
    "UPDATE lesson_milestones SET theory_confirmed = 1, updated_at = ? WHERE lesson_id = ?"
  ).run(now, lessonId);

  reconcileLessonProgress(lessonId);

  return {
    detail: getLessonDetail(lessonId),
    dashboard: getDashboardSnapshot(),
  };
}

export function submitLessonQuiz(
  lessonId: string,
  answers: Record<string, string>
): {
  detail: LessonDetailSnapshot;
  dashboard: ReturnType<typeof getDashboardSnapshot>;
  score: number;
  totalQuestions: number;
  passed: boolean;
} {
  ensureMilestoneRow(lessonId);
  const content = getLessonStructuredContent(lessonId);
  const totalQuestions = content.quiz.length;
  if (totalQuestions === 0) {
    throw new Error("Bài học này chưa có câu hỏi kiểm tra.");
  }

  let score = 0;
  for (const q of content.quiz) {
    if (answers[q.id] === q.correctOptionId) {
      score += 1;
    }
  }

  const passingThreshold = Math.ceil(totalQuestions * 0.7);
  const passed = score >= passingThreshold;

  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();

  db.prepare(
    `INSERT INTO quiz_attempts (id, lesson_id, answers_json, score, total_questions, passed, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    crypto.randomUUID(),
    lessonId,
    JSON.stringify(answers),
    score,
    totalQuestions,
    passed ? 1 : 0,
    now
  );

  db.prepare(
    `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
     VALUES (?, ?, 'quiz_submitted', ?, ?)`
  ).run(crypto.randomUUID(), today, lessonId, now);

  if (passed) {
    db.prepare(
      "UPDATE lesson_milestones SET quiz_passed = 1, updated_at = ? WHERE lesson_id = ?"
    ).run(now, lessonId);
  }

  reconcileLessonProgress(lessonId);

  return {
    detail: getLessonDetail(lessonId),
    dashboard: getDashboardSnapshot(),
    score,
    totalQuestions,
    passed,
  };
}

export function saveLessonNote(
  lessonId: string,
  noteContent: string
): {
  detail: LessonDetailSnapshot;
  dashboard: ReturnType<typeof getDashboardSnapshot>;
} {
  ensureMilestoneRow(lessonId);
  const trimmed = noteContent.trim();
  if (trimmed.length < 5) {
    throw new Error("Vui lòng nhập ghi chú ít nhất 5 ký tự để lưu.");
  }
  if (trimmed.length > 3000) {
    throw new Error("Ghi chú tối đa 3000 ký tự.");
  }

  const db = getDb();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO user_notes (lesson_id, content, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(lesson_id) DO UPDATE SET content = excluded.content, updated_at = excluded.updated_at`
  ).run(lessonId, trimmed, now);

  db.prepare(
    "UPDATE lesson_milestones SET note_saved = 1, updated_at = ? WHERE lesson_id = ?"
  ).run(now, lessonId);

  reconcileLessonProgress(lessonId);

  return {
    detail: getLessonDetail(lessonId),
    dashboard: getDashboardSnapshot(),
  };
}
