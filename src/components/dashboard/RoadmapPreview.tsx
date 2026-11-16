"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  Lock,
  PenTool,
  Play,
} from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type {
  LearnerTrackMode,
  LessonWithProgress,
  StageWithProgress,
} from "@/types/learning";

interface RoadmapPreviewProps {
  stages: StageWithProgress[];
  trackMode: LearnerTrackMode;
  currentStageNumber: number;
  recommendedLessonId: string | null;
  onSelectLesson: (lesson: LessonWithProgress, stage: StageWithProgress) => void;
  onOpenAllStages: () => void;
  onToggleTrackMode: (mode: LearnerTrackMode) => void;
}

const DIFFICULTY_BADGE: Record<string, BadgeTone> = {
  Beginner: "mint",
  Intermediate: "blue",
  Advanced: "pink",
};

export function RoadmapPreview({
  stages,
  trackMode,
  currentStageNumber,
  recommendedLessonId,
  onSelectLesson,
  onOpenAllStages,
  onToggleTrackMode,
}: RoadmapPreviewProps) {
  const [selectedStageOrder, setSelectedStageOrder] =
    useState<number>(currentStageNumber);
  const [viewMode, setViewMode] = useState<"connected" | "list">("connected");

  const visibleStages =
    trackMode === "junior" ? stages.filter((s) => s.order >= 4) : stages;

  const activeStage =
    visibleStages.find((s) => s.order === selectedStageOrder) ??
    visibleStages.find((s) => s.order === currentStageNumber) ??
    visibleStages[0];
  const stageLessons = activeStage.modules.flatMap((m) => m.lessons);
  const isStageLocked = activeStage.status === "locked";

  return (
    <section aria-label="Xem trước lộ trình học tập" className="space-y-4">
      {/* Stage Selector + View Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center rounded-full border border-[#DFDCD3] bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode("connected")}
              title="Dạng thẻ kết nối"
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === "connected"
                  ? "bg-[#17181C] text-white"
                  : "text-[#5A5B60] hover:text-[#17181C]"
              }`}
            >
              Sơ đồ chặng
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              title="Dạng danh sách"
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-[#17181C] text-white"
                  : "text-[#5A5B60] hover:text-[#17181C]"
              }`}
            >
              Danh sách bài
            </button>
          </div>

          <span className="text-xs font-medium text-[#5A5B60]">
            Chặng {activeStage.order} · {activeStage.englishTitle}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenAllStages}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#17181C] transition-colors hover:text-[#5B35B5]"
        >
          Xem 8 chặng lộ trình
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Horizontal compact stage pills + Junior/All toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {visibleStages.map((stage) => {
            const isSelected = stage.order === activeStage.order;
            const locked = stage.status === "locked";
            const completed = stage.status === "completed";

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageOrder(stage.order)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "border-[#17181C] bg-[#17181C] text-white"
                    : locked
                    ? "border-[#E3E0D7] bg-[#ECEAE3]/70 text-[#7C7D82] hover:bg-[#ECEAE3]"
                    : "border-[#DFDCD3] bg-white text-[#17181C] hover:bg-[#F3F1EB]"
                }`}
              >
                {locked && <Lock className="h-3 w-3 opacity-70" />}
                {completed && (
                  <CheckCircle2 className="h-3 w-3 text-[#2F855A]" />
                )}
                <span>Chặng {stage.order}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            onToggleTrackMode(trackMode === "junior" ? "all" : "junior")
          }
          className="cursor-pointer rounded-full border border-[#D5C2F6] bg-[#EFE6FD] px-3 py-1 text-[11px] font-semibold text-[#4B2D8A] hover:bg-[#E6DAFB]"
        >
          {trackMode === "junior"
            ? "Đang bỏ qua Chặng 1–3 (Mở lại nếu cần)"
            : "Bỏ qua Beginner (Chỉ học Junior Chặng 4–8)"}
        </button>
      </div>

      {/* Stage Goal Banner */}
      <Card tone="white" className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={DIFFICULTY_BADGE[activeStage.level] ?? "neutral"}>
                {activeStage.level}
              </Badge>
              <Badge tone={isStageLocked ? "neutral" : "lavender"}>
                {isStageLocked
                  ? "Chưa mở khóa chính thức"
                  : activeStage.status === "completed"
                  ? "Đã hoàn thành"
                  : activeStage.status === "in_progress"
                  ? "Đang học"
                  : "Sẵn sàng bắt đầu"}
              </Badge>
              <span className="inline-flex items-center gap-1 text-xs text-[#6B6C72]">
                <Clock className="h-3.5 w-3.5" />~{activeStage.estimatedHours} giờ
              </span>
            </div>
            <h2 className="text-base font-bold text-[#17181C] sm:text-lg">
              Chặng {activeStage.order}: {activeStage.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#5A5B60]">
              {activeStage.goal}
            </p>
          </div>
        </div>

        {isStageLocked && activeStage.lockReason && (
          <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-[#DCD9D0] bg-[#F5F3EE] px-3.5 py-2.5 text-xs text-[#5A5B60]">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7C7D82]" />
            <span>
              <strong>Lý do khóa:</strong> {activeStage.lockReason} Bạn vẫn có
              thể xem trước mục tiêu và danh sách bài học bên dưới.
            </span>
          </div>
        )}
      </Card>

      {/* Connected Cards Layout (Inspired by Manae Screenshot) or List Mode */}
      {viewMode === "connected" ? (
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2">
          {stageLessons.slice(0, 6).map((lesson, index) => {
            const isRecommended = lesson.id === recommendedLessonId;
            const isInProgress = lesson.status === "in_progress";
            const isCompleted = lesson.status === "completed";
            const isHighlighted = isRecommended || isInProgress;
            const isLockedCard = isStageLocked && !isCompleted;

            return (
              <div key={lesson.id} className="relative flex items-stretch">
                {/* Subtle connector dot on left for visual progression */}
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-2.5 top-1/2 hidden -translate-y-1/2 items-center md:flex"
                  >
                    <span
                      className={`h-2 w-2 rounded-full border-2 border-white ${
                        isCompleted || isHighlighted
                          ? "bg-[#38A169]"
                          : "bg-[#C9C5B9]"
                      }`}
                    />
                  </div>
                )}

                <Card
                  tone={
                    isCompleted
                      ? "mint"
                      : isHighlighted && !isLockedCard
                      ? "lavender"
                      : "muted"
                  }
                  className={`flex w-full flex-col justify-between p-5 transition-transform duration-150 ${
                    isHighlighted && !isLockedCard
                      ? "hover:-translate-y-0.5"
                      : "opacity-95"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
                          Bài {activeStage.order}.{lesson.order}
                        </span>
                        {isInProgress && (
                          <Badge tone="dark" className="text-[10px]">
                            Đang học
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge tone="mint" className="text-[10px]">
                            Hoàn thành
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-base font-bold leading-snug">
                        {lesson.title}
                      </h3>
                      <p className="text-xs font-medium opacity-75">
                        {lesson.englishSubtitle}
                      </p>
                    </div>

                    {isLockedCard ? (
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4D0C6] bg-white/80 text-[#7C7D82]"
                        title="Cần hoàn thành chặng trước"
                      >
                        <Lock className="h-4 w-4" />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectLesson(lesson, activeStage)}
                        aria-label={`Mở ${lesson.title}`}
                        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#17181C] shadow-sm transition-transform hover:scale-105"
                      >
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      </button>
                    )}
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed opacity-85">
                    {lesson.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2 pt-1">
                    <Button
                      variant="white"
                      size="sm"
                      onClick={() => onSelectLesson(lesson, activeStage)}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {isLockedCard
                        ? "Xem trước"
                        : isInProgress
                        ? "Tiếp tục học"
                        : isRecommended
                        ? "Bắt đầu học"
                        : "Xem chi tiết"}
                    </Button>

                    <div
                      className="flex items-center gap-2 text-[#4E4F54]"
                      title="Thành phần học: Lý thuyết, Ví dụ, Knowledge Check, Thực hành"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      {lesson.hasQuiz && <HelpCircle className="h-3.5 w-3.5" />}
                      {lesson.hasPracticeTask && (
                        <PenTool className="h-3.5 w-3.5" />
                      )}
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2.5">
          {stageLessons.map((lesson) => {
            const isRecommended = lesson.id === recommendedLessonId;
            return (
              <div
                key={lesson.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-[18px] border p-4 transition-colors ${
                  isRecommended && !isStageLocked
                    ? "border-[#D5C2F6] bg-[#E6DAFB]/55"
                    : "border-[#E3E0D7] bg-white"
                }`}
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-[#5A5B60]">
                      Bài {activeStage.order}.{lesson.order}
                    </span>
                    <span className="text-xs text-[#7C7D82]">
                      · ~{lesson.estimatedMinutes} phút
                    </span>
                    {lesson.status === "in_progress" && (
                      <Badge tone="lavender">Đang học</Badge>
                    )}
                    {lesson.status === "completed" && (
                      <Badge tone="mint">Hoàn thành</Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-[#17181C]">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-[#5A5B60]">{lesson.summary}</p>
                </div>

                <Button
                  variant={isRecommended && !isStageLocked ? "dark" : "white"}
                  size="sm"
                  onClick={() => onSelectLesson(lesson, activeStage)}
                >
                  {isStageLocked
                    ? "Xem trước"
                    : lesson.status === "in_progress"
                    ? "Tiếp tục"
                    : "Xem bài"}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {stageLessons.length > 6 && viewMode === "connected" && (
        <div className="flex items-center justify-between rounded-2xl border border-[#E3E0D7] bg-white/80 px-4 py-2.5 text-xs text-[#5A5B60]">
          <span className="flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5" />
            Đang hiển thị 6/{stageLessons.length} bài đầu của Chặng{" "}
            {activeStage.order}.
          </span>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="cursor-pointer font-semibold text-[#17181C] underline-offset-2 hover:underline"
          >
            Xem đủ {stageLessons.length} bài
          </button>
        </div>
      )}
    </section>
  );
}
