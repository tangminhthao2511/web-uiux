"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  Lock,
  Sparkles,
} from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type {
  KnowledgeTrackId,
  KnowledgeTrackSummary,
  LearnerTrackMode,
  StageWithProgress,
} from "@/types/learning";

interface RoadmapViewProps {
  stages: StageWithProgress[];
  trackMode: LearnerTrackMode;
  recommendedLessonId: string | null;
  knowledgeTracks?: KnowledgeTrackSummary[];
  onOpenKnowledgeTrack?: (trackId: KnowledgeTrackId) => void;
  onToggleTrackMode: (mode: LearnerTrackMode) => void;
  onOpenLesson: (lessonId: string) => void;
}

const STATUS_BADGE: Record<
  StageWithProgress["status"],
  { label: string; tone: BadgeTone }
> = {
  completed: { label: "Hoàn thành", tone: "mint" },
  in_progress: { label: "Đang học", tone: "lavender" },
  not_started: { label: "Sẵn sàng", tone: "blue" },
  locked: { label: "Đang khóa", tone: "neutral" },
};

export function RoadmapView({
  stages,
  trackMode,
  recommendedLessonId,
  knowledgeTracks = [],
  onOpenKnowledgeTrack,
  onToggleTrackMode,
  onOpenLesson,
}: RoadmapViewProps) {
  const [expandedStageIds, setExpandedStageIds] = useState<
    Record<string, boolean>
  >(() => ({
    "stage-4": true,
    "stage-6": true,
    "stage-1": trackMode === "all",
  }));

  const [showSkippedBeginner, setShowSkippedBeginner] = useState(false);

  const juniorStages = stages.filter((s) => s.order >= 4);
  const beginnerStages = stages.filter((s) => s.order < 4);
  const displayStages = trackMode === "junior" ? juniorStages : stages;

  const toggleStage = (stageId: string) => {
    setExpandedStageIds((prev) => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const renderStageCard = (stage: StageWithProgress) => {
    const isExpanded = Boolean(expandedStageIds[stage.id]);
    const isLocked = stage.status === "locked";
    const meta = STATUS_BADGE[stage.status];

    return (
      <Card
        key={stage.id}
        tone={isLocked ? "muted" : "white"}
        className="overflow-hidden p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5B35B5]">
                Chặng {stage.order}
              </span>
              <Badge tone={meta.tone}>
                {isLocked && <Lock className="h-3 w-3" />}
                {stage.status === "completed" && (
                  <CheckCircle2 className="h-3 w-3" />
                )}
                {meta.label}
              </Badge>
              <Badge tone="neutral">{stage.level}</Badge>
              <span className="inline-flex items-center gap-1 text-xs text-[#6B6C72]">
                <Clock className="h-3.5 w-3.5" />~{stage.estimatedHours} giờ ·{" "}
                {stage.completedLessons}/{stage.totalLessons} bài
              </span>
            </div>

            <h3 className="text-base font-bold text-[#17181C] sm:text-lg">
              {stage.title}
            </h3>
            <p className="text-xs leading-relaxed text-[#5A5B60]">
              {stage.goal}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleStage(stage.id)}
          >
            {isExpanded ? (
              <>
                Thu gọn <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Xem bài học <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>

        <div className="mt-3">
          <ProgressBar
            value={stage.completedLessons}
            max={stage.totalLessons}
            colorClass={isLocked ? "bg-[#A4A198]" : "bg-[#5B35B5]"}
            heightClass="h-1.5"
            ariaLabel={`Tiến độ Chặng ${stage.order}`}
          />
        </div>

        {isLocked && stage.lockReason && (
          <div className="mt-3 flex items-start gap-2 rounded-2xl border border-[#D4D0C6] bg-white/75 px-3.5 py-2.5 text-xs text-[#4E4F54]">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              <strong>Chưa mở khóa chính thức:</strong> {stage.lockReason} Bạn
              vẫn có thể xem trước danh sách bài bên dưới.
            </span>
          </div>
        )}

        {isExpanded && (
          <div className="mt-4 space-y-4 border-t border-[#ECEAE3] pt-4">
            {/* Practical Outputs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[11px] font-bold uppercase tracking-wide text-[#5A5B60]">
                Đầu ra thực tế:
              </span>
              {stage.practicalOutputs.map((out) => (
                <span
                  key={out}
                  className="rounded-xl bg-[#F5F3EE] px-2.5 py-0.5 text-[11px] text-[#4E4F54] sm:rounded-full"
                >
                  {out}
                </span>
              ))}
            </div>

            {/* Modules & Lessons */}
            {stage.modules.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <div className="text-xs font-bold text-[#17181C]">
                  {mod.title}
                </div>
                <div className="space-y-2">
                  {mod.lessons.map((lesson) => {
                    const isRecommended = lesson.id === recommendedLessonId;
                    return (
                      <div
                        key={lesson.id}
                        className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 ${
                          isRecommended && !isLocked
                            ? "border-[#D5C2F6] bg-[#E6DAFB]/45"
                            : "border-[#E3E0D7] bg-[#FAF9F6]"
                        }`}
                      >
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-[#4E4F54]">
                              Bài {stage.order}.{lesson.order}
                            </span>
                            <span className="text-[11px] text-[#6B6C72]">
                              ~{lesson.estimatedMinutes} phút
                            </span>
                            {isRecommended && (
                              <Badge tone="lavender">
                                <Sparkles className="h-3 w-3" /> Đề xuất tiếp theo
                              </Badge>
                            )}
                            {lesson.status === "in_progress" && (
                              <Badge tone="blue">Đang học</Badge>
                            )}
                            {lesson.status === "completed" && (
                              <Badge tone="mint">Hoàn thành</Badge>
                            )}
                          </div>
                          <div className="text-sm font-bold text-[#17181C]">
                            {lesson.title}
                          </div>
                          <div className="text-[11px] text-[#5A5B60]">
                            Tiêu chí xong bài: {lesson.completionCriteria.join(" · ")}
                          </div>
                        </div>

                        <Button
                          variant={isRecommended && !isLocked ? "dark" : "white"}
                          size="sm"
                          onClick={() => onOpenLesson(lesson.id)}
                        >
                          {isLocked
                            ? "Xem trước"
                            : lesson.status === "completed"
                            ? "Ôn lại"
                            : lesson.status === "in_progress"
                            ? "Học tiếp"
                            : "Mở bài học"}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  };

  return (
    <section aria-label="Lộ trình học UI/UX chi tiết" className="space-y-4">
      <Card tone="white" className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#E6DAFB] text-[#4B2D8A]">
              <Compass className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[#17181C]">
                Lộ trình kỹ năng Junior UI/UX
              </h2>
              <p className="text-xs text-[#5A5B60]">
                {trackMode === "junior"
                  ? "Đang ưu tiên 5 chặng Junior Thực chiến (Chặng 4–8). Bấm vào bài bất kỳ để mở học ngay."
                  : "Đang hiển thị đủ 8 chặng theo thứ tự tiên quyết từ Beginner đến Junior."}
              </p>
            </div>
          </div>

          <Button
            variant="pastel"
            size="sm"
            onClick={() =>
              onToggleTrackMode(trackMode === "junior" ? "all" : "junior")
            }
          >
            {trackMode === "junior"
              ? "Mở khóa đủ 8 chặng (Có khóa tuần tự)"
              : "Chế độ Junior (Bỏ qua Chặng 1–3)"}
          </Button>
        </div>
      </Card>

      {knowledgeTracks.length > 0 && onOpenKnowledgeTrack && (
        <Card tone="white" className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-[#17181C]">
                Bản đồ 500 Bài Test Kiến thức song song theo Chức năng (5 × 100 câu)
              </h3>
              <p className="text-xs text-[#5A5B60]">
                Mỗi chặng 100 câu chia 5 chủ đề đầy đủ — học phần nào test thẳng chức năng đó.
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {knowledgeTracks.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => onOpenKnowledgeTrack(track.id)}
                className="flex cursor-pointer flex-col justify-between rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-3 text-left transition-colors hover:border-[#5B35B5] hover:bg-[#F4EEFF]"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#5B35B5]">Chặng {track.order}</span>
                    <span className="text-[#195734]">
                      {track.masteredCount}/{track.totalQuestions}
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-[#17181C]">
                    {track.title.replace(/^Chặng \d+ · /, "")}
                  </div>
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#4B2D8A]">
                  Mở {track.totalQuestions} bài test <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {displayStages.map(renderStageCard)}
      </div>

      {trackMode === "junior" && beginnerStages.length > 0 && (
        <div className="rounded-2xl border border-dashed border-[#CFCBC0] bg-white/75 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#5A5B60]">
              3 chặng Beginner (Chặng 1–3) đang được thu gọn để bạn tập trung
              lên Junior.
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSkippedBeginner((prev) => !prev)}
            >
              {showSkippedBeginner
                ? "Ẩn chặng Beginner"
                : "Xem khi cần ôn lại (Chặng 1–3)"}
            </Button>
          </div>
          {showSkippedBeginner && (
            <div className="mt-4 space-y-3">
              {beginnerStages.map(renderStageCard)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
