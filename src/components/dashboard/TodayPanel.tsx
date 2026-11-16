"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronsLeft,
  ChevronsRight,
  ClipboardCheck,
  Flame,
  HelpCircle,
  Layers,
  MessageSquareText,
  PenTool,
  Plus,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/StateView";
import type {
  DashboardSnapshot,
  LearningTask,
  TaskCategory,
} from "@/types/learning";

interface TodayPanelProps {
  snapshot: DashboardSnapshot;
  busyAction: string | null;
  collapsed?: boolean;
  onClosePanel: () => void;
  onOpenPanel?: () => void;
  onContinueLearning: () => void;
  onToggleTask: (taskId: string) => Promise<void>;
  onAddTask: (input: {
    title: string;
    category: TaskCategory;
    description?: string;
  }) => Promise<void>;
  onClearCompletedTasks: () => Promise<void>;
}

function formatVietnameseTodayBadge(): string {
  const now = new Date();
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${weekdays[now.getDay()]}, ${day}.${month}`;
}

const CATEGORY_META: Record<
  TaskCategory,
  { label: string; icon: typeof BookOpen }
> = {
  lesson: { label: "Bài học", icon: BookOpen },
  exercise: { label: "Bài tập", icon: PenTool },
  review: { label: "Phản hồi", icon: MessageSquareText },
  quiz: { label: "Quiz", icon: HelpCircle },
  planning: { label: "Kế hoạch", icon: ClipboardCheck },
};

export function TodayPanel({
  snapshot,
  busyAction,
  collapsed = false,
  onClosePanel,
  onOpenPanel,
  onContinueLearning,
  onToggleTask,
  onAddTask,
  onClearCompletedTasks,
}: TodayPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<TaskCategory>("lesson");
  const [formError, setFormError] = useState<string | null>(null);

  const { continueLearning, todayTasks, pendingReviewsCount } = snapshot;
  const lesson = continueLearning.lesson;
  const pendingTasks = todayTasks.filter((t) => !t.isCompleted);
  const completedTasks = todayTasks.filter((t) => t.isCompleted);

  const handleSubmitNewTask = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = newTitle.trim();
    if (trimmed.length < 3) {
      setFormError("Vui lòng nhập tên nhiệm vụ ít nhất 3 ký tự.");
      return;
    }
    setFormError(null);
    await onAddTask({ title: trimmed, category: newCategory });
    setNewTitle("");
    setShowAddForm(false);
  };

  return (
    <aside
      aria-label={
        collapsed ? "Thanh thu gọn Hôm nay" : "Nhiệm vụ và gợi ý học hôm nay"
      }
      className={`border border-[#E3E0D7] bg-[#EFECE5] shadow-[0_4px_16px_rgba(18,19,22,0.04)] transition-[padding,border-radius] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        collapsed ? "rounded-[28px] p-2" : "rounded-[26px] p-4 sm:p-5"
      }`}
    >
      {/* Top Header Row — Always overflow-visible so tooltips never clip */}
      <div
        className={`flex items-center transition-all duration-200 ${
          collapsed ? "justify-center" : "mb-4 flex-wrap justify-between gap-2"
        }`}
      >
        {!collapsed && (
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-[#17181C]">
              Hôm nay
            </h2>
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white text-[#17181C] shadow-xs">
              <CalendarDays className="h-4 w-4" />
            </span>
          </div>
        )}

        <div className="flex shrink-0 items-center gap-1.5">
          {!collapsed && (
            <span className="whitespace-nowrap rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-[#4E4F54]">
              {formatVietnameseTodayBadge()}
            </span>
          )}

          <div className="group relative">
            <button
              type="button"
              onClick={collapsed ? onOpenPanel : onClosePanel}
              aria-label={
                collapsed ? "Mở bảng Hôm nay (<<)" : "Thu gọn bảng Hôm nay (>>)"
              }
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#17181C] text-white shadow-xs transition-colors hover:bg-[#2A2C33]"
            >
              {collapsed ? (
                <ChevronsLeft className="h-4 w-4" />
              ) : (
                <ChevronsRight className="h-4 w-4" />
              )}
            </button>

            {collapsed ? (
              <div
                role="tooltip"
                className="pointer-events-none invisible absolute right-full top-0 z-40 mr-3 w-60 rounded-2xl bg-[#121316] px-3.5 py-2.5 text-left text-white opacity-0 shadow-[0_12px_30px_rgba(18,19,22,0.28)] transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-1.5 top-3.5 h-3 w-3 rotate-45 bg-[#121316]"
                />
                <div className="text-xs font-bold text-white">
                  Mở bảng Hôm nay (&lt;&lt;)
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-white/75">
                  Mở lại nhiệm vụ ngày, bài đang học và chuỗi ngày học
                </p>
              </div>
            ) : (
              <div
                role="tooltip"
                className="pointer-events-none invisible absolute right-0 top-full z-40 mt-2.5 w-60 rounded-2xl bg-[#121316] px-3.5 py-2.5 text-left text-white opacity-0 shadow-[0_12px_30px_rgba(18,19,22,0.28)] transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 right-3 h-3 w-3 rotate-45 bg-[#121316]"
                />
                <div className="text-xs font-bold text-white">
                  Thu gọn bảng Hôm nay (&gt;&gt;)
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-white/75">
                  Đóng sang phải để mở rộng không gian học
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapsed Mini Pills (smooth reveal without jumping) */}
      <div
        aria-hidden={!collapsed}
        className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          collapsed
            ? "mt-2.5 max-h-40 opacity-100"
            : "pointer-events-none mt-0 max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2.5">
          <button
            type="button"
            tabIndex={collapsed ? 0 : -1}
            onClick={onOpenPanel}
            title={`${pendingTasks.length} nhiệm vụ cần làm hôm nay — nhấn để mở`}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-[#C5E2FA] bg-[#D9ECFB] py-2.5 text-[#1A4E7A] transition-colors hover:border-[#8BC4F2]"
          >
            <Layers className="h-4 w-4 shrink-0" />
            <span className="text-xs font-extrabold">{pendingTasks.length}</span>
          </button>

          <button
            type="button"
            tabIndex={collapsed ? 0 : -1}
            onClick={onOpenPanel}
            title={`Chuỗi ${snapshot.gamification.streakDays} ngày học — nhấn để mở`}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-[#EADCA8] bg-[#FAF0CA] py-2.5 text-[#6B5310] transition-colors hover:border-[#D4BE6E]"
          >
            <Flame className="h-4 w-4 shrink-0" />
            <span className="text-xs font-extrabold">
              {snapshot.gamification.streakDays}d
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Cards Body — Fixed inner width during collapse so text never squishes vertically */}
      <div
        aria-hidden={collapsed}
        className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          collapsed
            ? "pointer-events-none max-h-0 translate-x-3 opacity-0"
            : "max-h-[1200px] translate-x-0 opacity-100 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-0.5"
        }`}
      >
        <div className="space-y-3.5 lg:w-[262px] xl:w-[298px]">
        {/* Card 1 (Light Blue): Reviews & Mentor Feedback */}
        <Card tone="blue" className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex min-w-0 items-center gap-2">
              <MessageSquareText className="h-4 w-4 shrink-0 text-[#1A4E7A]" />
              <span className="text-sm font-bold">Phản hồi cần xem</span>
            </div>
            <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-[#244969]">
              {pendingReviewsCount} bài chờ xử lý
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[#244969]">
            {pendingReviewsCount > 0
              ? `Bạn có ${pendingReviewsCount} nhận xét từ AI Design Mentor cần xem lại và chỉnh sửa.`
              : "Nhận xét từ AI Design Mentor và bài cần chỉnh sửa sẽ xuất hiện tại đây sau khi bạn nộp bài ở Practice Lab."}
          </p>
        </Card>

        {/* Card 2 (Soft Lavender): Continue Learning */}
        <Card tone="lavender" className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex min-w-0 items-center gap-2">
              <BookOpen className="h-4 w-4 shrink-0 text-[#4B2D8A]" />
              <span className="text-sm font-bold">Tiếp tục học</span>
            </div>
            {lesson && (
              <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-[#4B2D8A]">
                {lesson.milestonesCompleted}/{lesson.totalMilestones} tiêu chí
              </span>
            )}
          </div>

          {lesson ? (
            <div className="mt-2.5 space-y-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#4B2D8A]">
                  Chặng {continueLearning.stageOrder} ·{" "}
                  {lesson.status === "in_progress" ? "Đang học dở" : "Đề xuất"}
                </div>
                <h3 className="mt-0.5 text-sm font-bold leading-snug text-[#1E1530]">
                  {lesson.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#3B2E58]">
                  {continueLearning.reason}
                </p>
              </div>

              <Button
                variant="white"
                className="w-full justify-between"
                onClick={onContinueLearning}
                disabled={busyAction === "start_lesson"}
              >
                <span>
                  {lesson.status === "in_progress"
                    ? "Tiếp tục bài học"
                    : "Bắt đầu bài học"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <p className="mt-2 text-xs text-[#3B2E58]">
              Bạn đã hoàn thành toàn bộ bài học hiện có trong lộ trình.
            </p>
          )}
        </Card>

        {/* Card 3 (Pale Yellow / Neutral): Today's Tasks Checklist */}
        <Card tone="white" className="p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-[#6B5310]" />
              <span className="text-sm font-bold text-[#17181C]">
                Việc cần làm hôm nay
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <Badge tone="yellow" className="shrink-0 whitespace-nowrap">
                {pendingTasks.length} còn lại
              </Badge>
              <button
                type="button"
                onClick={() => setShowAddForm((prev) => !prev)}
                aria-label="Thêm nhiệm vụ học tập"
                title="Thêm nhiệm vụ học tập"
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#DFDCD3] bg-[#FAF9F6] text-[#17181C] hover:bg-[#ECEAE3]"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {showAddForm && (
            <form
              onSubmit={handleSubmitNewTask}
              className="mb-3 space-y-2 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-3"
            >
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="VD: Ôn lại khái niệm User Flow 20 phút..."
                aria-label="Tên nhiệm vụ mới"
                className="w-full rounded-xl border border-[#DCD9D0] bg-white px-3 py-2 text-xs text-[#17181C] placeholder:text-[#8E8F94] focus:border-[#17181C] focus:outline-none"
              />
              <div className="flex items-center justify-between gap-2">
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as TaskCategory)
                  }
                  aria-label="Loại nhiệm vụ"
                  className="rounded-xl border border-[#DCD9D0] bg-white px-2.5 py-1.5 text-xs text-[#17181C]"
                >
                  <option value="lesson">Bài học</option>
                  <option value="exercise">Bài tập</option>
                  <option value="quiz">Quiz</option>
                  <option value="review">Phản hồi</option>
                  <option value="planning">Kế hoạch</option>
                </select>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAddForm(false);
                      setFormError(null);
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="dark"
                    size="sm"
                    disabled={busyAction === "add_task"}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
              {formError && (
                <p className="text-[11px] font-medium text-[#B91C1C]">
                  {formError}
                </p>
              )}
            </form>
          )}

          {todayTasks.length === 0 ? (
            <EmptyState
              title="Không có nhiệm vụ nào cho hôm nay"
              description="Bạn có thể bấm nút + ở trên để tự đặt một mục tiêu học nhỏ, hoặc mở một bài học từ lộ trình."
              variant="neutral"
            />
          ) : pendingTasks.length === 0 ? (
            <div className="space-y-2.5">
              <EmptyState
                title="Bạn đã xong hết nhiệm vụ hôm nay!"
                description="Mọi đầu việc hôm nay đều đã được ghi nhận vào tiến độ thực tế."
                variant="success"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClearCompletedTasks}
                  className="cursor-pointer text-[11px] font-medium text-[#5A5B60] underline-offset-2 hover:text-[#17181C] hover:underline"
                >
                  Dọn danh sách đã xong
                </button>
              </div>
            </div>
          ) : null}

          {todayTasks.length > 0 && (
            <ul className="mt-2 space-y-2">
              {todayTasks.map((task: LearningTask) => {
                const meta = CATEGORY_META[task.category];
                const Icon = meta.icon;
                const isBusy = busyAction === `toggle_${task.id}`;

                return (
                  <li
                    key={task.id}
                    className={`rounded-2xl border p-3 transition-colors ${
                      task.isCompleted
                        ? "border-[#E8E5DC] bg-[#F8F7F4] opacity-70"
                        : "border-[#E3E0D7] bg-[#FAF9F6] hover:border-[#C9C4B8]"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={task.isCompleted}
                        aria-label={`Đánh dấu ${task.title}`}
                        disabled={isBusy}
                        onClick={() => onToggleTask(task.id)}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors ${
                          task.isCompleted
                            ? "border-[#195734] bg-[#D4F0DC] text-[#195734]"
                            : "border-[#BEB9AD] bg-white hover:border-[#17181C]"
                        }`}
                      >
                        {task.isCompleted && <Check className="h-3.5 w-3.5" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#5A5B60]">
                            <Icon className="h-3 w-3" />
                            {meta.label}
                          </span>
                          {snapshot.gamification.enabled && (
                            <span className="text-[10px] font-semibold text-[#6B5310]">
                              +{task.xpReward} XP
                            </span>
                          )}
                        </div>
                        <p
                          className={`mt-0.5 text-xs font-semibold leading-snug ${
                            task.isCompleted
                              ? "text-[#6B6C72] line-through"
                              : "text-[#17181C]"
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B6C72]">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {completedTasks.length > 0 && pendingTasks.length > 0 && (
            <div className="mt-3 flex items-center justify-between border-t border-[#ECEAE3] pt-2.5 text-[11px] text-[#6B6C72]">
              <span>Đã xong {completedTasks.length}/{todayTasks.length} việc</span>
              <button
                type="button"
                onClick={onClearCompletedTasks}
                className="cursor-pointer font-medium hover:text-[#17181C]"
              >
                Ẩn việc đã xong
              </button>
            </div>
          )}
        </Card>
        </div>
      </div>
    </aside>
  );
}
