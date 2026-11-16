"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { DashboardSnapshot } from "@/types/learning";

interface MiniGameLabProps {
  challenges: DashboardSnapshot["miniGames"];
  busy: boolean;
  onSubmitAttempt: (
    challengeId: string,
    selectedOptionId: string
  ) => Promise<{ isCorrect: boolean; whyItMatters: string } | null>;
}

function VisualMockupPreview({
  scenario,
  selectedId,
  onPick,
}: {
  scenario: DashboardSnapshot["miniGames"][number]["visualScenario"];
  selectedId: string | null;
  onPick: (optionId: string) => void;
}) {
  if (scenario === "hierarchy_card") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Design A: Flat hierarchy */}
        <button
          type="button"
          onClick={() => onPick("a")}
          className={`cursor-pointer rounded-2xl border-2 bg-white p-4 text-left transition-all ${
            selectedId === "a"
              ? "border-[#17181C] ring-2 ring-[#17181C]/15"
              : "border-[#E3E0D7] hover:border-[#BEB9AD]"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-[#ECEAE3] px-2 py-0.5 text-[10px] font-bold text-[#4E4F54]">
              Thiết kế A
            </span>
          </div>
          <div className="space-y-1.5 text-sm text-[#4E4F54]">
            <div>Gói Pro Team</div>
            <div>299.000đ mỗi tháng</div>
            <div>Không giới hạn dự án</div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <span className="rounded-lg border border-[#D4D0C6] py-1.5 text-center text-xs text-[#4E4F54]">
              Xem thêm
            </span>
            <span className="rounded-lg border border-[#D4D0C6] py-1.5 text-center text-xs text-[#4E4F54]">
              Chọn gói
            </span>
          </div>
        </button>

        {/* Design B: Clear hierarchy */}
        <button
          type="button"
          onClick={() => onPick("b")}
          className={`cursor-pointer rounded-2xl border-2 bg-white p-4 text-left transition-all ${
            selectedId === "b"
              ? "border-[#17181C] ring-2 ring-[#17181C]/15"
              : "border-[#E3E0D7] hover:border-[#BEB9AD]"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-[#17181C] px-2 py-0.5 text-[10px] font-bold text-white">
              Thiết kế B
            </span>
            <span className="rounded-full bg-[#E6DAFB] px-2 py-0.5 text-[10px] font-semibold text-[#4B2D8A]">
              Khuyên dùng
            </span>
          </div>
          <div className="text-xs font-semibold text-[#5A5B60]">Pro Team</div>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-[#17181C]">299k</span>
            <span className="text-xs text-[#6B6C72]">/tháng</span>
          </div>
          <div className="mt-0.5 text-[11px] text-[#5A5B60]">
            Không giới hạn dự án &amp; xuất Figma
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex-1 rounded-full bg-[#17181C] py-1.5 text-center text-xs font-semibold text-white">
              Bắt đầu dùng thử
            </span>
            <span className="px-2 text-xs font-medium text-[#5A5B60] underline">
              Chi tiết
            </span>
          </div>
        </button>
      </div>
    );
  }

  if (scenario === "mobile_touch_target") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Phone A */}
        <button
          type="button"
          onClick={() => onPick("a")}
          className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 bg-[#F7F6F2] p-3 transition-all ${
            selectedId === "a"
              ? "border-[#17181C] ring-2 ring-[#17181C]/15"
              : "border-[#E3E0D7] hover:border-[#BEB9AD]"
          }`}
        >
          <span className="mb-2 self-start rounded-full bg-[#ECEAE3] px-2 py-0.5 text-[10px] font-bold">
            Mẫu A
          </span>
          <div className="flex h-44 w-36 flex-col justify-between rounded-[20px] border-2 border-[#C9C5B9] bg-white p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#5A5B60]">
                Chi tiết
              </span>
              <span className="rounded bg-[#17181C] px-1.5 py-0.5 text-[9px] text-white">
                Mua (24px)
              </span>
            </div>
            <div className="h-16 rounded-lg bg-[#EFECE5]" />
            <div className="text-[9px] text-[#7C7D82]">
              Nút chính nằm ở góc trên khó với bằng ngón cái
            </div>
          </div>
        </button>

        {/* Phone B */}
        <button
          type="button"
          onClick={() => onPick("b")}
          className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 bg-[#F7F6F2] p-3 transition-all ${
            selectedId === "b"
              ? "border-[#17181C] ring-2 ring-[#17181C]/15"
              : "border-[#E3E0D7] hover:border-[#BEB9AD]"
          }`}
        >
          <span className="mb-2 self-start rounded-full bg-[#17181C] px-2 py-0.5 text-[10px] font-bold text-white">
            Mẫu B
          </span>
          <div className="flex h-44 w-36 flex-col justify-between rounded-[20px] border-2 border-[#C9C5B9] bg-white p-2.5">
            <div className="text-[10px] font-semibold text-[#5A5B60]">
              Chi tiết sản phẩm
            </div>
            <div className="h-14 rounded-lg bg-[#D9ECFB]" />
            <div className="space-y-1.5">
              <div className="flex h-9 items-center justify-center rounded-full bg-[#17181C] text-[10px] font-bold text-white">
                Thêm vào giỏ (48px)
              </div>
              <div className="mx-auto h-1 w-12 rounded-full bg-[#17181C]/30" />
            </div>
          </div>
        </button>
      </div>
    );
  }

  if (scenario === "wcag_contrast") {
    const previewStyle =
      selectedId === "low"
        ? "bg-white text-[#9CA3AF] border border-[#E5E7EB]"
        : selectedId === "neon"
        ? "bg-[#D9F99D] text-white"
        : "bg-[#E6DAFB] text-[#17181C] border border-[#D5C2F6]";

    return (
      <div className="space-y-3 rounded-2xl border border-[#E3E0D7] bg-white p-4">
        <div className="text-xs font-semibold text-[#5A5B60]">
          Xem trước trực tiếp độ dễ đọc (Live Preview):
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-[#F7F6F2] p-4">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${previewStyle}`}
          >
            Xác nhận thanh toán
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${previewStyle}`}
          >
            Đang xử lý đơn hàng
          </span>
        </div>
      </div>
    );
  }

  if (scenario === "spacing_proximity") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onPick("a")}
          className={`cursor-pointer rounded-2xl border-2 bg-white p-4 text-left ${
            selectedId === "a" ? "border-[#17181C]" : "border-[#E3E0D7]"
          }`}
        >
          <span className="rounded-full bg-[#ECEAE3] px-2 py-0.5 text-[10px] font-bold">
            Card A (Đều 16px)
          </span>
          <div className="mt-3 space-y-4">
            <div className="text-sm font-bold">Đã cập nhật Figma</div>
            <div className="text-xs text-[#5A5B60]">
              Minh vừa thêm 3 biến màu mới
            </div>
            <span className="inline-block rounded-full bg-[#ECEAE3] px-3 py-1 text-xs font-semibold">
              Xem thay đổi
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onPick("b")}
          className={`cursor-pointer rounded-2xl border-2 bg-white p-4 text-left ${
            selectedId === "b" ? "border-[#17181C]" : "border-[#E3E0D7]"
          }`}
        >
          <span className="rounded-full bg-[#17181C] px-2 py-0.5 text-[10px] font-bold text-white">
            Card B (Nhóm 4px + 16px)
          </span>
          <div className="mt-3">
            <div className="space-y-1">
              <div className="text-sm font-bold">Đã cập nhật Figma</div>
              <div className="text-xs text-[#5A5B60]">
                Minh vừa thêm 3 biến màu mới
              </div>
            </div>
            <span className="mt-4 inline-block rounded-full bg-[#17181C] px-3 py-1 text-xs font-semibold text-white">
              Xem thay đổi
            </span>
          </div>
        </button>
      </div>
    );
  }

  if (scenario === "form_error_state") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onPick("a")}
          className={`cursor-pointer rounded-2xl border-2 bg-white p-4 text-left ${
            selectedId === "a" ? "border-[#17181C]" : "border-[#E3E0D7]"
          }`}
        >
          <span className="rounded-full bg-[#ECEAE3] px-2 py-0.5 text-[10px] font-bold">
            Mẫu A
          </span>
          <div className="mt-3 rounded-xl border border-[#F0C6D5] bg-[#FAE0E9]/60 p-3 text-xs">
            <div className="font-bold text-[#7A2343]">Lỗi 422: Dữ liệu sai</div>
            <div className="mt-1 text-[#5A5B60]">
              Vui lòng nhập lại toàn bộ biểu mẫu.
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onPick("b")}
          className={`cursor-pointer rounded-2xl border-2 bg-white p-4 text-left ${
            selectedId === "b" ? "border-[#17181C]" : "border-[#E3E0D7]"
          }`}
        >
          <span className="rounded-full bg-[#17181C] px-2 py-0.5 text-[10px] font-bold text-white">
            Mẫu B
          </span>
          <div className="mt-3 space-y-1">
            <div className="text-[11px] font-semibold text-[#17181C]">Email</div>
            <div className="rounded-lg border-2 border-[#DC2626] bg-white px-2.5 py-1.5 text-xs text-[#17181C]">
              thao@gmai.com
            </div>
            <div className="text-[11px] font-medium text-[#DC2626]">
              Email thiếu chữ &ldquo;l&rdquo;? Thử thay bằng thao@gmail.com
            </div>
          </div>
        </button>
      </div>
    );
  }

  // funnel_friction
  return (
    <div className="rounded-2xl border border-[#E3E0D7] bg-white p-4">
      <div className="mb-2 text-xs font-semibold text-[#5A5B60]">
        Dữ liệu phễu thực tế giả lập (Funnel):
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-xl bg-[#D9ECFB] p-2.5">
          <div className="font-bold">100%</div>
          <div className="text-[11px]">Giỏ hàng</div>
        </div>
        <div className="rounded-xl border border-[#F0C6D5] bg-[#FAE0E9] p-2.5">
          <div className="font-bold text-[#9D2B52]">42% (-58%)</div>
          <div className="text-[11px]">Nhập giao hàng</div>
        </div>
        <div className="rounded-xl bg-[#D4F0DC] p-2.5">
          <div className="font-bold">31%</div>
          <div className="text-[11px]">Thanh toán</div>
        </div>
      </div>
    </div>
  );
}

export function MiniGameLab({
  challenges,
  busy,
  onSubmitAttempt,
}: MiniGameLabProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{
    challengeId: string;
    isCorrect: boolean;
    whyItMatters: string;
  } | null>(null);

  const current = challenges[activeIndex] ?? challenges[0];
  const solvedCount = challenges.filter((c) => c.completed).length;

  const handleCheck = async (optionId?: string) => {
    const pick = optionId ?? selectedOption;
    if (!pick) return;
    setSelectedOption(pick);
    const res = await onSubmitAttempt(current.id, pick);
    if (res) {
      setFeedback({
        challengeId: current.id,
        isCorrect: res.isCorrect,
        whyItMatters: res.whyItMatters,
      });
    }
  };

  const goTo = (nextIdx: number) => {
    setActiveIndex(nextIdx);
    setSelectedOption(null);
    setShowHint(false);
    setFeedback(null);
  };

  return (
    <Card tone="white" className="p-5">
      {/* Header & Mission Ladder */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEAE3] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#E6DAFB] text-[#4B2D8A]">
            <Gamepad2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-bold text-[#17181C]">
              Interactive UI Bug Hunt Studio ({solvedCount}/{challenges.length} Solved)
            </h2>
            <p className="text-xs text-[#5A5B60]">
              Soi trực tiếp 2 mẫu bên trái, chọn bản đạt chuẩn hoặc chạy kiểm
              tra bên phải như SQL Sandbox.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blue">{current.platform}</Badge>
          <Badge tone="lavender">+{current.xpReward} XP</Badge>
          <Badge tone={solvedCount === challenges.length ? "mint" : "neutral"}>
            Đã vượt qua {solvedCount}/{challenges.length} vòng
          </Badge>
        </div>
      </div>

      {/* Round Progress Ladder */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {challenges.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Vòng ${idx + 1}: ${ch.title}`}
              className={`inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-bold transition-colors ${
                idx === activeIndex
                  ? "bg-[#17181C] text-white"
                  : ch.completed
                  ? "bg-[#D4F0DC] text-[#133220]"
                  : "bg-[#ECEAE3] text-[#5A5B60] hover:bg-[#DFDCD3]"
              }`}
            >
              <span>Vòng {idx + 1}</span>
              {ch.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-semibold text-[#6B6C72]">
          {current.category}
        </span>
      </div>

      {/* SQL-style 2-Column Split Playground */}
      <div className="mt-4 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* Left: Live Visual Inspector Canvas */}
        <div className="flex min-w-0 flex-col justify-between gap-3 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-4 lg:col-span-7">
          <div>
            <div className="mb-1 text-[11px] font-extrabold uppercase tracking-wide text-[#5B35B5]">
              Bản mẫu trực quan · Bấm chọn trực tiếp trên UI
            </div>
            <h3 className="text-base font-bold text-[#17181C]">
              {current.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#4E4F54]">
              {current.prompt}
            </p>
          </div>

          <VisualMockupPreview
            scenario={current.visualScenario}
            selectedId={selectedOption}
            onPick={(optId) => {
              setSelectedOption(optId);
              if (current.type === "ab_visual") {
                void handleCheck(optId);
              }
            }}
          />
        </div>

        {/* Right: Dark Audit Console & Option Runner */}
        <div className="flex min-w-0 flex-col justify-between rounded-2xl bg-[#121316] p-4 text-white lg:col-span-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6DAFB]">
                <Sparkles className="h-3.5 w-3.5" />
                Bảng chọn &amp; Chấm chuẩn
              </span>
              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className="cursor-pointer rounded-full border border-white/15 bg-white/8 px-2.5 py-0.5 text-[11px] font-semibold text-white/85 hover:bg-white/15"
              >
                {showHint ? "Ẩn gợi ý" : "Gợi ý nhanh"}
              </button>
            </div>

            {showHint && (
              <div className="rounded-xl border border-[#FACC15]/30 bg-[#FEF9C3]/10 p-2.5 text-[11px] leading-relaxed text-[#FEF08A]">
                Gợi ý: So sánh vùng chạm tối thiểu (44px), độ tương phản chữ/nền
                (&gt;= 4.5:1) và thứ bậc thông tin quan trọng nhất trên màn hình.
              </div>
            )}

            {/* Options styled as executable cases */}
            <div className="space-y-2">
              {current.options.map((opt) => {
                const isPicked = selectedOption === opt.id;
                const isFeedbackShown =
                  feedback && feedback.challengeId === current.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={busy}
                    onClick={() => void handleCheck(opt.id)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition-all ${
                      isPicked
                        ? isFeedbackShown
                          ? feedback.isCorrect
                            ? "border-[#4ADE80] bg-[#195734]/45 text-white"
                            : "border-[#FB7185] bg-[#7A2343]/45 text-white"
                          : "border-[#E6DAFB] bg-white/15 text-white"
                        : "border-white/12 bg-white/[0.04] text-white/85 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <span className="min-w-0 flex-1 leading-snug">
                      {opt.label}
                    </span>
                    <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-[#E6DAFB]">
                      Run ✓
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Terminal Verdict */}
            {feedback && feedback.challengeId === current.id ? (
              <div
                className={`rounded-xl border p-3.5 ${
                  feedback.isCorrect
                    ? "border-[#4ADE80]/40 bg-[#195734]/45 text-[#DCFCE7]"
                    : "border-[#FB7185]/45 bg-[#7A2343]/45 text-[#FFE4E6]"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  {feedback.isCorrect ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#4ADE80]" />
                      <span>
                        PASS · Chuẩn xác (+{current.xpReward} XP &amp; ghi minh
                        chứng!)
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 shrink-0 text-[#FB7185]" />
                      <span>FAIL · Chưa tối ưu — hãy thử lại nhé</span>
                    </>
                  )}
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/90">
                  {feedback.whyItMatters}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3 text-[11px] text-[#A4A6AB]">
                Nhấn trực tiếp vào phương án bên trái hoặc chọn 1 test case phía
                trên để hệ thống chấm ngay tức thì.
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Vòng trước</span>
            </button>
            <button
              type="button"
              disabled={activeIndex === challenges.length - 1}
              onClick={() => goTo(activeIndex + 1)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-[#E6DAFB] px-3.5 py-1.5 text-xs font-bold text-[#17181C] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Vòng tiếp</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
