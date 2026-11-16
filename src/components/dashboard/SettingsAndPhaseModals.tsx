"use client";

import { CheckCircle2, Lock, RotateCcw, Sparkles } from "lucide-react";
import type { NavItem } from "@/components/layout/TopNav";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { DashboardSnapshot, StageWithProgress } from "@/types/learning";

interface AllStagesModalProps {
  open: boolean;
  stages: StageWithProgress[];
  onClose: () => void;
}

export function AllStagesModal({ open, stages, onClose }: AllStagesModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Toàn bộ 8 chặng lộ trình UI/UX & Product Design"
      subtitle="Xem cấu trúc, thứ tự tiên quyết và đầu ra thực hành của từng chặng"
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-3">
        {stages.map((stage) => {
          const locked = stage.status === "locked";
          const completed = stage.status === "completed";
          return (
            <div
              key={stage.id}
              className={`rounded-2xl border p-4 ${
                locked
                  ? "border-[#E3E0D7] bg-[#F2F0EA]"
                  : "border-[#D5C2F6] bg-white"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#5B35B5]">
                    Chặng {stage.order}
                  </span>
                  <Badge tone="neutral">{stage.level}</Badge>
                  <span className="text-xs text-[#6B6C72]">
                    {stage.totalLessons} bài · ~{stage.estimatedHours} giờ
                  </span>
                </div>
                <Badge
                  tone={
                    completed ? "mint" : locked ? "neutral" : "lavender"
                  }
                >
                  {locked ? (
                    <>
                      <Lock className="h-3 w-3" /> Chưa mở khóa
                    </>
                  ) : completed ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" /> Hoàn thành
                    </>
                  ) : (
                    `${stage.completedLessons}/${stage.totalLessons} bài`
                  )}
                </Badge>
              </div>

              <h3 className="mt-1.5 text-sm font-bold text-[#17181C]">
                {stage.title}
              </h3>
              <p className="mt-0.5 text-xs text-[#5A5B60]">{stage.goal}</p>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {stage.practicalOutputs.map((out) => (
                  <span
                    key={out}
                    className="rounded-full bg-[#F5F3EE] px-2.5 py-0.5 text-[11px] text-[#4E4F54]"
                  >
                    {out}
                  </span>
                ))}
              </div>

              {locked && stage.lockReason && (
                <p className="mt-2 text-[11px] text-[#6B6C72]">
                  {stage.lockReason}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

interface PhasePreviewModalProps {
  item: NavItem | null;
  onClose: () => void;
}

export function PhasePreviewModal({ item, onClose }: PhasePreviewModalProps) {
  if (!item) return null;

  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      title={`${item.label} (${item.phase})`}
      subtitle="Khu vực này thuộc lộ trình triển khai từng bước theo chuẩn MeowProduct"
      maxWidthClass="max-w-lg"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#D5C2F6] bg-[#E6DAFB]/55 p-4 text-sm leading-relaxed text-[#211834]">
          {item.description}
        </div>
        <p className="text-xs leading-relaxed text-[#5A5B60]">
          Hiện tại bạn đang ở Không gian học chính gồm Lộ trình kỹ năng, Bài
          học trọng tâm, UI → FE Code, 500 Bài Test và Thực hành Rubric.
        </p>
        <div className="flex justify-end">
          <Button variant="dark" onClick={onClose}>
            Quay lại Tổng quan
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface SettingsModalProps {
  open: boolean;
  snapshot: DashboardSnapshot;
  busy: boolean;
  onClose: () => void;
  onToggleGamification: (enabled: boolean) => Promise<void>;
  onResetProgress: () => Promise<void>;
}

export function SettingsModal({
  open,
  snapshot,
  busy,
  onClose,
  onToggleGamification,
  onResetProgress,
}: SettingsModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Cài đặt học tập & Dữ liệu"
      subtitle="Quản lý chế độ động lực và trạng thái dữ liệu cá nhân"
      maxWidthClass="max-w-lg"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#E3E0D7] bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#5A5B60]">
            Hồ sơ học viên
          </div>
          <div className="mt-1.5 text-sm font-bold text-[#17181C]">
            {snapshot.learner.background}
          </div>
          <div className="text-xs text-[#5A5B60]">
            Mục tiêu: {snapshot.learner.targetRole}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#E3E0D7] bg-white p-4">
          <div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#17181C]">
              <Sparkles className="h-4 w-4 text-[#5B35B5]" />
              Hiển thị XP, Cấp độ & Streak
            </div>
            <p className="mt-0.5 text-xs text-[#5A5B60]">
              Theo nguyên tắc MeowProduct, XP chỉ để tạo nhịp học và không quyết định
              năng lực kỹ năng. Bạn có thể tắt nếu muốn học tập trung hoàn toàn.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={snapshot.gamification.enabled}
            disabled={busy}
            onClick={() =>
              onToggleGamification(!snapshot.gamification.enabled)
            }
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
              snapshot.gamification.enabled ? "bg-[#17181C]" : "bg-[#D4D0C6]"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                snapshot.gamification.enabled
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="rounded-2xl border border-[#F0C6D5] bg-[#FAE0E9]/45 p-4">
          <div className="text-sm font-bold text-[#391623]">
            Đặt lại tiến độ về trạng thái học viên mới
          </div>
          <p className="mt-1 text-xs text-[#5A5B60]">
            Xóa trạng thái bài đang học, XP, streak và khôi phục danh sách việc
            hôm nay về mặc định ban đầu để kiểm thử luồng từ đầu.
          </p>
          <Button
            variant="white"
            size="sm"
            className="mt-3"
            disabled={busy}
            onClick={onResetProgress}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Đặt lại dữ liệu học tập
          </Button>
        </div>
      </div>
    </Modal>
  );
}
