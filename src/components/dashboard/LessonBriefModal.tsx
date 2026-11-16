"use client";

import {
  AlertTriangle,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lock,
  PlayCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type {
  LearningResource,
  LessonWithProgress,
  StageWithProgress,
} from "@/types/learning";

interface LessonBriefModalProps {
  open: boolean;
  lesson: LessonWithProgress | null;
  stage: StageWithProgress | null;
  resources: LearningResource[];
  busy: boolean;
  onClose: () => void;
  onMarkInProgress: (lessonId: string) => Promise<void>;
}

export function LessonBriefModal({
  open,
  lesson,
  stage,
  resources,
  busy,
  onClose,
  onMarkInProgress,
}: LessonBriefModalProps) {
  if (!lesson || !stage) return null;

  const isLockedStage = stage.status === "locked";
  const relatedResources = resources.filter(
    (r) => r.stageOrder === stage.order || (stage.order === 1 && r.track === "ux_core")
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Bài ${stage.order}.${lesson.order}: ${lesson.title}`}
      subtitle={`Chặng ${stage.order}: ${stage.title} · ${lesson.englishSubtitle}`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="lavender">{lesson.level}</Badge>
          <Badge
            tone={
              lesson.status === "completed"
                ? "mint"
                : lesson.status === "in_progress"
                ? "blue"
                : "neutral"
            }
          >
            {lesson.status === "completed"
              ? "Đã hoàn thành"
              : lesson.status === "in_progress"
              ? "Đang học"
              : "Chưa bắt đầu"}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs text-[#5A5B60]">
            <Clock className="h-3.5 w-3.5" />~{lesson.estimatedMinutes} phút
          </span>
        </div>

        <p className="text-sm leading-relaxed text-[#17181C]">
          {lesson.summary}
        </p>

        {isLockedStage && stage.lockReason && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-[#DCD9D0] bg-[#ECEAE3] p-3.5 text-xs text-[#4E4F54]">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <strong>Chặng này đang khóa:</strong> {stage.lockReason}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#E3E0D7] bg-white p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A5B60]">
            Mục tiêu bài học (Learning Objectives)
          </h3>
          <ul className="mt-2.5 space-y-2">
            {lesson.objectives.map((obj) => (
              <li
                key={obj}
                className="flex items-start gap-2 text-sm text-[#17181C]"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5B35B5]" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#BDDCF6] bg-[#D9ECFB]/65 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A4E7A]">
            Tiêu chí hoàn thành bài học
          </h3>
          <ul className="mt-2 space-y-1.5">
            {lesson.completionCriteria.map((criterion, index) => (
              <li
                key={criterion}
                className="text-xs font-medium text-[#142A3D]"
              >
                {index + 1}. {criterion}
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] text-[#244969]">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Theo nguyên tắc MeowProduct, việc mở bài học chỉ chuyển trạng thái sang{" "}
              <strong>Đang học</strong> để nút &ldquo;Tiếp tục học&rdquo; ghi nhớ
              đúng vị trí của bạn — không tự đánh dấu hoàn thành hay cộng XP ảo.
            </span>
          </p>
        </div>

        {relatedResources.length > 0 && (
          <div className="rounded-2xl border border-[#D5C2F6] bg-[#EFE6FD]/55 p-4">
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4B2D8A]">
              <BookMarked className="h-3.5 w-3.5" />
              Tài liệu &amp; Guideline liên quan cho chặng này
            </h3>
            <div className="mt-2.5 space-y-2">
              {relatedResources.slice(0, 2).map((res) => (
                <div
                  key={res.id}
                  className="rounded-xl border border-[#DFD2F9] bg-white p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#17181C]">
                      {res.title}
                    </span>
                    {res.sourceUrl && (
                      <a
                        href={res.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#5B35B5] hover:underline"
                      >
                        {res.sourceName}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#5A5B60]">
                    {res.keyPoints[0] ?? res.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#E3E0D7] bg-[#F5F3EE] px-4 py-3 text-xs text-[#5A5B60]">
          <span className="font-semibold text-[#17181C]">
            Ghi chú lộ trình triển khai:
          </span>{" "}
          Bài học đầy đủ 10 phần (Lý thuyết, Good vs Bad, Knowledge Check) sẽ
          được mở trong <strong>Bài học trọng tâm</strong>. Hiện tại bạn đã có
          thể xem trước mục tiêu và tài liệu chuẩn ngay tại đây.
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          {!isLockedStage && (
            <Button
              variant="dark"
              disabled={busy}
              onClick={() => onMarkInProgress(lesson.id)}
            >
              {lesson.status === "in_progress" ? (
                <>
                  <BookOpen className="h-4 w-4" />
                  Đang học (Đã lưu vị trí)
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" />
                  Bắt đầu & Lưu vị trí học
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
