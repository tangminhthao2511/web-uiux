import crypto from "node:crypto";
import {
  STANDARD_GUIDELINE_QUIZ,
} from "@/lib/curriculum/hot-and-standards";
import {
  KNOWLEDGE_TEST_QUESTIONS,
  KNOWLEDGE_TRACKS,
} from "@/lib/curriculum/knowledge-test-bank";
import { UI_TO_FE_MODULES } from "@/lib/curriculum/ui-to-fe-modules";
import { getDb, getLocalDateKey } from "@/lib/db/sqlite";
import type {
  GuidelineQuizAttempt,
  HotTopic,
  HotTopicBadge,
  HotTopicPlatform,
  KnowledgeTrackId,
  KnowledgeTrackSummary,
  SkillLevel,
} from "@/types/learning";

interface HotTopicRow {
  id: string;
  title: string;
  badge: HotTopicBadge;
  platform: HotTopicPlatform;
  summary: string;
  key_takeaways_json: string;
  source_name: string;
  source_url: string;
  published_at: string;
  is_live_feed: number;
  created_at: string;
}

interface GuidelineQuizAttemptRow {
  id: string;
  score_percent: number;
  correct_count: number;
  total_questions: number;
  passed: number;
  created_at: string;
}

export interface HotTopicsSyncResult {
  fetchedCount: number;
  insertedCount: number;
  totalTopics: number;
  failedFeeds: { source: string; reason: string }[];
  message: string;
}

export interface GuidelineQuizSubmissionResult {
  attempt: GuidelineQuizAttempt;
  xpAwarded: number;
  results: {
    questionId: string;
    selectedOptionId: string | null;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

interface RssSourceConfig {
  sourceName: string;
  url: string;
  platform: HotTopicPlatform;
}

const PUBLIC_UIUX_FEEDS: RssSourceConfig[] = [
  {
    sourceName: "Nielsen Norman Group",
    url: "https://www.nngroup.com/feed/rss/",
    platform: "UX Core",
  },
  {
    sourceName: "Smashing Magazine UX",
    url: "https://www.smashingmagazine.com/category/ux-design/feed/",
    platform: "Web",
  },
  {
    sourceName: "web.dev",
    url: "https://web.dev/feed.xml",
    platform: "Web",
  },
];

function stripCdataAndHtml(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block: string, tagName: string): string {
  const regex = new RegExp(
    `<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`,
    "i"
  );
  const match = block.match(regex);
  return match ? stripCdataAndHtml(match[1]) : "";
}

function extractAtomLink(block: string): string {
  const linkMatch =
    block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i) ||
    block.match(/<link>([\s\S]*?)<\/link>/i);
  return linkMatch ? stripCdataAndHtml(linkMatch[1]) : "";
}

function normalizeDateIso(rawDate: string): string {
  if (!rawDate) return getLocalDateKey();
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) {
    return getLocalDateKey();
  }
  return parsed.toISOString().slice(0, 10);
}

interface ParsedFeedEntry {
  title: string;
  url: string;
  summary: string;
  publishedAt: string;
}

function parseFeedXml(xml: string, limit = 3): ParsedFeedEntry[] {
  const entries: ParsedFeedEntry[] = [];
  const itemMatches = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)];
  const atomMatches = [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)];
  const blocks =
    itemMatches.length > 0
      ? itemMatches.map((m) => m[0])
      : atomMatches.map((m) => m[0]);

  for (const block of blocks) {
    if (entries.length >= limit) break;
    const title = extractTag(block, "title");
    const url = extractTag(block, "link") || extractAtomLink(block);
    const rawDesc =
      extractTag(block, "description") ||
      extractTag(block, "summary") ||
      extractTag(block, "content");
    const rawDate =
      extractTag(block, "pubDate") ||
      extractTag(block, "published") ||
      extractTag(block, "updated");

    if (!title || !/^https?:\/\//i.test(url)) continue;

    const cleanSummary =
      rawDesc.length > 220 ? `${rawDesc.slice(0, 217).trim()}...` : rawDesc;

    entries.push({
      title: title.slice(0, 180),
      url,
      summary:
        cleanSummary ||
        "Bài viết UI/UX mới được đồng bộ từ nguồn công khai. Nhấn mở nguồn gốc để xem chi tiết.",
      publishedAt: normalizeDateIso(rawDate),
    });
  }

  return entries;
}

export function getHotTopics(): HotTopic[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT id, title, badge, platform, summary, key_takeaways_json,
              source_name, source_url, published_at, is_live_feed, created_at
       FROM hot_topics
       ORDER BY is_live_feed DESC, published_at DESC, created_at DESC`
    )
    .all() as unknown as HotTopicRow[];

  return rows.map((r) => {
    let keyTakeaways: string[] = [];
    try {
      keyTakeaways = JSON.parse(r.key_takeaways_json) as string[];
    } catch {
      keyTakeaways = [r.summary];
    }
    return {
      id: r.id,
      title: r.title,
      badge: r.badge,
      platform: r.platform,
      summary: r.summary,
      keyTakeaways,
      sourceName: r.source_name,
      sourceUrl: r.source_url,
      publishedAt: r.published_at,
      isLiveFeed: r.is_live_feed === 1,
      createdAt: r.created_at,
    };
  });
}

export function getGuidelineQuizState(): {
  questions: typeof STANDARD_GUIDELINE_QUIZ;
  latestAttempt: GuidelineQuizAttempt | null;
  bestScorePercent: number | null;
} {
  const db = getDb();
  const latestRow = db
    .prepare(
      `SELECT id, score_percent, correct_count, total_questions, passed, created_at
       FROM guideline_quiz_attempts
       ORDER BY created_at DESC
       LIMIT 1`
    )
    .get() as unknown as GuidelineQuizAttemptRow | undefined;

  const bestRow = db
    .prepare(
      "SELECT MAX(score_percent) as best FROM guideline_quiz_attempts"
    )
    .get() as { best: number | null } | undefined;

  return {
    questions: STANDARD_GUIDELINE_QUIZ,
    latestAttempt: latestRow
      ? {
          id: latestRow.id,
          scorePercent: latestRow.score_percent,
          correctCount: latestRow.correct_count,
          totalQuestions: latestRow.total_questions,
          passed: latestRow.passed === 1,
          createdAt: latestRow.created_at,
        }
      : null,
    bestScorePercent: bestRow?.best ?? null,
  };
}

export async function syncLiveHotTopics(): Promise<HotTopicsSyncResult> {
  const db = getDb();
  const now = new Date().toISOString();
  let fetchedCount = 0;
  let insertedCount = 0;
  const failedFeeds: { source: string; reason: string }[] = [];

  const insertStmt = db.prepare(
    `INSERT OR IGNORE INTO hot_topics (
      id, title, badge, platform, summary, key_takeaways_json,
      source_name, source_url, published_at, is_live_feed, created_at
    ) VALUES (?, ?, 'NEW', ?, ?, ?, ?, ?, ?, 1, ?)`
  );

  for (const feed of PUBLIC_UIUX_FEEDS) {
    try {
      const response = await fetch(feed.url, {
        headers: {
          "User-Agent": "MeowProduct-UIUX-Learner/1.0 (+http://localhost:3000)",
          Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        failedFeeds.push({
          source: feed.sourceName,
          reason: `HTTP ${response.status}`,
        });
        continue;
      }

      const xml = await response.text();
      const entries = parseFeedXml(xml, 3);
      fetchedCount += entries.length;

      for (const entry of entries) {
        const result = insertStmt.run(
          `hot-rss-${crypto.randomUUID()}`,
          entry.title,
          feed.platform,
          entry.summary,
          JSON.stringify([
            `Nguồn RSS trực tiếp: ${feed.sourceName} (${entry.publishedAt})`,
            entry.summary,
          ]),
          `${feed.sourceName} (Live RSS)`,
          entry.url,
          entry.publishedAt,
          now
        );
        if (result.changes > 0) {
          insertedCount += 1;
        }
      }
    } catch (error) {
      failedFeeds.push({
        source: feed.sourceName,
        reason:
          error instanceof Error
            ? error.message
            : "Không thể kết nối nguồn RSS",
      });
    }
  }

  if (insertedCount > 0) {
    db.prepare(
      `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
       VALUES (?, ?, 'topic_sync', ?, ?)`
    ).run(
      `act-${crypto.randomUUID()}`,
      getLocalDateKey(),
      `rss-sync-${insertedCount}`,
      now
    );
  }

  const totalRow = db
    .prepare("SELECT COUNT(*) as count FROM hot_topics")
    .get() as { count: number };

  let message = "";
  if (insertedCount > 0) {
    message = `Đã đồng bộ thêm ${insertedCount} bài viết UI/UX mới từ RSS (kiểm tra ${fetchedCount} mục).`;
  } else if (fetchedCount > 0) {
    message = `Đã kiểm tra ${fetchedCount} bài viết từ RSS — không có bài mới hơn dữ liệu hiện tại.`;
  } else {
    message =
      "Không thể kết nối mạng hoặc RSS nguồn bị chặn (môi trường offline/sandbox). Đang hiển thị bộ TOPIC: NEW & HOT đã kiểm duyệt sẵn — không tạo dữ liệu giả.";
  }

  return {
    fetchedCount,
    insertedCount,
    totalTopics: totalRow.count,
    failedFeeds,
    message,
  };
}

export function submitGuidelineQuiz(
  answers: Record<string, string>
): GuidelineQuizSubmissionResult {
  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();

  const results = STANDARD_GUIDELINE_QUIZ.map((q) => {
    const selectedOptionId = answers[q.id] ?? null;
    const isCorrect = selectedOptionId === q.correctOptionId;
    return {
      questionId: q.id,
      selectedOptionId,
      correctOptionId: q.correctOptionId,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalQuestions = STANDARD_GUIDELINE_QUIZ.length;
  const scorePercent =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = scorePercent >= 70;
  const attemptId = `gquiz-${crypto.randomUUID()}`;

  db.prepare(
    `INSERT INTO guideline_quiz_attempts (
      id, score_percent, correct_count, total_questions, passed, answers_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    attemptId,
    scorePercent,
    correctCount,
    totalQuestions,
    passed ? 1 : 0,
    JSON.stringify(answers),
    now
  );

  let xpAwarded = 0;
  if (passed) {
    const sourceId = `guideline-quiz-${today}`;
    const existingXp = db
      .prepare(
        "SELECT id FROM xp_transactions WHERE source_type = 'guideline_quiz' AND source_id = ?"
      )
      .get(sourceId);
    if (!existingXp) {
      xpAwarded = 15;
      db.prepare(
        `INSERT INTO xp_transactions (id, source_type, source_id, amount, activity_date, created_at)
         VALUES (?, 'guideline_quiz', ?, ?, ?, ?)`
      ).run(`xp-${crypto.randomUUID()}`, sourceId, xpAwarded, today, now);
    }

    // Quiz alone strengthens Accessibility & Visual Hierarchy up to Level 2 max
    for (const skillId of ["accessibility", "visual_hierarchy"]) {
      const existing = db
        .prepare(
          "SELECT level, evidence_count FROM skill_assessments WHERE skill_id = ?"
        )
        .get(skillId) as { level: SkillLevel; evidence_count: number } | undefined;
      if (existing) {
        const nextLevel = Math.min(
          2,
          Math.max(existing.level, 1)
        ) as SkillLevel;
        const nextCount = existing.evidence_count + 1;
        db.prepare(
          `UPDATE skill_assessments
           SET level = ?, evidence_count = ?, evidence_summary = ?, updated_at = ?
           WHERE skill_id = ?`
        ).run(
          nextLevel,
          nextCount,
          `${nextCount} minh chứng · Đạt Quiz Quy chuẩn UI/UX (${scorePercent}%)`,
          now,
          skillId
        );
      }
    }
  }

  db.prepare(
    `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
     VALUES (?, ?, 'guideline_quiz', ?, ?)`
  ).run(`act-${crypto.randomUUID()}`, today, attemptId, now);

  return {
    attempt: {
      id: attemptId,
      scorePercent,
      correctCount,
      totalQuestions,
      passed,
      createdAt: now,
    },
    xpAwarded,
    results,
  };
}

export function getCompletedCodeLabIds(): string[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT module_id FROM code_lab_completions")
    .all() as unknown as { module_id: string }[];
  return rows.map((r) => r.module_id);
}

export function submitCodeLabChallenge(
  moduleId: string,
  selectedOptionId: string
): {
  isCorrect: boolean;
  explanation: string;
  xpAwarded: number;
} {
  const mod = UI_TO_FE_MODULES.find((m) => m.id === moduleId);
  if (!mod) {
    throw new Error("Không tìm thấy module UI → FE.");
  }
  const optionExists = mod.challenge.options.some(
    (o) => o.id === selectedOptionId
  );
  if (!optionExists) {
    throw new Error("Đáp án được chọn không hợp lệ.");
  }

  const isCorrect = selectedOptionId === mod.challenge.correctOptionId;
  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();
  let xpAwarded = 0;

  if (isCorrect) {
    const existing = db
      .prepare("SELECT module_id FROM code_lab_completions WHERE module_id = ?")
      .get(moduleId);

    db.prepare(
      `INSERT INTO code_lab_completions (module_id, selected_option, completed_at)
       VALUES (?, ?, ?)
       ON CONFLICT(module_id) DO UPDATE SET selected_option = excluded.selected_option, completed_at = excluded.completed_at`
    ).run(moduleId, selectedOptionId, now);

    if (!existing) {
      xpAwarded = 15;
      db.prepare(
        `INSERT INTO xp_transactions (id, source_type, source_id, amount, activity_date, created_at)
         VALUES (?, 'code_lab', ?, ?, ?, ?)`
      ).run(`xp-${crypto.randomUUID()}`, moduleId, xpAwarded, today, now);

      for (const skillId of ["design_systems", "interaction_states"]) {
        const skillRow = db
          .prepare(
            "SELECT level, evidence_count FROM skill_assessments WHERE skill_id = ?"
          )
          .get(skillId) as
          | { level: SkillLevel; evidence_count: number }
          | undefined;
        if (skillRow) {
          const nextCount = skillRow.evidence_count + 1;
          const nextLevel = Math.min(3, Math.max(skillRow.level, 2)) as SkillLevel;
          db.prepare(
            `UPDATE skill_assessments
             SET level = ?, evidence_count = ?, evidence_summary = ?, updated_at = ?
             WHERE skill_id = ?`
          ).run(
            nextLevel,
            nextCount,
            `${nextCount} minh chứng · Thực hành UI → FE (${mod.title})`,
            now,
            skillId
          );
        }
      }
    }

    db.prepare(
      `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
       VALUES (?, ?, 'code_lab', ?, ?)`
    ).run(`act-${crypto.randomUUID()}`, today, moduleId, now);
  }

  return {
    isCorrect,
    explanation: mod.challenge.explanation,
    xpAwarded,
  };
}

export function getKnowledgeBankState(): {
  totalQuestions: number;
  masteredCount: number;
  masteredQuestionIds: string[];
  tracks: KnowledgeTrackSummary[];
} {
  const db = getDb();
  const rows = db
    .prepare(
      "SELECT question_id FROM knowledge_test_mastery WHERE is_correct = 1"
    )
    .all() as unknown as { question_id: string }[];

  const masteredSet = new Set(rows.map((r) => r.question_id));

  const tracks: KnowledgeTrackSummary[] = KNOWLEDGE_TRACKS.map((track) => {
    const qs = KNOWLEDGE_TEST_QUESTIONS.filter((q) => q.trackId === track.id);
    const milestones = track.milestones.map((ms) => {
      const mqs = qs.filter((q) => q.milestone === ms.milestone);
      const mMastered = mqs.filter((q) => masteredSet.has(q.id)).length;
      return {
        milestone: ms.milestone,
        label: ms.label,
        total: mqs.length,
        mastered: mMastered,
      };
    });

    const m1 = milestones[0] ?? { total: 0, mastered: 0 };
    const m2 = milestones[1] ?? { total: 0, mastered: 0 };
    const totalMastered = milestones.reduce((sum, m) => sum + m.mastered, 0);

    return {
      id: track.id,
      order: track.order,
      title: track.title,
      subtitle: track.subtitle,
      totalQuestions: qs.length,
      masteredCount: totalMastered,
      milestone1Total: m1.total,
      milestone1Mastered: m1.mastered,
      milestone2Total: m2.total,
      milestone2Mastered: m2.mastered,
      milestones,
    };
  });

  return {
    totalQuestions: KNOWLEDGE_TEST_QUESTIONS.length,
    masteredCount: masteredSet.size,
    masteredQuestionIds: Array.from(masteredSet),
    tracks,
  };
}

const TRACK_SKILL_MAP: Record<KnowledgeTrackId, string[]> = {
  "ux-core": ["heuristics", "user_research"],
  "visual-ui": ["visual_hierarchy", "typography_layout"],
  guidelines: ["accessibility", "interaction_states"],
  "figma-systems": ["design_systems", "layout_grid"],
  "ui-to-fe": ["design_systems", "accessibility"],
};

export function submitKnowledgeMilestone(
  trackId: KnowledgeTrackId,
  milestone: 1 | 2 | 3 | 4 | 5,
  answers: Record<string, string>
): {
  trackId: KnowledgeTrackId;
  milestone: 1 | 2 | 3 | 4 | 5;
  correctCount: number;
  totalQuestions: number;
  scorePercent: number;
  passed: boolean;
  xpAwarded: number;
  results: {
    questionId: string;
    selectedOptionId: string | null;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
  }[];
} {
  const milestoneQuestions = KNOWLEDGE_TEST_QUESTIONS.filter(
    (q) => q.trackId === trackId && q.milestone === milestone
  );
  if (milestoneQuestions.length === 0) {
    throw new Error("Không tìm thấy mốc bài test theo chức năng.");
  }

  const db = getDb();
  const now = new Date().toISOString();
  const today = getLocalDateKey();

  const upsert = db.prepare(
    `INSERT INTO knowledge_test_mastery (question_id, track_id, selected_option, is_correct, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(question_id) DO UPDATE SET
       selected_option = excluded.selected_option,
       is_correct = CASE WHEN knowledge_test_mastery.is_correct = 1 THEN 1 ELSE excluded.is_correct END,
       updated_at = excluded.updated_at`
  );

  const results = milestoneQuestions.map((q) => {
    const selectedOptionId = answers[q.id] ?? null;
    const isCorrect = selectedOptionId === q.correctOptionId;
    if (selectedOptionId) {
      upsert.run(q.id, trackId, selectedOptionId, isCorrect ? 1 : 0, now);
    }
    return {
      questionId: q.id,
      selectedOptionId,
      correctOptionId: q.correctOptionId,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalQuestions = milestoneQuestions.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= 70;

  let xpAwarded = 0;
  if (passed) {
    const sourceId = `${trackId}-m${milestone}`;
    const existingXp = db
      .prepare(
        "SELECT id FROM xp_transactions WHERE source_type = 'knowledge_milestone' AND source_id = ?"
      )
      .get(sourceId);
    if (!existingXp) {
      xpAwarded = 20;
      db.prepare(
        `INSERT INTO xp_transactions (id, source_type, source_id, amount, activity_date, created_at)
         VALUES (?, 'knowledge_milestone', ?, ?, ?, ?)`
      ).run(`xp-${crypto.randomUUID()}`, sourceId, xpAwarded, today, now);
    }

    for (const skillId of TRACK_SKILL_MAP[trackId] ?? []) {
      const existing = db
        .prepare(
          "SELECT level, evidence_count FROM skill_assessments WHERE skill_id = ?"
        )
        .get(skillId) as
        | { level: SkillLevel; evidence_count: number }
        | undefined;
      if (existing) {
        const nextCount = existing.evidence_count + 1;
        const nextLevel = Math.min(2, Math.max(existing.level, 1)) as SkillLevel;
        db.prepare(
          `UPDATE skill_assessments
           SET level = ?, evidence_count = ?, evidence_summary = ?, updated_at = ?
           WHERE skill_id = ?`
        ).run(
          nextLevel,
          nextCount,
          `${nextCount} minh chứng · Đạt mốc Test ${trackId} M${milestone} (${scorePercent}%)`,
          now,
          skillId
        );
      }
    }
  }

  db.prepare(
    `INSERT INTO learning_activities (id, activity_date, activity_type, reference_id, created_at)
     VALUES (?, ?, 'knowledge_milestone', ?, ?)`
  ).run(`act-${crypto.randomUUID()}`, today, `${trackId}-m${milestone}`, now);

  return {
    trackId,
    milestone,
    correctCount,
    totalQuestions,
    scorePercent,
    passed,
    xpAwarded,
    results,
  };
}
