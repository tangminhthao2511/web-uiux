"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface DailyUiAuditHeroProps {
  onOpenSandbox: () => void;
  onOpenTestBank: () => void;
}

type MissionId = "mobile-checkout" | "contrast-alert" | "card-hierarchy";

interface AuditAssertion {
  id: string;
  label: string;
  actual: string;
  target: string;
  passed: boolean;
  hint: string;
}

export function DailyUiAuditHero({
  onOpenSandbox,
  onOpenTestBank,
}: DailyUiAuditHeroProps) {
  const [mission, setMission] = useState<MissionId>("mobile-checkout");

  // Mission 1: Mobile Checkout CTA & Spacing
  const [btnHeight, setBtnHeight] = useState<30 | 44 | 48>(30);
  const [ctaContrast, setCtaContrast] = useState<"muted" | "strong">("muted");
  const [cardGap, setCardGap] = useState<4 | 16>(4);

  // Mission 2: WCAG Contrast Status & Hint
  const [statusTone, setStatusTone] = useState<"washed" | "wcag">("washed");
  const [bodyWeight, setBodyWeight] = useState<"light" | "medium">("light");
  const [inlineHint, setInlineHint] = useState(false);

  // Mission 3: SaaS Pricing Hierarchy
  const [priceScale, setPriceScale] = useState<"flat" | "hero">("flat");
  const [primaryCta, setPrimaryCta] = useState<"duplicate" | "clear">("duplicate");
  const [groupGap, setGroupGap] = useState<"even" | "proximity">("even");

  const [hasRunAudit, setHasRunAudit] = useState(false);

  const assertions: AuditAssertion[] = useMemo(() => {
    if (mission === "mobile-checkout") {
      return [
        {
          id: "touch",
          label: "Vùng chạm nút CTA (Apple HIG)",
          actual: `${btnHeight}px`,
          target: ">= 44px",
          passed: btnHeight >= 44,
          hint: "Tăng chiều cao nút lên 44px hoặc 48px để vừa đầu ngón tay.",
        },
        {
          id: "contrast",
          label: "Độ tương phản chữ trên nút (WCAG AA)",
          actual: ctaContrast === "strong" ? "13.2:1" : "2.1:1",
          target: ">= 4.5:1",
          passed: ctaContrast === "strong",
          hint: "Đổi sang nền tối #17181C chữ trắng hoặc nền nhấn rõ.",
        },
        {
          id: "spacing",
          label: "Khoảng cách khối giá & CTA (Lưới 8pt)",
          actual: `${cardGap}px`,
          target: ">= 16px",
          passed: cardGap >= 16,
          hint: "Đặt gap tối thiểu 16px giữa thông tin tổng tiền và nút bấm.",
        },
      ];
    }

    if (mission === "contrast-alert") {
      return [
        {
          id: "badge-contrast",
          label: "Tương phản nhãn trạng thái",
          actual: statusTone === "wcag" ? "7.4:1" : "1.8:1",
          target: ">= 4.5:1",
          passed: statusTone === "wcag",
          hint: "Tránh chữ trắng trên nền pastel nhạt; dùng chữ đậm (#7A2343).",
        },
        {
          id: "readability",
          label: "Độ dày chữ thông báo lỗi",
          actual: bodyWeight === "medium" ? "Medium 500" : "Thin #A8A8B3",
          target: "Rõ nét >= 4.5:1",
          passed: bodyWeight === "medium",
          hint: "Tăng tương phản và độ đậm text mô tả lỗi.",
        },
        {
          id: "recovery",
          label: "Gợi ý sửa lỗi ngay cạnh ô nhập (Nielsen #9)",
          actual: inlineHint ? "Có gợi ý sửa" : "Chỉ báo 'Lỗi 422'",
          target: "Inline hint rõ",
          passed: inlineHint,
          hint: "Bật gợi ý sửa cụ thể ngay dưới ô Email bị sai.",
        },
      ];
    }

    return [
      {
        id: "scale",
        label: "Tỷ lệ cỡ chữ Giá / Mô tả (Scale)",
        actual: priceScale === "hero" ? "24px / 12px (2.0x)" : "13px / 12px",
        target: ">= 1.6x",
        passed: priceScale === "hero",
        hint: "Phóng lớn mức giá 24px đậm để mắt quét trong 0.5s.",
      },
      {
        id: "cta-weight",
        label: "Phân cấp CTA Chính vs Phụ",
        actual: primaryCta === "clear" ? "1 Primary + 1 Ghost" : "2 nút y hệt",
        target: "1 Primary duy nhất",
        passed: primaryCta === "clear",
        hint: "Chỉ giữ 1 nút đặc nổi bật cho gói khuyên dùng.",
      },
      {
        id: "proximity",
        label: "Luật Gần (Law of Proximity)",
        actual: groupGap === "proximity" ? "6px trong / 16px ngoài" : "Đều 8px",
        target: "Tách nhóm rõ",
        passed: groupGap === "proximity",
        hint: "Nhóm tiêu đề + giá sát nhau, tách xa phần danh sách quyền lợi.",
      },
    ];
  }, [
    mission,
    btnHeight,
    ctaContrast,
    cardGap,
    statusTone,
    bodyWeight,
    inlineHint,
    priceScale,
    primaryCta,
    groupGap,
  ]);

  const passedCount = assertions.filter((a) => a.passed).length;
  const allPassed = passedCount === assertions.length;

  const handleReset = () => {
    setHasRunAudit(false);
    if (mission === "mobile-checkout") {
      setBtnHeight(30);
      setCtaContrast("muted");
      setCardGap(4);
    } else if (mission === "contrast-alert") {
      setStatusTone("washed");
      setBodyWeight("light");
      setInlineHint(false);
    } else {
      setPriceScale("flat");
      setPrimaryCta("duplicate");
      setGroupGap("even");
    }
  };

  const handleSwitchMission = (next: MissionId) => {
    setMission(next);
    setHasRunAudit(false);
  };

  return (
    <Card tone="white" className="overflow-hidden border-[#DDD8CC] p-4 sm:p-5">
      {/* SQL-style Challenge Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#ECEAE3] pb-3.5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="dark">
              <Terminal className="h-3 w-3" />
              UI Interactive Playground
            </Badge>
            <Badge tone={allPassed && hasRunAudit ? "mint" : "yellow"}>
              {hasRunAudit
                ? allPassed
                  ? "PASSED 3/3 · Đạt chuẩn Junior!"
                  : `Đạt ${passedCount}/3 tiêu chí`
                : "Thử thách 60s · Sửa lỗi trực tiếp"}
            </Badge>
          </div>
          <h2 className="mt-1.5 text-base font-extrabold tracking-tight text-[#17181C] sm:text-lg">
            Chỉnh thông số UI bên trái &amp; bấm &ldquo;Chạy Audit&rdquo; như
            viết Query thực chiến
          </h2>
        </div>

        {/* 3 Quick Mission Switchers */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-[#E3E0D7] bg-[#F4F2EC] p-1">
          {(
            [
              { id: "mobile-checkout", label: "1. Mobile CTA" },
              { id: "contrast-alert", label: "2. WCAG & Lỗi" },
              { id: "card-hierarchy", label: "3. SaaS Hierarchy" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSwitchMission(tab.id)}
              className={`cursor-pointer rounded-xl px-2.5 py-1.5 text-xs font-bold transition-colors ${
                mission === tab.id
                  ? "bg-[#17181C] text-white"
                  : "text-[#5A5B60] hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split Workspace: Live UI Preview + Controls (Left) <-> Assertion Runner (Right) */}
      <div className="mt-4 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* Left: Live Component Canvas + Instant Spec Tweakers */}
        <div className="flex min-w-0 flex-col justify-between gap-3.5 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-4 lg:col-span-7">
          {/* Interactive Controls */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wide text-[#5A5B60]">
              <span>Bảng chỉnh UI Spec (Figma Properties)</span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-[#5A5B60] hover:text-[#17181C]"
              >
                <RotateCcw className="h-3 w-3" />
                Reset lỗi
              </button>
            </div>

            {mission === "mobile-checkout" && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Chiều cao nút
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    {([30, 44, 48] as const).map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setBtnHeight(h)}
                        className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold transition-colors ${
                          btnHeight === h
                            ? "bg-[#17181C] text-white"
                            : "bg-[#F3F1EB] text-[#4E4F54]"
                        }`}
                      >
                        {h}px
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Màu tương phản
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setCtaContrast("muted")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        ctaContrast === "muted"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Xám mờ
                    </button>
                    <button
                      type="button"
                      onClick={() => setCtaContrast("strong")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        ctaContrast === "strong"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Đậm AA
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Khoảng cách 8pt
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    {([4, 16] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setCardGap(g)}
                        className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                          cardGap === g
                            ? "bg-[#17181C] text-white"
                            : "bg-[#F3F1EB] text-[#4E4F54]"
                        }`}
                      >
                        {g}px
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mission === "contrast-alert" && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Tương phản Badge
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setStatusTone("washed")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        statusTone === "washed"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Nhạt 1.8:1
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusTone("wcag")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        statusTone === "wcag"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Chuẩn 7.4:1
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Độ rõ chữ lỗi
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setBodyWeight("light")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        bodyWeight === "light"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Xám nhạt
                    </button>
                    <button
                      type="button"
                      onClick={() => setBodyWeight("medium")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        bodyWeight === "medium"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Rõ nét
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Gợi ý sửa Inline
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setInlineHint(false)}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        !inlineHint
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Ẩn gợi ý
                    </button>
                    <button
                      type="button"
                      onClick={() => setInlineHint(true)}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        inlineHint
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Hiện gợi ý
                    </button>
                  </div>
                </div>
              </div>
            )}

            {mission === "card-hierarchy" && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Cỡ chữ Giá
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setPriceScale("flat")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        priceScale === "flat"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Đều 13px
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriceScale("hero")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        priceScale === "hero"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Hero 24px
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Phân cấp CTA
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setPrimaryCta("duplicate")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        primaryCta === "duplicate"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Giống nhau
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrimaryCta("clear")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        primaryCta === "clear"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      1 Chính
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[#E3E0D7] bg-white p-2.5">
                  <div className="text-[11px] font-bold text-[#17181C]">
                    Luật Gần (8pt)
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setGroupGap("even")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        groupGap === "even"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Dàn đều
                    </button>
                    <button
                      type="button"
                      onClick={() => setGroupGap("proximity")}
                      className={`flex-1 cursor-pointer rounded-lg py-1 text-[11px] font-bold ${
                        groupGap === "proximity"
                          ? "bg-[#17181C] text-white"
                          : "bg-[#F3F1EB] text-[#4E4F54]"
                      }`}
                    >
                      Theo nhóm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Render Stage */}
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#D6D2C7] bg-white p-4">
            {mission === "mobile-checkout" && (
              <div
                style={{ gap: `${cardGap}px` }}
                className="flex w-full max-w-[300px] flex-col rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-3.5 shadow-xs transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#5A5B60]">
                    Tổng thanh toán (2 món)
                  </span>
                  <span className="text-base font-extrabold text-[#17181C]">
                    390.000₫
                  </span>
                </div>
                <button
                  type="button"
                  style={{ height: `${btnHeight}px` }}
                  className={`flex w-full items-center justify-center rounded-xl text-xs font-bold transition-all ${
                    ctaContrast === "strong"
                      ? "bg-[#17181C] text-white shadow-xs"
                      : "bg-[#E2E4E8] text-[#9BA0AA]"
                  }`}
                >
                  Thanh toán ngay · {btnHeight}px
                </button>
              </div>
            )}

            {mission === "contrast-alert" && (
              <div className="w-full max-w-[320px] space-y-2 rounded-2xl border border-[#E3E0D7] bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#17181C]">
                    Email nhận hóa đơn
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors ${
                      statusTone === "wcag"
                        ? "bg-[#FAE0E9] text-[#7A2343]"
                        : "bg-[#FCECF2] text-[#FFFFFF]"
                    }`}
                  >
                    Cần kiểm tra
                  </span>
                </div>
                <div className="rounded-xl border-2 border-[#DC2626] bg-[#FFF8F8] px-3 py-2 text-xs text-[#17181C]">
                  thao@gmai.com
                </div>
                <div
                  className={`text-[11px] transition-colors ${
                    bodyWeight === "medium"
                      ? "font-semibold text-[#B91C1C]"
                      : "font-normal text-[#C2C4CB]"
                  }`}
                >
                  {inlineHint
                    ? "Thiếu chữ 'l' trong '@gmail.com' — đổi thành thao@gmail.com?"
                    : "Lỗi hệ thống #422. Vui lòng thử lại."}
                </div>
              </div>
            )}

            {mission === "card-hierarchy" && (
              <div className="w-full max-w-[300px] rounded-2xl border border-[#D5C2F6] bg-[#F8F5FF] p-4 shadow-xs">
                <div
                  className={
                    groupGap === "proximity" ? "space-y-1" : "space-y-2.5"
                  }
                >
                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#5B35B5]">
                    Gói Pro Team
                  </div>
                  <div
                    className={`transition-all ${
                      priceScale === "hero"
                        ? "text-2xl font-extrabold tracking-tight text-[#17181C]"
                        : "text-[13px] font-medium text-[#4E4F54]"
                    }`}
                  >
                    299.000₫/tháng
                  </div>
                </div>

                <div
                  className={`text-xs text-[#5A5B60] ${
                    groupGap === "proximity" ? "mt-4" : "mt-2.5"
                  }`}
                >
                  • Unlimited Figma Hand-off &amp; Tokens
                </div>

                <div className="mt-3 flex gap-2">
                  <span className="flex-1 rounded-xl bg-[#17181C] py-2 text-center text-xs font-bold text-white">
                    Nâng cấp ngay
                  </span>
                  <span
                    className={`flex-1 rounded-xl py-2 text-center text-xs font-bold transition-all ${
                      primaryCta === "clear"
                        ? "border border-[#D5C2F6] bg-white text-[#4B2D8A]"
                        : "bg-[#17181C] text-white"
                    }`}
                  >
                    Xem thêm
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: SQL-style Assertion Test Runner */}
        <div className="flex min-w-0 flex-col justify-between rounded-2xl bg-[#121316] p-4 text-white lg:col-span-5">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6DAFB]">
                <Sparkles className="h-3.5 w-3.5" />
                Expected UI Audit Results
              </span>
              <span className="font-mono text-[11px] text-[#A4A6AB]">
                {passedCount}/{assertions.length} passed
              </span>
            </div>

            <ul className="mt-3 space-y-2">
              {assertions.map((item) => {
                const showPass = hasRunAudit ? item.passed : null;
                return (
                  <li
                    key={item.id}
                    className={`rounded-xl border p-2.5 text-xs transition-colors ${
                      showPass === null
                        ? "border-white/10 bg-white/[0.04]"
                        : showPass
                        ? "border-[#4ADE80]/35 bg-[#195734]/35"
                        : "border-[#FB7185]/40 bg-[#7A2343]/35"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex items-center gap-1.5 font-semibold text-white">
                        {showPass === null ? (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-white/40" />
                        ) : showPass ? (
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#4ADE80]" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 shrink-0 text-[#FB7185]" />
                        )}
                        <span>{item.label}</span>
                      </span>
                      <code className="shrink-0 rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-[#E6DAFB]">
                        {item.actual} / {item.target}
                      </code>
                    </div>
                    {showPass === false && (
                      <p className="mt-1 pl-5 text-[11px] text-[#FBCFE8]">
                        Gợi ý: {item.hint}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
            <Button
              type="button"
              variant="pastel"
              className="w-full justify-center font-bold"
              onClick={() => setHasRunAudit(true)}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              {hasRunAudit ? "Chạy lại Audit (Run Check)" : "Chạy Audit (Run Check)"}
            </Button>

            <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px]">
              <button
                type="button"
                onClick={onOpenSandbox}
                className="inline-flex cursor-pointer items-center gap-1 font-semibold text-white/80 hover:text-white"
              >
                <span>Mở toàn bộ Mini-Game</span>
                <ArrowRight className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={onOpenTestBank}
                className="inline-flex cursor-pointer items-center gap-1 font-semibold text-[#A5F3FC] hover:text-white"
              >
                <span>Vào 500 Bài Test</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
