"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  Flame,
  Gamepad2,
  Layers,
  PanelRightOpen,
  Search,
  Shapes,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import {
  LeftFeatureRail,
  type RailSectionId,
} from "@/components/layout/LeftFeatureRail";
import { MeowAvatar, TopNav, type NavItem } from "@/components/layout/TopNav";
import { LessonStudio } from "@/components/lessons/LessonStudio";
import { RoadmapView } from "@/components/roadmap/RoadmapView";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DashboardSkeleton, ErrorState } from "@/components/ui/StateView";
import type { AuthUser } from "@/lib/services/auth";
import type {
  DashboardSnapshot,
  KnowledgeTrackId,
  ResourceTrack,
  TaskCategory,
} from "@/types/learning";
import { BaDevCollabStudio } from "./BaDevCollabStudio";
import { DailyUiAuditHero } from "./DailyUiAuditHero";
import { GuidelineQuizCard } from "./GuidelineQuizCard";
import { HotTopicsCard } from "./HotTopicsCard";
import { KnowledgeRoadmapBank } from "./KnowledgeRoadmapBank";
import { MiniGameLab } from "./MiniGameLab";
import { OverviewStats } from "./OverviewStats";
import { PracticeStudio } from "./PracticeStudio";
import { ResourceLibraryCard } from "./ResourceLibraryCard";
import { SearchCommandModal } from "./SearchCommandModal";
import {
  AllStagesModal,
  PhasePreviewModal,
  SettingsModal,
} from "./SettingsAndPhaseModals";
import { SkillOverviewCard } from "./SkillOverviewCard";
import { TodayPanel } from "./TodayPanel";
import { UiTerminologyStudio } from "./UiTerminologyStudio";
import { UiToFeLab } from "./UiToFeLab";

interface DashboardClientProps {
  initialSnapshot?: DashboardSnapshot;
  initialAuthUser?: AuthUser | null;
}

const SECTION_META: Record<
  RailSectionId,
  { badgeLabel: string; title: string; subtitle: string }
> = {
  overview: {
    badgeLabel: "Tổng quan · Lộ trình",
    title: "Studio học UI/UX Junior",
    subtitle:
      "Chọn trực tiếp tính năng từ thanh icon bên trái hoặc học theo quy trình 4 bước bên dưới.",
  },
  roadmap: {
    badgeLabel: "Lộ trình học",
    title: "Lộ trình UI/UX Junior",
    subtitle:
      "5 chặng thực chiến Junior (bỏ qua Beginner) kết nối song song bản đồ 500 bài test.",
  },
  lesson: {
    badgeLabel: "Bài học trọng tâm",
    title: "Bài học & Ví dụ thực tế",
    subtitle:
      "Lý thuyết cô đọng, so sánh Good vs Bad, Knowledge Check và Ghi chú cá nhân.",
  },
  ui_to_fe: {
    badgeLabel: "UI → FE Code",
    title: "UI → FE Code Studio",
    subtitle:
      "Chuyển thẳng Auto Layout, Tokens, Responsive & A11y từ Figma sang HTML/CSS & Tailwind.",
  },
  collab: {
    badgeLabel: "Phối hợp BA & Dev",
    title: "Làm việc với BA & Dev trong UI/UX",
    subtitle:
      "Tình huống xử lý Edge Case, thương lượng Scope với BA và Bàn giao/Design QA cùng Dev.",
  },
  test_bank: {
    badgeLabel: "500 Bài Test",
    title: "Lộ trình 500 Bài Test Kiến thức",
    subtitle:
      "5 chức năng × 100 câu (chia 5 mốc chủ đề × 20 câu) — lưu điểm từng mốc trên SQLite.",
  },
  minigames: {
    badgeLabel: "Mini-Game & Quiz",
    title: "Mini-Game Thị giác & Quiz Chuẩn",
    subtitle:
      "Luyện mắt bắt lỗi UI trực quan và tự kiểm tra nhanh quy chuẩn phổ biến.",
  },
  terminology: {
    badgeLabel: "Thuật ngữ UI · Nối hình",
    title: "Học 42 Tên Học Thuật Thành Phần UI",
    subtitle:
      "Nối đúng tên chuẩn Tooltip, FAB, Snackbar, Popover, Split Button, Command Palette, Data Table... với hình minh họa trực quan.",
  },
  practice: {
    badgeLabel: "Nộp bài Rubric",
    title: "Thực hành & Chấm Rubric",
    subtitle:
      "Nộp link Figma hoặc ảnh chụp màn hình để lưu minh chứng kỹ năng Junior.",
  },
  hot_topics: {
    badgeLabel: "TOPIC: NEW & HOT",
    title: "TOPIC: NEW & HOT (UI/UX 2025–2026)",
    subtitle:
      "Tin cập nhật Figma Config, Material 3 Expressive, Apple Liquid Glass & đồng bộ RSS thực.",
  },
  guidelines: {
    badgeLabel: "Kho Guideline",
    title: "Kho Guideline Web vs Mobile",
    subtitle:
      "So sánh trực tiếp khác biệt Web vs Mobile (iOS/Android) và tải thêm tài liệu cá nhân.",
  },
  progress: {
    badgeLabel: "Theo dõi & Đánh giá",
    title: "Theo dõi tiến độ & Đánh giá năng lực",
    subtitle:
      "Tổng hợp bài học hoàn thành, rank Junior, 500 bài test, Code Lab và minh chứng 11 nhóm kỹ năng.",
  },
};

export function DashboardClient({
  initialSnapshot,
  initialAuthUser = null,
}: DashboardClientProps) {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<AuthUser | null>(initialAuthUser);
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(
    initialSnapshot ?? null
  );
  const [loading, setLoading] = useState(!initialSnapshot);
  const [error, setError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);
  const [syncingTopics, setSyncingTopics] = useState(false);
  const [topicSyncMessage, setTopicSyncMessage] = useState<string | null>(null);

  const [section, setSection] = useState<RailSectionId>("overview");
  const [miniGameMode, setMiniGameMode] = useState<"minigame" | "quiz">(
    "minigame"
  );
  const [selectedKnowledgeTrackId, setSelectedKnowledgeTrackId] =
    useState<KnowledgeTrackId>("ux-core");
  const [activeLessonId, setActiveLessonId] = useState<string>(
    initialSnapshot?.continueLearning.lesson?.id ?? "les-6-1"
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const [allStagesOpen, setAllStagesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [phasePreviewItem, setPhasePreviewItem] = useState<NavItem | null>(
    null
  );

  const loadSnapshot = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/dashboard", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Máy chủ không trả về dữ liệu bảng điều khiển.");
      }
      const data = (await response.json()) as DashboardSnapshot;
      setSnapshot(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể kết nối tới cơ sở dữ liệu học tập."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialSnapshot) {
      void loadSnapshot();
    }
  }, [initialSnapshot, loadSnapshot]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showBanner = (message: string) => {
    setFeedbackBanner(message);
    setTimeout(() => {
      setFeedbackBanner((current) => (current === message ? null : current));
    }, 4000);
  };

  const runAction = async (
    actionKey: string,
    payload: Record<string, unknown>,
    successMessage?: string
  ) => {
    setBusyAction(actionKey);
    setError(null);
    try {
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as DashboardSnapshot & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error || "Không thể cập nhật dữ liệu.");
      }
      setSnapshot(data);
      if (successMessage) showBanner(successMessage);
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi lưu tiến độ."
      );
      return null;
    } finally {
      setBusyAction(null);
    }
  };

  const openLessonInStudio = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setSection("lesson");
    void runAction("start_lesson", { action: "start_lesson", lessonId });
  };

  const handleSelectSection = (id: RailSectionId) => {
    if (id === "lesson") {
      const targetId =
        snapshot?.continueLearning.lesson?.id ?? activeLessonId ?? "les-6-1";
      openLessonInStudio(targetId);
      return;
    }
    setSection(id);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthUser(null);
    router.push("/login");
    router.refresh();
  };

  const handleToggleRightPanel = async (nextOpen: boolean) => {
    setSnapshot((prev) =>
      prev ? { ...prev, rightPanelOpen: nextOpen } : prev
    );
    await runAction("set_right_panel", {
      action: "set_right_panel",
      open: nextOpen,
    });
  };

  const rightPanelOpen = snapshot?.rightPanelOpen ?? true;
  const pendingTaskCount =
    snapshot?.todayTasks.filter((t) => !t.isCompleted).length ?? 0;
  const currentMeta = SECTION_META[section];

  return (
    <div className="min-h-screen bg-[#121316]">
      <TopNav
        activeSection={section}
        activeSectionLabel={currentMeta.badgeLabel}
        gamification={
          snapshot?.gamification ?? {
            enabled: true,
            level: 1,
            totalXp: 0,
            todayXp: 0,
            dailyGoalXp: 50,
            streakDays: 0,
          }
        }
        authUser={authUser}
        onSelectSection={handleSelectSection}
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={handleLogout}
      />

      <main className="manae-canvas-surface min-h-[calc(100vh-4rem)] rounded-t-2xl border-t border-white/10 px-3 py-5 sm:px-5 lg:px-7">
        <div className="mx-auto max-w-[1520px] space-y-4">
          {feedbackBanner && (
            <div
              role="status"
              className="flex items-center justify-between gap-3 rounded-2xl border border-[#B6E3C3] bg-[#D4F0DC] px-4 py-2.5 text-xs font-medium text-[#133220]"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {feedbackBanner}
              </span>
              <button
                type="button"
                onClick={() => setFeedbackBanner(null)}
                aria-label="Ẩn thông báo"
                className="cursor-pointer rounded-full p-1 hover:bg-black/5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {loading ? (
            <DashboardSkeleton />
          ) : error && !snapshot ? (
            <ErrorState message={error} onRetry={loadSnapshot} />
          ) : snapshot ? (
            <>
              {error && <ErrorState message={error} onRetry={loadSnapshot} />}

              {/* 3-Column Shell: Floating Left Rail + Center Workspace + Collapsible Today Panel */}
              <div className="flex items-start gap-4 lg:gap-5">
                <LeftFeatureRail
                  activeId={section}
                  pendingTaskCount={pendingTaskCount}
                  rightPanelOpen={rightPanelOpen}
                  onSelect={handleSelectSection}
                  onOpenSettings={() => setSettingsOpen(true)}
                  onToggleRightPanel={() =>
                    void handleToggleRightPanel(!rightPanelOpen)
                  }
                />

                {/* Center + Right Grid */}
                <div className="min-w-0 flex-1 space-y-4">
                  {/* Context Header Card */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E3E0D7] bg-white/95 px-4 py-3 shadow-[0_2px_10px_rgba(18,19,22,0.03)]">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <MeowAvatar size={32} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h1 className="truncate text-sm font-extrabold text-[#17181C] sm:text-base">
                            {currentMeta.title}
                          </h1>
                        </div>
                        <p className="hidden truncate text-[11px] text-[#6B6C72] sm:block">
                          {currentMeta.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          void runAction(
                            "set_track_mode",
                            {
                              action: "set_track_mode",
                              mode:
                                snapshot.trackMode === "junior"
                                  ? "all"
                                  : "junior",
                            },
                            snapshot.trackMode === "junior"
                              ? "Đã hiện toàn bộ 8 chặng (gồm Beginner)."
                              : "Đã bật chế độ Junior (bỏ qua bài Beginner)."
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Badge tone="lavender">
                          {snapshot.trackMode === "junior"
                            ? "Junior Track (Skip Beginner)"
                            : "Đủ 8 chặng"}
                        </Badge>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSearchOpen(true)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#E3E0D7] bg-[#F7F6F2] px-3 py-1 text-xs font-medium text-[#4E4F54] transition-colors hover:border-[#BEB9AD] hover:bg-white"
                      >
                        <Search className="h-3.5 w-3.5 shrink-0" />
                        <span className="hidden sm:inline">Tìm nhanh</span>
                        <kbd className="rounded border border-[#DFDBD1] bg-white px-1 font-sans text-[10px] font-bold">
                          ⌘K
                        </kbd>
                      </button>

                      {rightPanelOpen ? (
                        <button
                          type="button"
                          onClick={() => {
                            const el =
                              document.getElementById("today-panel-drawer");
                            el?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#E3E0D7] bg-[#F7F6F2] px-3 py-1 text-xs font-semibold text-[#17181C] transition-colors hover:bg-white lg:hidden"
                        >
                          <PanelRightOpen className="h-3.5 w-3.5 shrink-0" />
                          <span>Hôm nay ({pendingTaskCount})</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => void handleToggleRightPanel(true)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#17181C] px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-[#2A2C33] lg:hidden"
                        >
                          <PanelRightOpen className="h-3.5 w-3.5" />
                          <span>Mở Hôm nay ({pendingTaskCount})</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Center Workspace + Right Today Panel */}
                  <div className="flex flex-col items-start gap-5 lg:flex-row">
                    <div className="w-full min-w-0 flex-1 space-y-5">
                      {/* 1. OVERVIEW */}
                      {section === "overview" && (
                        <div className="space-y-5">
                          <DailyUiAuditHero
                            onOpenSandbox={() => {
                              setMiniGameMode("minigame");
                              setSection("minigames");
                            }}
                            onOpenTestBank={() => setSection("test_bank")}
                          />

                          <Card className="p-5 sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <Badge tone="lavender">
                                  <Compass className="h-3 w-3" />
                                  Lộ trình Tổng thể Junior UI/UX → FE
                                </Badge>
                                <h2 className="mt-1.5 text-base font-bold tracking-tight text-[#17181C]">
                                  Quy trình học chuẩn 4 bước: Lý thuyết → Test → Figma → FE
                                </h2>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge tone="mint">
                                  {snapshot.knowledgeBank?.masteredCount ?? 0}/
                                  {snapshot.knowledgeBank?.totalQuestions ?? 500}{" "}
                                  câu Test đã đạt
                                </Badge>
                                <button
                                  type="button"
                                  onClick={() => setSection("terminology")}
                                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#DBC9FA] bg-[#F4EEFF] px-3 py-1 text-xs font-bold text-[#4B2D8A] transition-colors hover:border-[#A78BFA]"
                                >
                                  <Shapes className="h-3.5 w-3.5" />
                                  42 Thuật ngữ UI (Nối hình)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSection("progress")}
                                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#E3E0D7] bg-[#FAF9F5] px-3 py-1 text-xs font-bold text-[#17181C] transition-colors hover:border-[#BEB9AD] hover:bg-white"
                                >
                                  <BarChart3 className="h-3.5 w-3.5 text-[#5A5B60]" />
                                  Theo dõi &amp; Đánh giá
                                  <ArrowRight className="h-3 w-3 text-[#5A5B60]" />
                                </button>
                              </div>
                            </div>

                            {/* 4 Balanced Core Steps (No orphaned gap) */}
                            <div
                              className={`mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 ${
                                rightPanelOpen ? "2xl:grid-cols-4" : "xl:grid-cols-4"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => setSection("roadmap")}
                                className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[#C5E2FA] bg-[#EDF6FD] p-4 text-left transition-all hover:border-[#7DBAF2]"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#1A4E7A] shadow-xs">
                                      <BookOpen className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="text-[11px] font-bold text-[#1A4E7A]">
                                      {snapshot.overview.completedLessons}/
                                      {snapshot.overview.totalLessons} bài
                                    </span>
                                  </div>
                                  <div className="mt-2.5 text-[11px] font-extrabold uppercase tracking-wide text-[#1A4E7A]">
                                    Bước 1 · Lý thuyết &amp; Lộ trình
                                  </div>
                                  <div className="mt-1 line-clamp-2 text-xs font-bold text-[#17181C]">
                                    {snapshot.continueLearning.lesson?.title ??
                                      "Lộ trình 8 chặng Junior"}
                                  </div>
                                </div>
                                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#1A4E7A]">
                                  Mở lộ trình
                                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSection("test_bank")}
                                className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[#BEE7C9] bg-[#EAF9EF] p-4 text-left transition-all hover:border-[#68C481]"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#195734] shadow-xs">
                                      <ShieldCheck className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="text-[11px] font-bold text-[#195734]">
                                      {snapshot.knowledgeBank?.masteredCount ?? 0}
                                      /{snapshot.knowledgeBank?.totalQuestions ?? 500}{" "}
                                      câu
                                    </span>
                                  </div>
                                  <div className="mt-2.5 text-[11px] font-extrabold uppercase tracking-wide text-[#195734]">
                                    Bước 2 · Kiểm chứng &amp; Phản xạ
                                  </div>
                                  <div className="mt-1 text-xs font-bold text-[#17181C]">
                                    500 Bài Test (100 câu/chặng) &amp; Mini-Game
                                  </div>
                                </div>
                                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#195734]">
                                  Vào làm Test
                                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSection("practice")}
                                className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[#EADCA8] bg-[#FCF7E3] p-4 text-left transition-all hover:border-[#D4BE6E]"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#6B5310] shadow-xs">
                                      <Layers className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="text-[11px] font-bold text-[#6B5310]">
                                      {snapshot.submissions.length} bài nộp
                                    </span>
                                  </div>
                                  <div className="mt-2.5 text-[11px] font-extrabold uppercase tracking-wide text-[#6B5310]">
                                    Bước 3 · Thiết kế &amp; Chấm Rubric
                                  </div>
                                  <div className="mt-1 text-xs font-bold text-[#17181C]">
                                    Làm Figma thật, nộp link &amp; chấm chuẩn Junior
                                  </div>
                                </div>
                                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#6B5310]">
                                  Nộp bài ngay
                                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSection("ui_to_fe")}
                                className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[#DBC9FA] bg-[#F4EEFF] p-4 text-left transition-all hover:border-[#A78BFA]"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#4B2D8A] shadow-xs">
                                      <Code2 className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="text-[11px] font-bold text-[#4B2D8A]">
                                      {(snapshot.codeLabCompletedIds ?? []).length}
                                      /4 bài
                                    </span>
                                  </div>
                                  <div className="mt-2.5 text-[11px] font-extrabold uppercase tracking-wide text-[#4B2D8A]">
                                    Bước 4 · Chuyển giao UI → FE Code
                                  </div>
                                  <div className="mt-1 text-xs font-bold text-[#17181C]">
                                    Dịch Auto Layout, Tokens &amp; A11y sang Tailwind/CSS
                                  </div>
                                </div>
                                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#4B2D8A]">
                                  Mở Code Lab
                                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </span>
                              </button>
                            </div>

                            {/* Dedicated 3-Column Reference, Teamwork & Live Updates Shelf */}
                            <div className="mt-3.5 grid grid-cols-1 gap-3 border-t border-[#ECEAE3] pt-3.5 md:grid-cols-3">
                              <button
                                type="button"
                                onClick={() => setSection("collab")}
                                className="group flex w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#C5E2FA] bg-[#EDF6FD] px-4 py-3 text-left transition-all hover:border-[#7DBAF2]"
                              >
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#1A4E7A] shadow-xs">
                                    <Users className="h-4 w-4" />
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#1A4E7A]">
                                      Teamwork · BA &amp; Dev (5 Ca)
                                    </div>
                                    <div className="truncate text-xs font-bold text-[#17181C]">
                                      Hỏi Edge Case, Handoff &amp; Design QA
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight className="h-4 w-4 shrink-0 text-[#1A4E7A] transition-transform group-hover:translate-x-0.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setSection("hot_topics")}
                                className="group flex w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#F4CEDC] bg-[#FDF0F5] px-4 py-3 text-left transition-all hover:border-[#E58AA9]"
                              >
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#7A2343] shadow-xs">
                                    <Flame className="h-4 w-4" />
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#7A2343]">
                                      Cập nhật · NEW &amp; HOT (
                                      {(snapshot.hotTopics ?? []).length} bài)
                                    </div>
                                    <div className="truncate text-xs font-bold text-[#17181C]">
                                      Figma 2026, Liquid Glass &amp; AI UX
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight className="h-4 w-4 shrink-0 text-[#7A2343] transition-transform group-hover:translate-x-0.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setSection("guidelines")}
                                className="group flex w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] px-4 py-3 text-left transition-all hover:border-[#BEB9AD] hover:bg-white"
                              >
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#17181C] shadow-xs">
                                    <BookMarked className="h-4 w-4" />
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#5A5B60]">
                                      Tra cứu · Guideline ({snapshot.resources.length}{" "}
                                      tài liệu)
                                    </div>
                                    <div className="truncate text-xs font-bold text-[#17181C]">
                                      NN/g, Apple HIG, Material 3 &amp; WCAG 2.2
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight className="h-4 w-4 shrink-0 text-[#4E4F54] transition-transform group-hover:translate-x-0.5" />
                              </button>
                            </div>
                          </Card>
                        </div>
                      )}

                      {/* 2. ROADMAP UC02 */}
                      {section === "roadmap" && (
                        <RoadmapView
                          stages={snapshot.stages}
                          trackMode={snapshot.trackMode}
                          recommendedLessonId={
                            snapshot.continueLearning.lesson?.id ?? null
                          }
                          knowledgeTracks={snapshot.knowledgeBank?.tracks ?? []}
                          onOpenKnowledgeTrack={(trackId) => {
                            setSelectedKnowledgeTrackId(trackId);
                            setSection("test_bank");
                          }}
                          onToggleTrackMode={(mode) =>
                            void runAction("set_track_mode", {
                              action: "set_track_mode",
                              mode,
                            })
                          }
                          onOpenLesson={openLessonInStudio}
                        />
                      )}

                      {/* 3. LESSON STUDIO UC03 */}
                      {section === "lesson" && (
                        <LessonStudio
                          lessonId={activeLessonId}
                          onBackToRoadmap={() => setSection("roadmap")}
                          onOpenPracticeTab={() => setSection("practice")}
                          onSelectLessonId={openLessonInStudio}
                          onDashboardUpdated={(updated) => setSnapshot(updated)}
                        />
                      )}

                      {/* 4. UI -> FE CODE LAB */}
                      {section === "ui_to_fe" && (
                        <UiToFeLab
                          completedModuleIds={
                            snapshot.codeLabCompletedIds ?? []
                          }
                          busy={busyAction === "complete_code_lab"}
                          onSubmitChallenge={async (
                            moduleId,
                            selectedOptionId
                          ) => {
                            setBusyAction("complete_code_lab");
                            setError(null);
                            try {
                              const res = await fetch("/api/updates", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  action: "complete_code_lab",
                                  moduleId,
                                  selectedOptionId,
                                }),
                              });
                              const data = (await res.json()) as {
                                labResult?: {
                                  isCorrect: boolean;
                                  explanation: string;
                                  xpAwarded: number;
                                };
                                snapshot?: DashboardSnapshot;
                                error?: string;
                              };
                              if (!res.ok || !data.snapshot || !data.labResult) {
                                throw new Error(
                                  data.error || "Không thể lưu kết quả UI → FE."
                                );
                              }
                              setSnapshot(data.snapshot);
                              if (data.labResult.isCorrect) {
                                showBanner(
                                  `Hoàn thành bài UI → FE Code!${
                                    data.labResult.xpAwarded > 0
                                      ? ` +${data.labResult.xpAwarded} XP`
                                      : ""
                                  }`
                                );
                              }
                              return data.labResult;
                            } catch (err) {
                              setError(
                                err instanceof Error
                                  ? err.message
                                  : "Lỗi gửi kết quả UI → FE."
                              );
                              return null;
                            } finally {
                              setBusyAction(null);
                            }
                          }}
                        />
                      )}

                      {/* 4b. COLLABORATION WITH BA & DEV */}
                      {section === "collab" && <BaDevCollabStudio />}

                      {/* 4c. UI COMPONENT TERMINOLOGY & VISUAL MATCHING */}
                      {section === "terminology" && <UiTerminologyStudio />}

                      {/* 5. 500 TEST ROADMAP BANK */}
                      {section === "test_bank" && (
                        <KnowledgeRoadmapBank
                          key={selectedKnowledgeTrackId}
                          totalQuestions={
                            snapshot.knowledgeBank?.totalQuestions ?? 500
                          }
                          masteredCount={
                            snapshot.knowledgeBank?.masteredCount ?? 0
                          }
                          masteredQuestionIds={
                            snapshot.knowledgeBank?.masteredQuestionIds ?? []
                          }
                          tracks={snapshot.knowledgeBank?.tracks ?? []}
                          initialTrackId={selectedKnowledgeTrackId}
                          busy={busyAction === "submit_knowledge_milestone"}
                          onSubmitMilestone={async (
                            trackId,
                            milestone,
                            answers
                          ) => {
                            setBusyAction("submit_knowledge_milestone");
                            setError(null);
                            try {
                              const res = await fetch("/api/updates", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  action: "submit_knowledge_milestone",
                                  trackId,
                                  milestone,
                                  answers,
                                }),
                              });
                              const data = (await res.json()) as {
                                snapshot?: DashboardSnapshot;
                                milestoneResult?: {
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
                                };
                                error?: string;
                              };
                              if (
                                !res.ok ||
                                !data.snapshot ||
                                !data.milestoneResult
                              ) {
                                throw new Error(
                                  data.error || "Không thể chấm Mốc bài test."
                                );
                              }
                              setSnapshot(data.snapshot);
                              if (data.milestoneResult.passed) {
                                showBanner(
                                  `Đạt Mốc ${data.milestoneResult.milestone} (${data.milestoneResult.scorePercent}%)${
                                    data.milestoneResult.xpAwarded > 0
                                      ? ` · +${data.milestoneResult.xpAwarded} XP`
                                      : ""
                                  }`
                                );
                              }
                              return data.milestoneResult;
                            } catch (err) {
                              setError(
                                err instanceof Error
                                  ? err.message
                                  : "Lỗi chấm Mốc bài test."
                              );
                              return null;
                            } finally {
                              setBusyAction(null);
                            }
                          }}
                        />
                      )}

                      {/* 6. MINI-GAMES & QUICK STANDARD QUIZ */}
                      {section === "minigames" && (
                        <div className="space-y-4">
                          <div
                            role="tablist"
                            aria-label="Chọn bài luyện nhanh"
                            className="flex flex-wrap gap-1 rounded-2xl border border-[#E3E0D7] bg-white p-1 shadow-xs sm:inline-flex"
                          >
                            <button
                              type="button"
                              role="tab"
                              aria-selected={miniGameMode === "minigame"}
                              onClick={() => setMiniGameMode("minigame")}
                              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
                                miniGameMode === "minigame"
                                  ? "bg-[#17181C] text-white"
                                  : "text-[#5A5B60] hover:bg-[#F7F6F2]"
                              }`}
                            >
                              <Gamepad2 className="h-3.5 w-3.5" />
                              <span>
                                Mini-Game Thị giác ({snapshot.miniGames.length})
                              </span>
                            </button>
                            <button
                              type="button"
                              role="tab"
                              aria-selected={miniGameMode === "quiz"}
                              onClick={() => setMiniGameMode("quiz")}
                              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
                                miniGameMode === "quiz"
                                  ? "bg-[#17181C] text-white"
                                  : "text-[#5A5B60] hover:bg-[#F7F6F2]"
                              }`}
                            >
                              <ShieldCheck className="h-3.5 w-3.5" />
                              <span>
                                Quiz Chuẩn Nhanh (
                                {snapshot.guidelineQuiz.questions.length} câu)
                              </span>
                            </button>
                          </div>

                          {miniGameMode === "minigame" ? (
                            <MiniGameLab
                              challenges={snapshot.miniGames}
                              busy={busyAction === "submit_minigame"}
                              onSubmitAttempt={async (
                                challengeId,
                                selectedOptionId
                              ) => {
                                setBusyAction("submit_minigame");
                                setError(null);
                                try {
                                  const res = await fetch("/api/dashboard", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      action: "submit_minigame",
                                      challengeId,
                                      selectedOptionId,
                                    }),
                                  });
                                  const data = (await res.json()) as {
                                    snapshot?: DashboardSnapshot;
                                    isCorrect?: boolean;
                                    whyItMatters?: string;
                                    error?: string;
                                  };
                                  if (!res.ok || !data.snapshot) {
                                    throw new Error(
                                      data.error ||
                                        "Không thể chấm kết quả Mini-Game."
                                    );
                                  }
                                  setSnapshot(data.snapshot);
                                  return {
                                    isCorrect: Boolean(data.isCorrect),
                                    whyItMatters: data.whyItMatters ?? "",
                                  };
                                } catch (err) {
                                  setError(
                                    err instanceof Error
                                      ? err.message
                                      : "Lỗi gửi kết quả."
                                  );
                                  return null;
                                } finally {
                                  setBusyAction(null);
                                }
                              }}
                            />
                          ) : (
                            <GuidelineQuizCard
                              questions={snapshot.guidelineQuiz.questions}
                              latestAttempt={
                                snapshot.guidelineQuiz.latestAttempt
                              }
                              bestScorePercent={
                                snapshot.guidelineQuiz.bestScorePercent
                              }
                              busy={busyAction === "submit_guideline_quiz"}
                              onSubmitQuiz={async (answers) => {
                                setBusyAction("submit_guideline_quiz");
                                setError(null);
                                try {
                                  const res = await fetch("/api/updates", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      action: "submit_guideline_quiz",
                                      answers,
                                    }),
                                  });
                                  const data = (await res.json()) as {
                                    snapshot?: DashboardSnapshot;
                                    quizResult?: {
                                      attempt: DashboardSnapshot["guidelineQuiz"]["latestAttempt"] & {};
                                      xpAwarded: number;
                                      results: {
                                        questionId: string;
                                        selectedOptionId: string | null;
                                        correctOptionId: string;
                                        isCorrect: boolean;
                                        explanation: string;
                                      }[];
                                    };
                                    error?: string;
                                  };
                                  if (
                                    !res.ok ||
                                    !data.snapshot ||
                                    !data.quizResult
                                  ) {
                                    throw new Error(
                                      data.error ||
                                        "Không thể chấm Quiz Quy chuẩn."
                                    );
                                  }
                                  setSnapshot(data.snapshot);
                                  if (data.quizResult.attempt.passed) {
                                    showBanner(
                                      `Đạt Quiz Quy chuẩn UI/UX (${data.quizResult.attempt.scorePercent}%)${
                                        data.quizResult.xpAwarded > 0
                                          ? ` · +${data.quizResult.xpAwarded} XP`
                                          : ""
                                      }`
                                    );
                                  }
                                  return data.quizResult;
                                } catch (err) {
                                  setError(
                                    err instanceof Error
                                      ? err.message
                                      : "Lỗi gửi bài Quiz Quy chuẩn."
                                  );
                                  return null;
                                } finally {
                                  setBusyAction(null);
                                }
                              }}
                            />
                          )}
                        </div>
                      )}

                      {/* 7. PRACTICE STUDIO */}
                      {section === "practice" && (
                        <PracticeStudio
                          briefs={snapshot.practiceBriefs}
                          submissions={snapshot.submissions}
                          aiMentorConfigured={snapshot.aiMentorConfigured}
                          busy={busyAction === "submit_practice"}
                          onSubmitPractice={async (input) => {
                            setBusyAction("submit_practice");
                            setError(null);
                            try {
                              const res = await fetch("/api/dashboard", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  action: "submit_practice",
                                  ...input,
                                }),
                              });
                              const data = (await res.json()) as {
                                snapshot?: DashboardSnapshot;
                                aiNote?: string;
                                error?: string;
                              };
                              if (!res.ok || !data.snapshot) {
                                throw new Error(
                                  data.error || "Không thể lưu bài nộp."
                                );
                              }
                              setSnapshot(data.snapshot);
                              showBanner(
                                "Đã lưu bài thực hành & cập nhật minh chứng kỹ năng!"
                              );
                              return { aiNote: data.aiNote ?? "" };
                            } catch (err) {
                              setError(
                                err instanceof Error
                                  ? err.message
                                  : "Lỗi khi nộp bài."
                              );
                              return null;
                            } finally {
                              setBusyAction(null);
                            }
                          }}
                        />
                      )}

                      {/* 8. TOPIC: NEW & HOT */}
                      {section === "hot_topics" && (
                        <HotTopicsCard
                          topics={snapshot.hotTopics ?? []}
                          syncing={syncingTopics}
                          syncMessage={topicSyncMessage}
                          onSyncTopics={async () => {
                            setSyncingTopics(true);
                            setTopicSyncMessage(null);
                            try {
                              const res = await fetch("/api/updates", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  action: "sync_hot_topics",
                                }),
                              });
                              const data = (await res.json()) as {
                                syncResult?: { message: string };
                                snapshot?: DashboardSnapshot;
                                error?: string;
                              };
                              if (!res.ok || !data.snapshot) {
                                throw new Error(
                                  data.error || "Không thể cập nhật TOPIC mới."
                                );
                              }
                              setSnapshot(data.snapshot);
                              setTopicSyncMessage(
                                data.syncResult?.message ??
                                  "Đã hoàn tất kiểm tra nguồn RSS."
                              );
                            } catch (err) {
                              setTopicSyncMessage(
                                err instanceof Error
                                  ? err.message
                                  : "Lỗi đồng bộ RSS."
                              );
                            } finally {
                              setSyncingTopics(false);
                            }
                          }}
                        />
                      )}

                      {/* 9. GUIDELINE LIBRARY */}
                      {section === "guidelines" && (
                        <ResourceLibraryCard
                          resources={snapshot.resources ?? []}
                          busyAction={busyAction}
                          onAddResource={async (input: {
                            title: string;
                            track: ResourceTrack;
                            summary: string;
                            keyPointsText?: string;
                            sourceName?: string;
                            sourceUrl?: string;
                          }) => {
                            const updated = await runAction(
                              "add_resource",
                              { action: "add_resource", ...input },
                              "Đã lưu tài liệu mới vào kho học tập của bạn."
                            );
                            return Boolean(updated);
                          }}
                        />
                      )}

                      {/* 10. PROGRESS & SKILL EVALUATION */}
                      {section === "progress" && (
                        <div className="space-y-5">
                          <OverviewStats
                            overview={snapshot.overview}
                            gamification={snapshot.gamification}
                            knowledgeMasteredCount={
                              snapshot.knowledgeBank?.masteredCount ?? 0
                            }
                            knowledgeTotal={
                              snapshot.knowledgeBank?.totalQuestions ?? 500
                            }
                          />

                          <Card className="p-5 sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <Badge tone="lavender">
                                  <BarChart3 className="h-3 w-3" />
                                  Chỉ số thực hành &amp; kiểm chứng
                                </Badge>
                                <h2 className="mt-1.5 text-base font-bold tracking-tight text-[#17181C]">
                                  Hồ sơ kiểm tra, Code Lab &amp; Rubric đã nộp
                                </h2>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                              <button
                                type="button"
                                onClick={() => setSection("test_bank")}
                                className="group flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#BEE7C9] bg-[#EAF9EF] p-4 text-left transition-all hover:border-[#68C481]"
                              >
                                <div className="min-w-0">
                                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#195734]">
                                    Ngân hàng 500 Bài Test
                                  </div>
                                  <div className="mt-1 text-lg font-extrabold text-[#17181C]">
                                    {snapshot.knowledgeBank?.masteredCount ?? 0}
                                    <span className="text-xs font-semibold text-[#5A5B60]">
                                      /
                                      {snapshot.knowledgeBank?.totalQuestions ??
                                        500}{" "}
                                      câu đạt
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="h-4 w-4 shrink-0 text-[#195734] transition-transform group-hover:translate-x-0.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setSection("ui_to_fe")}
                                className="group flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#DBC9FA] bg-[#F4EEFF] p-4 text-left transition-all hover:border-[#A78BFA]"
                              >
                                <div className="min-w-0">
                                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#4B2D8A]">
                                    UI → FE Code Lab
                                  </div>
                                  <div className="mt-1 text-lg font-extrabold text-[#17181C]">
                                    {(snapshot.codeLabCompletedIds ?? []).length}
                                    <span className="text-xs font-semibold text-[#5A5B60]">
                                      /4 bài hoàn thành
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="h-4 w-4 shrink-0 text-[#4B2D8A] transition-transform group-hover:translate-x-0.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setSection("practice")}
                                className="group flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#EADCA8] bg-[#FCF7E3] p-4 text-left transition-all hover:border-[#D4BE6E]"
                              >
                                <div className="min-w-0">
                                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#6B5310]">
                                    Bài thực hành Rubric
                                  </div>
                                  <div className="mt-1 text-lg font-extrabold text-[#17181C]">
                                    {snapshot.submissions.length}
                                    <span className="text-xs font-semibold text-[#5A5B60]">
                                      {" "}
                                      bài đã nộp
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="h-4 w-4 shrink-0 text-[#6B5310] transition-transform group-hover:translate-x-0.5" />
                              </button>
                            </div>
                          </Card>

                          <SkillOverviewCard
                            skills={snapshot.skills}
                            learnerBackground={snapshot.learner.background}
                          />
                        </div>
                      )}
                    </div>

                    {/* Collapsible Right Panel / Mini Docked Rail */}
                    <div
                      id="today-panel-drawer"
                      className={`shrink-0 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:sticky lg:top-4 ${
                        rightPanelOpen
                          ? "w-full min-w-0 lg:w-[304px] xl:w-[340px]"
                          : "hidden lg:block lg:w-[64px]"
                      }`}
                    >
                      <TodayPanel
                        snapshot={snapshot}
                        busyAction={busyAction}
                        collapsed={!rightPanelOpen}
                        onClosePanel={() => void handleToggleRightPanel(false)}
                        onOpenPanel={() => void handleToggleRightPanel(true)}
                        onContinueLearning={() => {
                          if (snapshot.continueLearning.lesson) {
                            openLessonInStudio(
                              snapshot.continueLearning.lesson.id
                            );
                          }
                        }}
                        onToggleTask={async (taskId) => {
                          await runAction(`toggle_${taskId}`, {
                            action: "toggle_task",
                            taskId,
                          });
                        }}
                        onAddTask={async (input: {
                          title: string;
                          category: TaskCategory;
                          description?: string;
                        }) => {
                          await runAction(
                            "add_task",
                            { action: "add_task", ...input },
                            "Đã thêm nhiệm vụ học tập mới cho hôm nay."
                          );
                        }}
                        onClearCompletedTasks={async () => {
                          await runAction("clear_completed", {
                            action: "clear_completed_tasks",
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>

      {snapshot && (
        <>
          <SearchCommandModal
            open={searchOpen}
            stages={snapshot.stages}
            onClose={() => setSearchOpen(false)}
            onSelectLesson={(lesson) => openLessonInStudio(lesson.id)}
          />

          <AllStagesModal
            open={allStagesOpen}
            stages={snapshot.stages}
            onClose={() => setAllStagesOpen(false)}
          />

          <SettingsModal
            open={settingsOpen}
            snapshot={snapshot}
            busy={
              busyAction === "toggle_gamification" ||
              busyAction === "reset_progress"
            }
            onClose={() => setSettingsOpen(false)}
            onToggleGamification={async (enabled) => {
              await runAction(
                "toggle_gamification",
                { action: "toggle_gamification", enabled },
                enabled
                  ? "Đã bật hiển thị XP và Streak."
                  : "Đã chuyển sang chế độ tập trung (ẩn XP & Streak)."
              );
            }}
            onResetProgress={async () => {
              await runAction(
                "reset_progress",
                { action: "reset_progress" },
                "Đã đặt lại toàn bộ dữ liệu về trạng thái ban đầu."
              );
              setSettingsOpen(false);
            }}
          />
        </>
      )}

      <PhasePreviewModal
        item={phasePreviewItem}
        onClose={() => setPhasePreviewItem(null)}
      />
    </div>
  );
}
