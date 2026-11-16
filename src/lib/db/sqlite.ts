import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import {
  INITIAL_LEARNER,
  INITIAL_SKILLS,
  INITIAL_TODAY_TASKS,
} from "@/lib/curriculum/seed-data";
import { CURATED_RESOURCES } from "@/lib/curriculum/resources-seed";
import { CURATED_HOT_TOPICS } from "@/lib/curriculum/hot-and-standards";

const globalForDb = globalThis as unknown as {
  __manaeDb?: DatabaseSync;
  __manaeDbPath?: string;
};

export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDbPath(): string {
  return (
    process.env.MANAE_DB_PATH || path.join(process.cwd(), "data", "manae.db")
  );
}

export function getDb(): DatabaseSync {
  const targetPath = getDbPath();
  if (globalForDb.__manaeDb && globalForDb.__manaeDbPath === targetPath) {
    return globalForDb.__manaeDb;
  }

  if (targetPath !== ":memory:") {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  }

  const db = new DatabaseSync(targetPath);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  initializeSchema(db);
  seedInitialState(db);

  globalForDb.__manaeDb = db;
  globalForDb.__manaeDbPath = targetPath;
  return db;
}

function initializeSchema(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      background TEXT NOT NULL,
      target_role TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_settings (
      id TEXT PRIMARY KEY,
      gamification_enabled INTEGER NOT NULL DEFAULT 1,
      daily_goal_xp INTEGER NOT NULL DEFAULT 50,
      learner_mode TEXT NOT NULL DEFAULT 'junior',
      right_panel_open INTEGER NOT NULL DEFAULT 1,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lesson_progress (
      lesson_id TEXT PRIMARY KEY,
      status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
      milestones_completed INTEGER NOT NULL DEFAULT 0,
      total_milestones INTEGER NOT NULL DEFAULT 3,
      last_accessed_at TEXT,
      completed_at TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS learning_tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL CHECK (category IN ('lesson', 'exercise', 'review', 'quiz', 'planning')),
      target_id TEXT,
      due_date TEXT NOT NULL,
      is_completed INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT,
      xp_reward INTEGER NOT NULL DEFAULT 10,
      is_system_task INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skill_assessments (
      skill_id TEXT PRIMARY KEY,
      level INTEGER NOT NULL DEFAULT 0,
      evidence_count INTEGER NOT NULL DEFAULT 0,
      evidence_summary TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS learning_activities (
      id TEXT PRIMARY KEY,
      activity_date TEXT NOT NULL,
      activity_type TEXT NOT NULL,
      reference_id TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS xp_transactions (
      id TEXT PRIMARY KEY,
      source_type TEXT NOT NULL,
      source_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      activity_date TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS learning_resources (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      track TEXT NOT NULL CHECK (track IN ('ux_core', 'web', 'mobile', 'figma', 'personal')),
      level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
      stage_order INTEGER NOT NULL DEFAULT 1,
      summary TEXT NOT NULL,
      key_points_json TEXT NOT NULL,
      web_vs_mobile_note TEXT,
      source_name TEXT NOT NULL,
      source_url TEXT,
      reviewed_at TEXT NOT NULL,
      is_custom INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS minigame_attempts (
      id TEXT PRIMARY KEY,
      challenge_id TEXT NOT NULL,
      selected_option TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS practice_submissions (
      id TEXT PRIMARY KEY,
      brief_id TEXT NOT NULL,
      figma_url TEXT,
      image_data_url TEXT,
      rationale TEXT NOT NULL,
      self_scores_json TEXT NOT NULL,
      ai_review_json TEXT,
      status TEXT NOT NULL CHECK (status IN ('submitted', 'reviewed', 'self_audited')),
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lesson_milestones (
      lesson_id TEXT PRIMARY KEY,
      theory_confirmed INTEGER NOT NULL DEFAULT 0,
      quiz_passed INTEGER NOT NULL DEFAULT 0,
      note_saved INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id TEXT PRIMARY KEY,
      lesson_id TEXT NOT NULL,
      answers_json TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_notes (
      lesson_id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS hot_topics (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      badge TEXT NOT NULL CHECK (badge IN ('NEW', 'HOT', 'GUIDELINE')),
      platform TEXT NOT NULL CHECK (platform IN ('Web', 'Mobile', 'Figma', 'UX Core', 'AI & Workflow')),
      summary TEXT NOT NULL,
      key_takeaways_json TEXT NOT NULL,
      source_name TEXT NOT NULL,
      source_url TEXT NOT NULL UNIQUE,
      published_at TEXT NOT NULL,
      is_live_feed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS guideline_quiz_attempts (
      id TEXT PRIMARY KEY,
      score_percent INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      answers_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS code_lab_completions (
      module_id TEXT PRIMARY KEY,
      selected_option TEXT NOT NULL,
      completed_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS knowledge_test_mastery (
      question_id TEXT PRIMARY KEY,
      track_id TEXT NOT NULL,
      selected_option TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS auth_users (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS auth_sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      remember_me INTEGER NOT NULL DEFAULT 1,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE CASCADE
    );
  `);

  // Safe migration for existing databases
  const settingCols = db
    .prepare("PRAGMA table_info(user_settings)")
    .all() as unknown as { name: string }[];
  if (!settingCols.some((c) => c.name === "learner_mode")) {
    db.exec(
      "ALTER TABLE user_settings ADD COLUMN learner_mode TEXT NOT NULL DEFAULT 'junior';"
    );
  }
  if (!settingCols.some((c) => c.name === "right_panel_open")) {
    db.exec(
      "ALTER TABLE user_settings ADD COLUMN right_panel_open INTEGER NOT NULL DEFAULT 1;"
    );
  }
}

export function seedInitialState(db: DatabaseSync): void {
  const now = new Date().toISOString();
  const today = getLocalDateKey();

  const existingProfile = db
    .prepare("SELECT id FROM user_profile WHERE id = ?")
    .get("primary-learner");
  if (!existingProfile) {
    db.prepare(
      `INSERT INTO user_profile (id, name, background, target_role, updated_at)
       VALUES (?, ?, ?, ?, ?)`
    ).run(
      "primary-learner",
      INITIAL_LEARNER.name,
      INITIAL_LEARNER.background,
      INITIAL_LEARNER.targetRole,
      now
    );
  }

  const existingSettings = db
    .prepare("SELECT id FROM user_settings WHERE id = ?")
    .get("primary-learner");
  if (!existingSettings) {
    db.prepare(
      `INSERT INTO user_settings (id, gamification_enabled, daily_goal_xp, learner_mode, right_panel_open, updated_at)
       VALUES (?, ?, ?, 'junior', 1, ?)`
    ).run("primary-learner", 1, 50, now);
  }

  const skillCountRow = db
    .prepare("SELECT COUNT(*) as count FROM skill_assessments")
    .get() as { count: number };
  if (skillCountRow.count === 0) {
    const insertSkill = db.prepare(
      `INSERT INTO skill_assessments (skill_id, level, evidence_count, evidence_summary, updated_at)
       VALUES (?, ?, ?, ?, ?)`
    );
    for (const skill of INITIAL_SKILLS) {
      insertSkill.run(
        skill.id,
        skill.level,
        skill.evidenceCount,
        skill.evidenceSummary,
        now
      );
    }
  }

  const taskCountRow = db
    .prepare("SELECT COUNT(*) as count FROM learning_tasks")
    .get() as { count: number };
  if (taskCountRow.count === 0) {
    const insertTask = db.prepare(
      `INSERT INTO learning_tasks (
        id, title, description, category, target_id, due_date,
        is_completed, completed_at, xp_reward, is_system_task, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, 0, NULL, ?, ?, ?)`
    );
    for (const task of INITIAL_TODAY_TASKS) {
      insertTask.run(
        task.id,
        task.title,
        task.description,
        task.category,
        task.targetId,
        today,
        task.xpReward,
        task.isSystemTask ? 1 : 0,
        now
      );
    }
  }

  const resourceCountRow = db
    .prepare("SELECT COUNT(*) as count FROM learning_resources")
    .get() as { count: number };
  if (resourceCountRow.count === 0) {
    const insertResource = db.prepare(
      `INSERT INTO learning_resources (
        id, title, track, level, stage_order, summary, key_points_json,
        web_vs_mobile_note, source_name, source_url, reviewed_at, is_custom, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const res of CURATED_RESOURCES) {
      insertResource.run(
        res.id,
        res.title,
        res.track,
        res.level,
        res.stageOrder,
        res.summary,
        JSON.stringify(res.keyPoints),
        res.webVsMobileNote,
        res.sourceName,
        res.sourceUrl,
        res.reviewedAt,
        res.isCustom ? 1 : 0,
        now
      );
    }
  }

  const insertHotTopic = db.prepare(
    `INSERT OR IGNORE INTO hot_topics (
      id, title, badge, platform, summary, key_takeaways_json,
      source_name, source_url, published_at, is_live_feed, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  for (const topic of CURATED_HOT_TOPICS) {
    insertHotTopic.run(
      topic.id,
      topic.title,
      topic.badge,
      topic.platform,
      topic.summary,
      JSON.stringify(topic.keyTakeaways),
      topic.sourceName,
      topic.sourceUrl,
      topic.publishedAt,
      topic.isLiveFeed ? 1 : 0,
      topic.createdAt
    );
  }
}

export function resetAllProgress(db: DatabaseSync): void {
  db.exec(`
    DELETE FROM lesson_progress;
    DELETE FROM learning_tasks;
    DELETE FROM skill_assessments;
    DELETE FROM learning_activities;
    DELETE FROM xp_transactions;
    DELETE FROM minigame_attempts;
    DELETE FROM practice_submissions;
    DELETE FROM lesson_milestones;
    DELETE FROM quiz_attempts;
    DELETE FROM user_notes;
    DELETE FROM guideline_quiz_attempts;
    DELETE FROM code_lab_completions;
    DELETE FROM knowledge_test_mastery;
  `);
  seedInitialState(db);
}
