export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type StageStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "locked";

export type LessonStatus = "not_started" | "in_progress" | "completed";

export type TaskCategory = "lesson" | "exercise" | "review" | "quiz" | "planning";

export type SkillLevel = 0 | 1 | 2 | 3 | 4;

export type ResourceTrack = "ux_core" | "web" | "mobile" | "figma" | "personal";

export type LearnerTrackMode = "junior" | "all";

export type MiniGameType = "ab_visual" | "interactive_fix";

export interface MiniGameChallenge {
  id: string;
  title: string;
  category: string;
  platform: "Web" | "Mobile" | "UX Core";
  type: MiniGameType;
  prompt: string;
  visualScenario:
    | "hierarchy_card"
    | "mobile_touch_target"
    | "wcag_contrast"
    | "spacing_proximity"
    | "form_error_state"
    | "funnel_friction";
  options: {
    id: string;
    label: string;
  }[];
  correctOptionId: string;
  whyItMatters: string;
  skillId: string;
  xpReward: number;
}

export interface PracticeRubricCriterion {
  id: string;
  name: string;
  description: string;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface LessonStructuredContent {
  lessonId: string;
  theoryBlocks: {
    heading: string;
    points: string[];
    webNote?: string;
    mobileNote?: string;
  }[];
  whyItMatters: string;
  whenToUse: {
    useWhen: string[];
    limitations: string[];
  };
  realWorldExamples: {
    product: string;
    context: string;
    takeaway: string;
    sourceLabel?: string;
    sourceUrl?: string;
  }[];
  goodVsBad: {
    scenario: string;
    badTitle: string;
    badReason: string;
    goodTitle: string;
    goodReason: string;
  };
  practicalPrompt: string;
  quiz: LessonQuizQuestion[];
  sourceLinks: { label: string; url: string; reviewedAt: string }[];
}

export interface LessonDetailSnapshot {
  lesson: LessonWithProgress;
  stageOrder: number;
  stageTitle: string;
  isStageLocked: boolean;
  lockReason: string | null;
  content: LessonStructuredContent;
  milestones: {
    theoryConfirmed: boolean;
    quizPassed: boolean;
    noteSaved: boolean;
  };
  latestQuizAttempt: {
    score: number;
    totalQuestions: number;
    passed: boolean;
    answers: Record<string, string>;
    createdAt: string;
  } | null;
  personalNote: string;
  nextLesson: { id: string; title: string; stageOrder: number } | null;
}

export interface PracticeBrief {
  id: string;
  title: string;
  platform: "Web" | "Mobile" | "Figma";
  level: DifficultyLevel;
  estimatedMinutes: number;
  goal: string;
  requirements: string[];
  deliverables: string[];
  rubric: PracticeRubricCriterion[];
  skillId: string;
}

export interface PracticeSubmission {
  id: string;
  briefId: string;
  figmaUrl: string | null;
  imageDataUrl: string | null;
  rationale: string;
  selfScores: Record<string, number>;
  aiReview: {
    provider: string;
    summary: string;
    findings: {
      criterion: string;
      score: number;
      issue: string;
      suggestion: string;
    }[];
  } | null;
  status: "submitted" | "reviewed" | "self_audited";
  createdAt: string;
}

export interface LearningResource {
  id: string;
  title: string;
  track: ResourceTrack;
  level: DifficultyLevel;
  stageOrder: number;
  summary: string;
  keyPoints: string[];
  webVsMobileNote: string | null;
  sourceName: string;
  sourceUrl: string | null;
  reviewedAt: string;
  isCustom: boolean;
  createdAt: string;
}

export interface StageDefinition {
  id: string;
  order: number;
  title: string;
  englishTitle: string;
  goal: string;
  estimatedHours: number;
  level: DifficultyLevel;
  prerequisiteStageId: string | null;
  practicalOutputs: string[];
  accentColor: "lavender" | "blue" | "mint" | "yellow" | "pink";
}

export interface ModuleDefinition {
  id: string;
  stageId: string;
  order: number;
  title: string;
  description: string;
}

export interface LessonDefinition {
  id: string;
  stageId: string;
  moduleId: string;
  order: number;
  title: string;
  englishSubtitle: string;
  summary: string;
  objectives: string[];
  estimatedMinutes: number;
  level: DifficultyLevel;
  prerequisiteLessonId: string | null;
  completionCriteria: string[];
  hasQuiz: boolean;
  hasPracticeTask: boolean;
  isRequired: boolean;
}

export interface LessonWithProgress extends LessonDefinition {
  status: LessonStatus;
  milestonesCompleted: number;
  totalMilestones: number;
  lastAccessedAt: string | null;
  completedAt: string | null;
}

export interface StageWithProgress extends StageDefinition {
  status: StageStatus;
  completedLessons: number;
  totalLessons: number;
  lockReason: string | null;
  modules: (ModuleDefinition & {
    lessons: LessonWithProgress[];
  })[];
}

export interface LearningTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  targetId: string | null;
  dueDate: string;
  isCompleted: boolean;
  completedAt: string | null;
  xpReward: number;
  isSystemTask: boolean;
  createdAt: string;
}

export interface SkillSummary {
  id: string;
  name: string;
  englishName: string;
  level: SkillLevel;
  levelLabel: string;
  evidenceCount: number;
  evidenceSummary: string;
  isFocusArea: boolean;
  focusReason: string | null;
}

export interface GamificationSummary {
  enabled: boolean;
  level: number;
  totalXp: number;
  todayXp: number;
  dailyGoalXp: number;
  streakDays: number;
}

export interface LearnerProfile {
  name: string;
  background: string;
  targetRole: string;
}

export interface DashboardSnapshot {
  learner: LearnerProfile;
  overview: {
    totalLessons: number;
    completedLessons: number;
    remainingLessons: number;
    currentStageNumber: number;
    totalStages: number;
    currentStageTitle: string;
    currentStageCompletedLessons: number;
    currentStageTotalLessons: number;
    overallCompletionPercent: number;
  };
  continueLearning: {
    lesson: LessonWithProgress | null;
    stageTitle: string;
    stageOrder: number;
    reason: string;
  };
  stages: StageWithProgress[];
  todayTasks: LearningTask[];
  pendingReviewsCount: number;
  pendingExercisesCount: number;
  pendingQuizzesCount: number;
  skills: SkillSummary[];
  resources: LearningResource[];
  trackMode: LearnerTrackMode;
  rightPanelOpen: boolean;
  miniGames: (MiniGameChallenge & {
    completed: boolean;
    lastAttemptCorrect: boolean | null;
  })[];
  practiceBriefs: PracticeBrief[];
  submissions: PracticeSubmission[];
  hotTopics: HotTopic[];
  guidelineQuiz: {
    questions: StandardGuidelineQuizQuestion[];
    latestAttempt: GuidelineQuizAttempt | null;
    bestScorePercent: number | null;
  };
  codeLabCompletedIds: string[];
  knowledgeBank: {
    totalQuestions: number;
    masteredCount: number;
    masteredQuestionIds: string[];
    tracks: KnowledgeTrackSummary[];
  };
  aiMentorConfigured: boolean;
  gamification: GamificationSummary;
  generatedAt: string;
}

export type HotTopicBadge = "NEW" | "HOT" | "GUIDELINE";

export type HotTopicPlatform =
  | "Web"
  | "Mobile"
  | "Figma"
  | "UX Core"
  | "AI & Workflow";

export interface HotTopic {
  id: string;
  title: string;
  badge: HotTopicBadge;
  platform: HotTopicPlatform;
  summary: string;
  keyTakeaways: string[];
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  isLiveFeed: boolean;
  createdAt: string;
}

export type GuidelineStandardTag =
  | "WCAG 2.2"
  | "Apple HIG"
  | "Material 3"
  | "Laws of UX"
  | "Nielsen"
  | "Figma";

export interface StandardGuidelineQuizQuestion {
  id: string;
  standard: GuidelineStandardTag;
  question: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface GuidelineQuizAttempt {
  id: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  createdAt: string;
}

export type UiToFeModuleId =
  | "auto-layout-flex"
  | "tokens-variables"
  | "responsive-touch"
  | "states-a11y";

export interface UiToFeMappingRow {
  figmaProperty: string;
  feEquivalent: string;
  pitfallNote: string;
}

export interface UiToFeModule {
  id: UiToFeModuleId;
  order: number;
  badge: string;
  title: string;
  subtitle: string;
  figmaConcept: string;
  feConcept: string;
  mappingRows: UiToFeMappingRow[];
  challenge: {
    question: string;
    options: { id: string; label: string }[];
    correctOptionId: string;
    explanation: string;
  };
}

export type KnowledgeTrackId =
  | "ux-core"
  | "visual-ui"
  | "guidelines"
  | "figma-systems"
  | "ui-to-fe";

export interface KnowledgeTrackMilestoneSummary {
  milestone: 1 | 2 | 3 | 4 | 5;
  label: string;
  total: number;
  mastered: number;
}

export interface KnowledgeTrackSummary {
  id: KnowledgeTrackId;
  order: number;
  title: string;
  subtitle: string;
  totalQuestions: number;
  masteredCount: number;
  milestone1Total: number;
  milestone1Mastered: number;
  milestone2Total: number;
  milestone2Mastered: number;
  milestones: KnowledgeTrackMilestoneSummary[];
}

export interface KnowledgeTestQuestion {
  id: string;
  trackId: KnowledgeTrackId;
  milestone: 1 | 2 | 3 | 4 | 5;
  topicTag: string;
  question: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
}
