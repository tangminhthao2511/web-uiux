import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_PORT = 4321;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry until ready
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Next.js test server did not become ready in time.");
}

test("UC01 + Junior Studio API & SQLite persistence acceptance tests", async (t) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "manae-uc01-"));
  const dbPath = path.join(tmpDir, "test-manae.db");

  const server = spawn(
    process.execPath,
    [
      path.join(process.cwd(), "node_modules/next/dist/bin/next"),
      "start",
      "-p",
      String(TEST_PORT),
      "-H",
      "127.0.0.1",
    ],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        MANAE_DB_PATH: dbPath,
        GEMINI_API_KEY: "",
        OPENAI_API_KEY: "",
      },
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  t.after(() => {
    server.kill("SIGTERM");
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  await waitForServer(`${BASE_URL}/api/dashboard`);

  // 1. Initial Junior-focus state (no fake progress, Stages 4-8 unlocked, focus Stage 6)
  const initialRes = await fetch(`${BASE_URL}/api/dashboard`);
  assert.equal(initialRes.status, 200);
  const initial = await initialRes.json();

  assert.equal(initial.trackMode, "junior");
  assert.equal(initial.overview.totalStages, 8);
  assert.equal(initial.overview.currentStageNumber, 6);
  assert.equal(initial.overview.completedLessons, 0);
  assert.equal(initial.gamification.streakDays, 0);
  assert.equal(initial.gamification.todayXp, 0);
  assert.equal(initial.skills.length, 11);
  assert.ok(initial.skills.every((s) => s.level === 0 && s.evidenceCount === 0));
  assert.equal(initial.miniGames.length, 6);
  assert.equal(initial.practiceBriefs.length, 3);

  // 2. Toggle trackMode to "all" verifies Stage 2 locks behind Stage 1
  const allModeRes = await fetch(`${BASE_URL}/api/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "set_track_mode", mode: "all" }),
  });
  const allModeData = await allModeRes.json();
  assert.equal(allModeData.trackMode, "all");
  assert.equal(allModeData.stages[1].status, "locked");

  // Switch back to Junior mode
  await fetch(`${BASE_URL}/api/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "set_track_mode", mode: "junior" }),
  });

  // 3. Opening a lesson sets in_progress without fake completion or XP
  const firstLessonId = initial.continueLearning.lesson.id;
  const startRes = await fetch(`${BASE_URL}/api/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "start_lesson", lessonId: firstLessonId }),
  });
  assert.equal(startRes.status, 200);
  const afterStart = await startRes.json();
  assert.equal(afterStart.overview.completedLessons, 0);
  assert.equal(afterStart.gamification.todayXp, 0);
  assert.equal(afterStart.continueLearning.lesson.status, "in_progress");

  // 4. Mini-Game attempt: wrong answer gives 0 XP, correct answer persists evidence + XP
  const wrongGameRes = await fetch(`${BASE_URL}/api/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "submit_minigame",
      challengeId: "game-hierarchy-1",
      selectedOptionId: "a",
    }),
  });
  const wrongGame = await wrongGameRes.json();
  assert.equal(wrongGame.isCorrect, false);
  assert.equal(wrongGame.snapshot.gamification.todayXp, 0);

  const rightGameRes = await fetch(`${BASE_URL}/api/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "submit_minigame",
      challengeId: "game-hierarchy-1",
      selectedOptionId: "b",
    }),
  });
  const rightGame = await rightGameRes.json();
  assert.equal(rightGame.isCorrect, true);
  assert.equal(rightGame.snapshot.gamification.todayXp, 15);
  assert.equal(rightGame.snapshot.gamification.streakDays, 1);
  const uiSkill = rightGame.snapshot.skills.find(
    (s) => s.id === "skill-ui-design"
  );
  assert.ok(uiSkill.evidenceCount >= 1 && uiSkill.level >= 1);

  // 5. Practice submission validates input & persists honestly without faking AI review
  const badSubRes = await fetch(`${BASE_URL}/api/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "submit_practice",
      briefId: "brief-mobile-checkout",
      rationale: "ngan",
    }),
  });
  assert.equal(badSubRes.status, 400);

  const goodSubRes = await fetch(`${BASE_URL}/api/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "submit_practice",
      briefId: "brief-mobile-checkout",
      figmaUrl: "https://www.figma.com/design/abc123/checkout-mobile",
      rationale:
        "Em đặt nút CTA ở cạnh dưới cao 48px đạt chuẩn iOS HIG và giữ tổng tiền nổi bật.",
      selfScores: {
        hierarchy: 4,
        touch_target: 5,
        error_state: 3,
        spacing: 4,
      },
    }),
  });
  assert.equal(goodSubRes.status, 200);
  const subData = await goodSubRes.json();
  assert.equal(subData.submission.status, "self_audited");
  assert.equal(subData.submission.aiReview, null);
  assert.equal(subData.snapshot.submissions.length, 1);
  assert.equal(subData.snapshot.gamification.todayXp, 45);

  // 6. Collapsible right panel preference persists
  assert.equal(subData.snapshot.rightPanelOpen, true);
  const collapseRes = await fetch(`${BASE_URL}/api/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "set_right_panel", open: false }),
  });
  const collapsed = await collapseRes.json();
  assert.equal(collapsed.rightPanelOpen, false);

  // 7. UC03 Lesson Learning API: 10-part content, strict 3-step completion rule, quiz & notes
  const lessonGet = await fetch(`${BASE_URL}/api/lessons?id=les-6-1`);
  assert.equal(lessonGet.status, 200);
  const lessonDetail = await lessonGet.json();
  assert.ok(lessonDetail.content.theoryBlocks.length >= 1);
  assert.ok(lessonDetail.content.goodVsBad.goodTitle);
  assert.ok(lessonDetail.content.quiz.length >= 2);
  assert.equal(lessonDetail.milestones.theoryConfirmed, false);
  assert.notEqual(lessonDetail.lesson.status, "completed");

  const confirmTheoryRes = await fetch(`${BASE_URL}/api/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "confirm_theory", lessonId: "les-6-1" }),
  });
  const afterTheory = await confirmTheoryRes.json();
  assert.equal(afterTheory.detail.milestones.theoryConfirmed, true);
  assert.equal(afterTheory.detail.lesson.status, "in_progress");

  // Submit failing quiz first
  const failQuizRes = await fetch(`${BASE_URL}/api/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "submit_quiz",
      lessonId: "les-6-1",
      answers: { "q-6-1-1": "a", "q-6-1-2": "a" },
    }),
  });
  const failQuiz = await failQuizRes.json();
  assert.equal(failQuiz.passed, false);
  assert.equal(failQuiz.detail.milestones.quizPassed, false);

  // Submit passing quiz
  const passQuizRes = await fetch(`${BASE_URL}/api/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "submit_quiz",
      lessonId: "les-6-1",
      answers: { "q-6-1-1": "b", "q-6-1-2": "b" },
    }),
  });
  const passQuiz = await passQuizRes.json();
  assert.equal(passQuiz.passed, true);
  assert.equal(passQuiz.detail.milestones.quizPassed, true);
  assert.equal(passQuiz.detail.lesson.status, "in_progress");

  // Invalid short note returns 400
  const badNoteRes = await fetch(`${BASE_URL}/api/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "save_note",
      lessonId: "les-6-1",
      content: "abc",
    }),
  });
  assert.equal(badNoteRes.status, 400);

  // Valid note completes all 3 criteria -> lesson becomes completed (+25 XP)
  const saveNoteRes = await fetch(`${BASE_URL}/api/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "save_note",
      lessonId: "les-6-1",
      content: "Luôn giữ khoảng cách nội bộ nhỏ hơn khoảng cách giữa các nhóm.",
    }),
  });
  const afterNote = await saveNoteRes.json();
  assert.equal(afterNote.detail.milestones.noteSaved, true);
  assert.equal(afterNote.detail.lesson.status, "completed");
  assert.equal(afterNote.dashboard.overview.completedLessons, 1);
  assert.equal(afterNote.dashboard.gamification.todayXp, 70);

  // 8. Curated Web/Mobile resources exist and HTML renders cleanly
  assert.ok(subData.snapshot.resources.length >= 7);

  // 9. TOPIC: NEW & HOT + Standard Guideline Quiz + RSS sync diagnostics
  assert.ok(subData.snapshot.hotTopics.length >= 5);
  assert.ok(
    subData.snapshot.hotTopics.every((t) => /^https:\/\//.test(t.sourceUrl))
  );
  assert.ok(subData.snapshot.guidelineQuiz.questions.length >= 8);

  const updatesGetRes = await fetch(`${BASE_URL}/api/updates`);
  assert.equal(updatesGetRes.status, 200);
  const updatesData = await updatesGetRes.json();
  assert.ok(updatesData.hotTopics.length >= 5);
  assert.ok(updatesData.guidelineQuiz.questions.length >= 8);

  const syncRes = await fetch(`${BASE_URL}/api/updates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "sync_hot_topics" }),
  });
  assert.equal(syncRes.status, 200);
  const syncData = await syncRes.json();
  assert.equal(typeof syncData.syncResult.insertedCount, "number");
  assert.ok(syncData.syncResult.message.length > 10);

  // Submit all-correct answers for Standard Guideline Quiz
  const correctQuizAnswers = {
    "std-wcag-text-contrast": "b",
    "std-wcag-target-size": "b",
    "std-ios-hit-target": "b",
    "std-apple-liquid-glass": "b",
    "std-m3-touch-grid": "b",
    "std-law-hick": "a",
    "std-law-jakob": "b",
    "std-nielsen-error": "c",
  };
  const quizPassRes = await fetch(`${BASE_URL}/api/updates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "submit_guideline_quiz",
      answers: correctQuizAnswers,
    }),
  });
  assert.equal(quizPassRes.status, 200);
  const quizPassData = await quizPassRes.json();
  assert.equal(quizPassData.quizResult.attempt.passed, true);
  assert.equal(quizPassData.quizResult.attempt.scorePercent, 100);
  assert.equal(quizPassData.quizResult.xpAwarded, 15);
  assert.equal(quizPassData.snapshot.guidelineQuiz.bestScorePercent, 100);
  assert.equal(quizPassData.snapshot.gamification.todayXp, 85);

  // 10. UI -> FE Code Lab challenge & SQLite persistence
  const codeLabWrongRes = await fetch(`${BASE_URL}/api/updates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "complete_code_lab",
      moduleId: "auto-layout-flex",
      selectedOptionId: "a",
    }),
  });
  assert.equal(codeLabWrongRes.status, 200);
  const codeLabWrong = await codeLabWrongRes.json();
  assert.equal(codeLabWrong.labResult.isCorrect, false);
  assert.equal(codeLabWrong.snapshot.codeLabCompletedIds.length, 0);

  const codeLabPassRes = await fetch(`${BASE_URL}/api/updates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "complete_code_lab",
      moduleId: "auto-layout-flex",
      selectedOptionId: "b",
    }),
  });
  assert.equal(codeLabPassRes.status, 200);
  const codeLabPass = await codeLabPassRes.json();
  assert.equal(codeLabPass.labResult.isCorrect, true);
  assert.equal(codeLabPass.labResult.xpAwarded, 15);
  assert.ok(
    codeLabPass.snapshot.codeLabCompletedIds.includes("auto-layout-flex")
  );
  assert.equal(codeLabPass.snapshot.gamification.todayXp, 100);

  // 11. 500-question Roadmap Knowledge Bank (5 tracks x 100 questions = 5 milestones x 20) & SQLite persistence
  assert.equal(codeLabPass.snapshot.knowledgeBank.totalQuestions, 500);
  assert.equal(codeLabPass.snapshot.knowledgeBank.tracks.length, 5);
  assert.ok(
    codeLabPass.snapshot.knowledgeBank.tracks.every(
      (t) =>
        t.totalQuestions === 100 &&
        t.milestone1Total === 20 &&
        t.milestone2Total === 20 &&
        Array.isArray(t.milestones) &&
        t.milestones.length === 5 &&
        t.milestones.every((m) => m.total === 20)
    )
  );

  const milestoneRes = await fetch(`${BASE_URL}/api/updates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "submit_knowledge_milestone",
      trackId: "ux-core",
      milestone: 1,
      answers: {
        "ux-01": "b",
        "ux-02": "b",
        "ux-03": "b",
        "ux-04": "b",
        "ux-05": "b",
        "ux-06": "b",
        "ux-07": "a",
        "ux-08": "b",
        "ux-09": "c",
        "ux-10": "b",
        "ux-21": "a",
        "ux-22": "b",
        "ux-23": "b",
        "ux-24": "a",
        "ux-25": "b",
        "ux-26": "b",
        "ux-27": "a",
        "ux-28": "b",
        "ux-29": "b",
        "ux-30": "b",
      },
    }),
  });
  assert.equal(milestoneRes.status, 200);
  const milestoneData = await milestoneRes.json();
  assert.equal(milestoneData.milestoneResult.passed, true);
  assert.equal(milestoneData.milestoneResult.scorePercent, 100);
  assert.equal(milestoneData.milestoneResult.xpAwarded, 20);
  assert.equal(milestoneData.snapshot.knowledgeBank.masteredCount, 20);
  assert.equal(milestoneData.snapshot.gamification.todayXp, 120);

  const htmlRes = await fetch(`${BASE_URL}/`);
  assert.equal(htmlRes.status, 200);
  const html = await htmlRes.text();
  assert.ok(html.includes("MeowProduct"));
  assert.ok(html.includes("Studio học UI/UX Junior"));
  assert.ok(html.includes("Lộ trình Tổng thể Junior UI/UX → FE"));
  assert.ok(html.includes("UI → FE Code"));
  assert.ok(html.includes("500 Bài Test"));
  assert.ok(html.includes("Hôm nay"));
  assert.ok(html.includes("UI Interactive Playground"));
  assert.ok(html.includes("Thuật ngữ UI"));
  assert.ok(html.includes("BA &amp; Dev") || html.includes("BA & Dev"));

  // 12. Login & Registration page + /api/auth SQLite persistence
  const loginHtmlRes = await fetch(`${BASE_URL}/login`);
  assert.equal(loginHtmlRes.status, 200);
  const loginHtml = await loginHtmlRes.text();
  assert.ok(loginHtml.includes("Chào mừng quay lại MeowProduct!"));
  assert.ok(loginHtml.includes("Vào học thử không cần tài khoản"));

  const regRes = await fetch(`${BASE_URL}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "register",
      identifier: "thao.designer",
      displayName: "Minh Thảo",
      password: "meowproduct123",
      rememberMe: true,
    }),
  });
  assert.equal(regRes.status, 200);
  const regData = await regRes.json();
  assert.equal(regData.user.identifier, "thao.designer");
  assert.equal(regData.user.displayName, "Minh Thảo");
  const sessionCookie = regRes.headers.get("set-cookie");
  assert.ok(sessionCookie && sessionCookie.includes("meow_session="));

  const wrongLoginRes = await fetch(`${BASE_URL}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "login",
      identifier: "thao.designer",
      password: "wrong-password",
    }),
  });
  assert.equal(wrongLoginRes.status, 400);

  const okLoginRes = await fetch(`${BASE_URL}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "login",
      identifier: "thao.designer",
      password: "meowproduct123",
      rememberMe: true,
    }),
  });
  assert.equal(okLoginRes.status, 200);
  const okLoginData = await okLoginRes.json();
  assert.equal(okLoginData.user.displayName, "Minh Thảo");

  // Default account ("Thảo" / "12345679") works out-of-the-box without prior registration
  const defaultLoginRes = await fetch(`${BASE_URL}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "login",
      identifier: "Thảo",
      password: "12345679",
      rememberMe: true,
    }),
  });
  assert.equal(defaultLoginRes.status, 200);
  const defaultLoginData = await defaultLoginRes.json();
  assert.equal(defaultLoginData.user.displayName, "Thảo");
});
