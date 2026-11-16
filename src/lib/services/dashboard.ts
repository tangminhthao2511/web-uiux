import crypto from "node:crypto";
import {
  JUNIOR_MINI_GAMES,
  JUNIOR_PRACTICE_BRIEFS,
} from "@/lib/curriculum/junior-challenges";
import {
  CURRICULUM_LESSONS,
  CURRICULUM_MODULES,
  CURRICULUM_STAGES,
  INITIAL_SKILLS,
} from "@/lib/curriculum/seed-data";
import { getDb, getLocalDateKey, resetAllProgress } from "@/lib/db/sqlite";
import {
  getCompletedCodeLabIds,
  getGuidelineQuizState,
  getHotTopics,
  getKnowledgeBankState,
} from "@/lib/services/updates";
import type {
  DashboardSnapshot,
  DifficultyLevel,
  LearnerTrackMode,
  LearningResource,
  LearningTask,
  LessonStatus,
  LessonWithProgress,
  PracticeSubmission,
  ResourceTrack,
  SkillLevel,
  SkillSummary,
  StageStatus,
  StageWithProgress,
  TaskCategory,
} from "@/types/learning";

const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  0: "Chưa đánh giá",
  1: "Cấp 1 · Khởi đầu",
  2: "Cấp 2 · Cơ bản",
  3: "Cấp 3 · Trung bình",
  4: "Cấp 4 · Sẵn sàng Junior",
};

interface LessonProgressRow {
  lesson_id: string;
  status: LessonStatus;
  milestones_completed: number;
  total_milestones: number;
  last_accessed_at: string | null;
  completed_at: string | null;
}

interface TaskRow {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  target_id: string | null;
  due_date: string;
  is_completed: number;
  completed_at: string | null;
  xp_reward: number;
  is_system_task: number;
  created_at: string;
}

interface SkillRow {
  skill_id: string;
  level: number;
  evidence_count: number;
  evidence_summary: string;
}

interface ResourceRow {
  id: string;
  title: string;
  track: ResourceTrack;
  level: DifficultyLevel;
  stage_order: number;
  summary: string;
  key_points_json: string;
  web_vs_mobile_note: string | null;
  source_name: string;
  source_url: string | null;
  reviewed_at: string;
  is_custom: number;
  created_at: string;
}

interface MiniGameAttemptRow {
  challenge_id: string;
  is_correct: number;
  created_at: string;
}

interface PracticeSubmissionRow {
  id: string;
  brief_id: string;
  figma_url: string | null;
  image_data_url: string | null;
  rationale: string;
  self_scores_json: string;
  ai_review_json: string | null;
  status: "submitted" | "reviewed" | "self_audited";
  created_at: string;
}

function calculateStreakDays(activityDates: string[], todayKey: string): number {
  if (activityDates.length === 0) return 0;
  const dateSet = new Set(activityDates);

  const cursor = new Date(`${todayKey}T00:00:00`);
  if (!dateSet.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
    const yesterdayKey = getLocalDateKey(cursor);
    if (!dateSet.has(yesterdayKey)) {
      return 0;
    }
  }

  let streak = 0;
  while (true) {
    const key = getLocalDateKey(cursor);
    if (!dateSet.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function getDashboardSnapshot(): DashboardSnapshot {
  const db = getDb();
  const today = getLocalDateKey();

  const profileRow = db
    .prepare("SELECT name, background, target_role FROM user_profile WHERE id = ?")
    .get("primary-learner") as
    | { name: string; background: string; target_role: string }
    | undefined;

  const settingsRow = db
    .prepare(
      "SELECT gamification_enabled, daily_goal_xp, learner_mode, right_panel_open FROM user_settings WHERE id = ?"
    )
    .get("primary-learner") as
    | {
        gamification_enabled: number;
        daily_goal_xp: number;
        learner_mode: LearnerTrackMode;
        right_panel_open: number;
      }
    | undefined;

  const trackMode: LearnerTrackMode =
    settingsRow?.learner_mode === "all" ? "all" : "junior";
  const rightPanelOpen = (settingsRow?.right_panel_open ?? 1) === 1;

  const progressRows = db
    .prepare(
      `SELECT lesson_id, status, milestones_completed, total_milestones, last_accessed_at, completed_at
       FROM lesson_progress`
    )
    .all() as unknown as LessonProgressRow[];

  const progressMap = new Map<string, LessonProgressRow>();
  for (const row of progressRows) {
    progressMap.set(row.lesson_id, row);
  }

  const lessonsWithProgress: LessonWithProgress[] = CURRICULUM_LESSONS.map(
    (lesson) => {
      const saved = progressMap.get(lesson.id);
      const totalMilestones = lesson.completionCriteria.length;
      return {
        ...lesson,
        status: saved?.status ?? "not_started",
        milestonesCompleted: saved?.milestones_completed ?? 0,
        totalMilestones,
        lastAccessedAt: saved?.last_accessed_at ?? null,
        completedAt: saved?.completed_at ?? null,
      };
    }
  );

  const stageCompletionMap = new Map<string, boolean>();
  const stages: StageWithProgress[] = [];

  for (const stage of CURRICULUM_STAGES) {
    const stageModules = CURRICULUM_MODULES.filter(
      (m) => m.stageId === stage.id
    ).sort((a, b) => a.order - b.order);

    const modulesWithLessons = stageModules.map((mod) => ({
      ...mod,
      lessons: lessonsWithProgress
        .filter((l) => l.moduleId === mod.id)
        .sort((a, b) => a.order - b.order),
    }));

    const allStageLessons = modulesWithLessons.flatMap((m) => m.lessons);
    const totalLessons = allStageLessons.length;
    const completedLessons = allStageLessons.filter(
      (l) => l.status === "completed"
    ).length;
    const inProgressLessons = allStageLessons.filter(
      (l) => l.status === "in_progress"
    ).length;

    const isAllCompleted = totalLessons > 0 && completedLessons === totalLessons;
    stageCompletionMap.set(stage.id, isAllCompleted);

    let status: StageStatus = "not_started";
    let lockReason: string | null = null;

    if (trackMode === "junior") {
      if (isAllCompleted) {
        status = "completed";
      } else if (completedLessons > 0 || inProgressLessons > 0) {
        status = "in_progress";
      } else {
        status = "not_started";
      }
    } else if (
      stage.prerequisiteStageId &&
      !stageCompletionMap.get(stage.prerequisiteStageId)
    ) {
      const prereqStage = CURRICULUM_STAGES.find(
        (s) => s.id === stage.prerequisiteStageId
      );
      status = "locked";
      lockReason = prereqStage
        ? `Cần hoàn thành Chặng ${prereqStage.order}: ${prereqStage.title} trước khi mở khóa chính thức.`
        : "Cần hoàn thành chặng tiên quyết trước.";
    } else if (isAllCompleted) {
      status = "completed";
    } else if (completedLessons > 0 || inProgressLessons > 0) {
      status = "in_progress";
    }

    stages.push({
      ...stage,
      status,
      completedLessons,
      totalLessons,
      lockReason,
      modules: modulesWithLessons,
    });
  }

  const activeStages =
    trackMode === "junior" ? stages.filter((s) => s.order >= 4) : stages;
  const activeLessons = activeStages.flatMap((s) =>
    s.modules.flatMap((m) => m.lessons)
  );

  const totalLessons = activeLessons.length;
  const completedLessons = activeLessons.filter(
    (l) => l.status === "completed"
  ).length;
  const remainingLessons = totalLessons - completedLessons;

  const inProgressStage = activeStages.find((s) => s.status === "in_progress");
  const currentStage =
    inProgressStage ??
    (trackMode === "junior"
      ? activeStages.find((s) => s.order === 6) ?? activeStages[0]
      : stages.find((s) => s.status !== "completed" && s.status !== "locked") ??
        stages[0]);

  const inProgressCandidates = activeLessons
    .filter((l) => l.status === "in_progress")
    .sort((a, b) =>
      (b.lastAccessedAt ?? "").localeCompare(a.lastAccessedAt ?? "")
    );

  const recommendedLesson =
    inProgressCandidates[0] ??
    currentStage.modules
      .flatMap((m) => m.lessons)
      .find((l) => l.status !== "completed") ??
    null;

  const recommendedStage = recommendedLesson
    ? stages.find((s) => s.id === recommendedLesson.stageId) ?? currentStage
    : currentStage;

  const continueReason = inProgressCandidates[0]
    ? "Bạn đang học dở bài này — tiếp tục để áp dụng vào bài thực hành."
    : trackMode === "junior"
    ? "Gợi ý trọng tâm Junior: Chặng UI Design & Visual Design."
    : "Bài học gợi ý tiếp theo phù hợp nhất với lộ trình hiện tại của bạn.";

  const taskRows = db
    .prepare(
      `SELECT id, title, description, category, target_id, due_date, is_completed, completed_at, xp_reward, is_system_task, created_at
       FROM learning_tasks
       WHERE due_date <= ?
       ORDER BY is_completed ASC, created_at ASC`
    )
    .all(today) as unknown as TaskRow[];

  const todayTasks: LearningTask[] = taskRows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    targetId: row.target_id,
    dueDate: row.due_date,
    isCompleted: row.is_completed === 1,
    completedAt: row.completed_at,
    xpReward: row.xp_reward,
    isSystemTask: row.is_system_task === 1,
    createdAt: row.created_at,
  }));

  const pendingReviewsCount = todayTasks.filter(
    (t) => !t.isCompleted && t.category === "review"
  ).length;
  const pendingExercisesCount = todayTasks.filter(
    (t) => !t.isCompleted && t.category === "exercise"
  ).length;
  const pendingQuizzesCount = todayTasks.filter(
    (t) => !t.isCompleted && t.category === "quiz"
  ).length;

  const skillRows = db
    .prepare(
      "SELECT skill_id, level, evidence_count, evidence_summary FROM skill_assessments"
    )
    .all() as unknown as SkillRow[];
  const skillRowMap = new Map<string, SkillRow>();
  for (const r of skillRows) {
    skillRowMap.set(r.skill_id, r);
  }

  const skills: SkillSummary[] = INITIAL_SKILLS.map((baseSkill) => {
    const saved = skillRowMap.get(baseSkill.id);
    const level = Math.min(4, Math.max(0, saved?.level ?? 0)) as SkillLevel;
    return {
      ...baseSkill,
      level,
      levelLabel: SKILL_LEVEL_LABELS[level],
      evidenceCount: saved?.evidence_count ?? 0,
      evidenceSummary: saved?.evidence_summary ?? baseSkill.evidenceSummary,
    };
  });

  const xpRows = db
    .prepare("SELECT amount, activity_date FROM xp_transactions")
    .all() as unknown as { amount: number; activity_date: string }[];

  const totalXp = xpRows.reduce((sum, row) => sum + row.amount, 0);
  const todayXp = xpRows
    .filter((row) => row.activity_date === today)
    .reduce((sum, row) => sum + row.amount, 0);

  const activityRows = db
    .prepare("SELECT DISTINCT activity_date FROM learning_activities")
    .all() as unknown as { activity_date: string }[];
  const streakDays = calculateStreakDays(
    activityRows.map((r) => r.activity_date),
    today
  );

  const dailyGoalXp = settingsRow?.daily_goal_xp ?? 50;
  const level = Math.floor(totalXp / 100) + 1;

  const resourceRows = db
    .prepare(
      `SELECT id, title, track, level, stage_order, summary, key_points_json,
              web_vs_mobile_note, source_name, source_url, reviewed_at, is_custom, created_at
       FROM learning_resources
       ORDER BY is_custom DESC, stage_order ASC, created_at ASC`
    )
    .all() as unknown as ResourceRow[];

  const resources: LearningResource[] = resourceRows.map((r) => {
    let keyPoints: string[] = [];
    try {
      keyPoints = JSON.parse(r.key_points_json) as string[];
    } catch {
      keyPoints = [];
    }
    return {
      id: r.id,
      title: r.title,
      track: r.track,
      level: r.level,
      stageOrder: r.stage_order,
      summary: r.summary,
      keyPoints,
      webVsMobileNote: r.web_vs_mobile_note,
      sourceName: r.source_name,
      sourceUrl: r.source_url,
      reviewedAt: r.reviewed_at,
      isCustom: r.is_custom === 1,
      createdAt: r.created_at,
    };
  });

  const attemptRows = db
    .prepare(
      "SELECT challenge_id, is_correct, created_at FROM minigame_attempts ORDER BY created_at DESC"
    )
    .all() as unknown as MiniGameAttemptRow[];

  const miniGames = JUNIOR_MINI_GAMES.map((challenge) => {
    const attempts = attemptRows.filter((a) => a.challenge_id === challenge.id);
    const hasSolved = attempts.some((a) => a.is_correct === 1);
    const latest = attempts[0];
    return {
      ...challenge,
      completed: hasSolved,
      lastAttemptCorrect: latest ? latest.is_correct === 1 : null,
    };
  });

  const submissionRows = db
    .prepare(
      `SELECT id, brief_id, figma_url, image_data_url, rationale, self_scores_json, ai_review_json, status, created_at
       FROM practice_submissions
       ORDER BY created_at DESC`
    )
    .all() as unknown as PracticeSubmissionRow[];

  const submissions: PracticeSubmission[] = submissionRows.map((row) => {
    let selfScores: Record<string, number> = {};
    let aiReview: PracticeSubmission["aiReview"] = null;
    try {
      selfScores = JSON.parse(row.self_scores_json) as Record<string, number>;
    } catch {
      selfScores = {};
    }
    if (row.ai_review_json) {
      try {
        aiReview = JSON.parse(row.ai_review_json) as PracticeSubmission["aiReview"];
      } catch {
        aiReview = null;
      }
    }
    return {
      id: row.id,
      briefId: row.brief_id,
      figmaUrl: row.figma_url,
      imageDataUrl: row.image_data_url,
      rationale: row.rationale,
      selfScores,
      aiReview,
      status: row.status,
      createdAt: row.created_at,
    };
  });

  const aiMentorConfigured = Boolean(
    process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY
  );

  return {
    learner: {
      name: profileRow?.name ?? "Bạn",
      background:
        profileRow?.background ?? "Marketing → UI/UX & Product Design",
      targetRole:
        profileRow?.target_role ?? "Junior UI/UX & Product Designer",
    },
    overview: {
      totalLessons,
      completedLessons,
      remainingLessons,
      currentStageNumber: currentStage.order,
      totalStages: stages.length,
      currentStageTitle: currentStage.title,
      currentStageCompletedLessons: currentStage.completedLessons,
      currentStageTotalLessons: currentStage.totalLessons,
      overallCompletionPercent:
        totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0,
    },
    continueLearning: {
      lesson: recommendedLesson,
      stageTitle: recommendedStage.title,
      stageOrder: recommendedStage.order,
      reason: continueReason,
    },
    stages,
    todayTasks,
    pendingReviewsCount,
    pendingExercisesCount,
    pendingQuizzesCount,
    skills,
    resources,
    trackMode,
    rightPanelOpen,
    miniGames,
    practiceBriefs: JUNIOR_PRACTICE_BRIEFS,
    submissions,
    hotTopics: getHotTopics(),
    guidelineQuiz: getGuidelineQuizState(),
    codeLabCompletedIds: getCompletedCodeLabIds(),
    knowledgeBank: getKnowledgeBankState(),
    aiMentorConfigured,
    gamification: {
      enabled: (settingsRow?.gamification_enabled ?? 1) === 1,
      level,
      totalXp,
      todayXp,
      dailyGoalXp,
      streakDays,
    },
    generatedAt: new Date().toISOString(),
  };
}

function recordSkillEvidence(
  skillId: string,
  sourceLabel: string,
  maxCapLevel: SkillLevel
): void {
  const db = getDb();
  const row = db
    .prepare(
      "SELECT level, evidence_count FROM skill_assessments WHERE skill_id = ?"
    )
    .get(skillId) as { level: number; evidence_count: number } | undefined;

  if (!row) return;
  const nextCount = row.evidence_count + 1;
  const targetLevel = Math.min(
    maxCapLevel,
    nextCount >= 3 ? 3 : nextCount >= 1 ? Math.min(2, maxCapLevel) : 0
  );
  const nextLevel = Math.max(row.level, targetLevel);

  db.prepare(
    `UPDATE skill_assessments
     SET level = ?, evidence_count = ?, evidence_summary = ?, updated_at = ?
     WHERE skill_id = ?`
  ).run(
    nextLevel,
    nextCount,
    `${nextCount} minh chứng thực hành (${sourceLabel})`,
    new Date().toISOString(),
    skillId
  );
}

export function submitMiniGameAttempt(input: {
  challengeId: string;
  selectedOptionId: string;
}): {
  snapshot: DashboardSnapshot;
  isCorrect: boolean;
  whyItMatters: string;
} {
  const challenge = JUNIOR_MINI_GAMES.find((c) => c.id === input.challengeId);
  if (!challenge) {
    throw new Error("Không tìm thấy thử thách Mini-Game.");
  }
  const validOption = challenge.options.some(
    (o) => o.id === input.selectedOptionId
  );
  if (!validOption) {
    throw new Error("Lựa chọn không hợp lệ.");
  }

  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();
  const isCorrect = challenge.correctOptionId === input.selectedOptionId;

  const alreadySolved = db
    .prepare(
      "SELECT id FROM minigame_attempts WHERE challenge_id = ? AND is_correct = 1 LIMIT 1"
    )
    .get(challenge.id);

  db.prepare(
    `INSERT INTO minigame_attempts (id, challenge_id, selected_option, is_correct, created_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(
    crypto.randomUUID(),
    challenge.id,
    input.selectedOptionId,
    isCorrect ? 1 : 0,
    now
  );

  if (isCorrect) {
    db.prepare(
      `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
       VALUES (?, ?, 'minigame_solved', ?, ?)`
    ).run(crypto.randomUUID(), today, challenge.id, now);

    if (!alreadySolved) {
      db.prepare(
        `INSERT INTO xp_transactions (id, source_type, source_id, amount, activity_date, created_at)
         VALUES (?, 'minigame', ?, ?, ?, ?)`
      ).run(crypto.randomUUID(), challenge.id, challenge.xpReward, today, now);

      recordSkillEvidence(challenge.skillId, "Mini-Game UI/UX", 2);
    }
  }

  return {
    snapshot: getDashboardSnapshot(),
    isCorrect,
    whyItMatters: challenge.whyItMatters,
  };
}

export async function submitPracticeWork(input: {
  briefId: string;
  figmaUrl?: string;
  imageDataUrl?: string;
  rationale: string;
  selfScores: Record<string, number>;
}): Promise<{
  snapshot: DashboardSnapshot;
  submission: PracticeSubmission;
  aiNote: string;
}> {
  const brief = JUNIOR_PRACTICE_BRIEFS.find((b) => b.id === input.briefId);
  if (!brief) {
    throw new Error("Không tìm thấy đề bài thực hành.");
  }

  const rationale = input.rationale.trim();
  if (rationale.length < 15) {
    throw new Error(
      "Vui lòng viết giải trình quyết định thiết kế ít nhất 15 ký tự."
    );
  }

  const figmaUrl = (input.figmaUrl ?? "").trim() || null;
  if (figmaUrl && !/^https?:\/\/(www\.)?figma\.com\//i.test(figmaUrl)) {
    throw new Error("Link Figma cần bắt đầu bằng https://www.figma.com/...");
  }

  const imageDataUrl = (input.imageDataUrl ?? "").trim() || null;
  if (
    imageDataUrl &&
    !/^data:image\/(png|jpeg|jpg|webp);base64,/i.test(imageDataUrl)
  ) {
    throw new Error("Ảnh chụp màn hình chỉ hỗ trợ PNG, JPG hoặc WebP.");
  }
  if (imageDataUrl && imageDataUrl.length > 3_000_000) {
    throw new Error("Ảnh tải lên vượt quá dung lượng cho phép (~2MB).");
  }
  if (!figmaUrl && !imageDataUrl) {
    throw new Error(
      "Vui lòng đính kèm ít nhất 1 ảnh chụp màn hình thiết kế hoặc link Figma."
    );
  }

  const sanitizedScores: Record<string, number> = {};
  for (const criterion of brief.rubric) {
    const raw = Number(input.selfScores?.[criterion.id] ?? 3);
    sanitizedScores[criterion.id] = Math.min(5, Math.max(1, Math.round(raw)));
  }

  let aiReview: PracticeSubmission["aiReview"] = null;
  let status: PracticeSubmission["status"] = "self_audited";
  let aiNote =
    "Đã lưu bài nộp và bảng tự chấm theo Rubric. (AI Mentor chưa kích hoạt vì chưa cấu hình GEMINI_API_KEY trong .env.local.)";

  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const promptText = [
        `Bạn là AI Design Mentor đánh giá bài thực hành Junior UI/UX bằng tiếng Việt.`,
        `Đề bài: ${brief.title} (${brief.platform})`,
        `Mục tiêu: ${brief.goal}`,
        `Yêu cầu: ${brief.requirements.join("; ")}`,
        `Rubric chấm điểm (thang 1-5): ${brief.rubric
          .map((r) => `${r.name}: ${r.description}`)
          .join(" | ")}`,
        `Link Figma học viên gửi (lưu ý: bạn KHÔNG tự truy cập được URL nếu không có ảnh): ${figmaUrl ?? "Không có"}`,
        `Giải trình thiết kế của học viên: "${rationale}"`,
        `Trả về JSON thuần theo mẫu: {"summary": "...", "findings": [{"criterion": "...", "score": 3, "issue": "...", "suggestion": "..."}]}. Nếu chưa đủ bằng chứng hình ảnh, hãy nêu rõ giới hạn đó.`,
      ].join("\n");

      const parts: Array<Record<string, unknown>> = [{ text: promptText }];
      if (imageDataUrl) {
        const match = imageDataUrl.match(
          /^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/i
        );
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2],
            },
          });
        }
      }

      const model = process.env.MANAE_AI_MODEL || "gemini-2.5-flash";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(geminiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      if (res.ok) {
        const json = (await res.json()) as {
          candidates?: Array<{
            content?: { parts?: Array<{ text?: string }> };
          }>;
        };
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText) as {
            summary: string;
            findings: NonNullable<PracticeSubmission["aiReview"]>["findings"];
          };
          aiReview = {
            provider: `Gemini (${model})`,
            summary: parsed.summary,
            findings: parsed.findings ?? [],
          };
          status = "reviewed";
          aiNote = `AI Design Mentor (${model}) đã chấm bài theo Rubric.`;
        }
      } else {
        aiNote =
          "Đã lưu bài nộp và tự chấm Rubric. Kết nối AI Mentor gặp lỗi từ nhà cung cấp nên không tạo phản hồi giả.";
      }
    } catch {
      aiNote =
        "Đã lưu bài nộp và tự chấm Rubric. Không thể gọi AI Mentor lúc này nên không tạo đánh giá giả.";
    }
  }

  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();
  const submissionId = `sub-${crypto.randomUUID()}`;

  db.prepare(
    `INSERT INTO practice_submissions (
      id, brief_id, figma_url, image_data_url, rationale, self_scores_json, ai_review_json, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    submissionId,
    brief.id,
    figmaUrl,
    imageDataUrl,
    rationale,
    JSON.stringify(sanitizedScores),
    aiReview ? JSON.stringify(aiReview) : null,
    status,
    now
  );

  db.prepare(
    `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
     VALUES (?, ?, 'practice_submitted', ?, ?)`
  ).run(crypto.randomUUID(), today, submissionId, now);

  db.prepare(
    `INSERT INTO xp_transactions (id, source_type, source_id, amount, activity_date, created_at)
     VALUES (?, 'practice', ?, 30, ?, ?)`
  ).run(crypto.randomUUID(), submissionId, today, now);

  recordSkillEvidence(brief.skillId, "Nộp bài Practice Lab", 3);

  const snapshot = getDashboardSnapshot();
  const submission = snapshot.submissions.find((s) => s.id === submissionId)!;
  return { snapshot, submission, aiNote };
}

export function startOrResumeLesson(lessonId: string): DashboardSnapshot {
  const lesson = CURRICULUM_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) {
    throw new Error("Không tìm thấy bài học được yêu cầu.");
  }

  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();

  const existing = db
    .prepare(
      "SELECT status, milestones_completed FROM lesson_progress WHERE lesson_id = ?"
    )
    .get(lessonId) as
    | { status: LessonStatus; milestones_completed: number }
    | undefined;

  if (!existing) {
    db.prepare(
      `INSERT INTO lesson_progress (
        lesson_id, status, milestones_completed, total_milestones, last_accessed_at, completed_at, updated_at
      ) VALUES (?, 'in_progress', 0, ?, ?, NULL, ?)`
    ).run(lessonId, lesson.completionCriteria.length, now, now);
  } else {
    db.prepare(
      `UPDATE lesson_progress
       SET status = CASE WHEN status = 'completed' THEN 'completed' ELSE 'in_progress' END,
           last_accessed_at = ?,
           updated_at = ?
       WHERE lesson_id = ?`
    ).run(now, now, lessonId);
  }

  db.prepare(
    `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
     VALUES (?, ?, 'lesson_opened', ?, ?)`
  ).run(crypto.randomUUID(), today, lessonId, now);

  return getDashboardSnapshot();
}

export function toggleDailyTask(taskId: string): DashboardSnapshot {
  const db = getDb();
  const task = db
    .prepare(
      "SELECT id, is_completed, xp_reward FROM learning_tasks WHERE id = ?"
    )
    .get(taskId) as
    | { id: string; is_completed: number; xp_reward: number }
    | undefined;

  if (!task) {
    throw new Error("Không tìm thấy nhiệm vụ cần cập nhật.");
  }

  const now = new Date().toISOString();
  const today = getLocalDateKey();
  const nextCompleted = task.is_completed === 1 ? 0 : 1;

  db.prepare(
    `UPDATE learning_tasks
     SET is_completed = ?, completed_at = ?
     WHERE id = ?`
  ).run(nextCompleted, nextCompleted === 1 ? now : null, taskId);

  if (nextCompleted === 1) {
    db.prepare(
      `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
       VALUES (?, ?, 'task_completed', ?, ?)`
    ).run(crypto.randomUUID(), today, taskId, now);

    db.prepare(
      `INSERT INTO xp_transactions (id, source_type, source_id, amount, activity_date, created_at)
       VALUES (?, 'task', ?, ?, ?, ?)`
    ).run(crypto.randomUUID(), taskId, task.xp_reward, today, now);
  } else {
    db.prepare(
      "DELETE FROM xp_transactions WHERE source_type = 'task' AND source_id = ?"
    ).run(taskId);
  }

  return getDashboardSnapshot();
}

export function createDailyTask(input: {
  title: string;
  description?: string;
  category: TaskCategory;
}): DashboardSnapshot {
  const title = input.title.trim();
  if (title.length < 3 || title.length > 140) {
    throw new Error("Tiêu đề nhiệm vụ phải từ 3 đến 140 ký tự.");
  }

  const allowedCategories: TaskCategory[] = [
    "lesson",
    "exercise",
    "review",
    "quiz",
    "planning",
  ];
  if (!allowedCategories.includes(input.category)) {
    throw new Error("Loại nhiệm vụ không hợp lệ.");
  }

  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();

  db.prepare(
    `INSERT INTO learning_tasks (
      id, title, description, category, target_id, due_date,
      is_completed, completed_at, xp_reward, is_system_task, created_at
    ) VALUES (?, ?, ?, ?, NULL, ?, 0, NULL, 10, 0, ?)`
  ).run(
    `task-custom-${crypto.randomUUID()}`,
    title,
    (input.description ?? "").trim() ||
      "Nhiệm vụ học tập cá nhân bạn tự thêm cho hôm nay.",
    input.category,
    today,
    now
  );

  return getDashboardSnapshot();
}

export function clearCompletedTodayTasks(): DashboardSnapshot {
  const db = getDb();
  db.prepare("DELETE FROM learning_tasks WHERE is_completed = 1").run();
  return getDashboardSnapshot();
}

export function setGamificationEnabled(enabled: boolean): DashboardSnapshot {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(
    "UPDATE user_settings SET gamification_enabled = ?, updated_at = ? WHERE id = ?"
  ).run(enabled ? 1 : 0, now, "primary-learner");

  return getDashboardSnapshot();
}

export function setTrackMode(mode: LearnerTrackMode): DashboardSnapshot {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(
    "UPDATE user_settings SET learner_mode = ?, updated_at = ? WHERE id = ?"
  ).run(mode === "all" ? "all" : "junior", now, "primary-learner");

  return getDashboardSnapshot();
}

export function setRightPanelOpen(open: boolean): DashboardSnapshot {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(
    "UPDATE user_settings SET right_panel_open = ?, updated_at = ? WHERE id = ?"
  ).run(open ? 1 : 0, now, "primary-learner");

  return getDashboardSnapshot();
}

export function resetDashboardToInitial(): DashboardSnapshot {
  const db = getDb();
  resetAllProgress(db);
  return getDashboardSnapshot();
}

export function createCustomResource(input: {
  title: string;
  track: ResourceTrack;
  summary: string;
  keyPointsText?: string;
  sourceName?: string;
  sourceUrl?: string;
}): DashboardSnapshot {
  const title = input.title.trim();
  const summary = input.summary.trim();
  if (title.length < 3 || title.length > 160) {
    throw new Error("Tiêu đề tài liệu phải từ 3 đến 160 ký tự.");
  }
  if (summary.length < 5) {
    throw new Error("Vui lòng nhập nội dung tóm tắt ít nhất 5 ký tự.");
  }

  const allowedTracks: ResourceTrack[] = [
    "ux_core",
    "web",
    "mobile",
    "figma",
    "personal",
  ];
  const track = allowedTracks.includes(input.track)
    ? input.track
    : "personal";

  let cleanUrl: string | null = null;
  if (input.sourceUrl && input.sourceUrl.trim()) {
    const raw = input.sourceUrl.trim();
    if (!/^https?:\/\//i.test(raw)) {
      throw new Error(
        "Link nguồn tài liệu phải bắt đầu bằng http:// hoặc https://"
      );
    }
    cleanUrl = raw;
  }

  const keyPoints = (input.keyPointsText ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();

  db.prepare(
    `INSERT INTO learning_resources (
      id, title, track, level, stage_order, summary, key_points_json,
      web_vs_mobile_note, source_name, source_url, reviewed_at, is_custom, created_at
    ) VALUES (?, ?, ?, 'Intermediate', 6, ?, ?, NULL, ?, ?, ?, 1, ?)`
  ).run(
    `res-custom-${crypto.randomUUID()}`,
    title,
    track,
    summary,
    JSON.stringify(keyPoints.length > 0 ? keyPoints : [summary]),
    (input.sourceName ?? "").trim() || "Tài liệu cá nhân",
    cleanUrl,
    today,
    now
  );

  return getDashboardSnapshot();
}
