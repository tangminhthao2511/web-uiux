"use client";

import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Figma,
  Monitor,
  Smartphone,
  Sparkles,
  XCircle,
} from "lucide-react";
import { UI_TO_FE_MODULES } from "@/lib/curriculum/ui-to-fe-modules";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { UiToFeModuleId } from "@/types/learning";

interface UiToFeLabProps {
  completedModuleIds: string[];
  busy: boolean;
  onSubmitChallenge: (
    moduleId: string,
    selectedOptionId: string
  ) => Promise<{
    isCorrect: boolean;
    explanation: string;
    xpAwarded: number;
  } | null>;
}

type CodeLanguage = "tailwind" | "css";

export function UiToFeLab({
  completedModuleIds,
  busy,
  onSubmitChallenge,
}: UiToFeLabProps) {
  const [activeId, setActiveId] = useState<UiToFeModuleId>("auto-layout-flex");
  const [codeLang, setCodeLang] = useState<CodeLanguage>("tailwind");
  const [copied, setCopied] = useState(false);

  // Playground 1: Auto Layout -> Flex
  const [flexDir, setFlexDir] = useState<"row" | "col">("row");
  const [flexGap, setFlexGap] = useState<8 | 16 | 24>(16);
  const [ctaSizing, setCtaSizing] = useState<"fill" | "hug">("fill");

  // Playground 2: Tokens
  const [tokenTheme, setTokenTheme] = useState<"paper" | "ink" | "lavender">(
    "paper"
  );
  const [tokenRadius, setTokenRadius] = useState<8 | 16 | 24>(16);

  // Playground 3: Responsive & Touch
  const [viewportMode, setViewportMode] = useState<"mobile" | "desktop">(
    "mobile"
  );
  const [touchMode, setTouchMode] = useState<"safe44" | "unsafe24">("safe44");

  // Playground 4: States & A11y
  const [uiState, setUiState] = useState<
    "default" | "hover" | "focus" | "error" | "disabled"
  >("focus");

  // Challenge state per module
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [challengeFeedback, setChallengeFeedback] = useState<
    Record<
      string,
      { isCorrect: boolean; explanation: string; xpAwarded: number }
    >
  >({});

  const activeModule =
    UI_TO_FE_MODULES.find((m) => m.id === activeId) ?? UI_TO_FE_MODULES[0];
  const isCompleted = completedModuleIds.includes(activeModule.id);

  // Dynamic code generator strictly matching the live preview settings
  const getGeneratedCode = (): string => {
    if (activeId === "auto-layout-flex") {
      const gapTw = flexGap === 8 ? "gap-2" : flexGap === 16 ? "gap-4" : "gap-6";
      const dirTw = flexDir === "row" ? "flex-row" : "flex-col";
      const btnTw = ctaSizing === "fill" ? "flex-1 w-full" : "w-fit px-5";
      if (codeLang === "tailwind") {
        return `<div className="flex ${dirTw} ${gapTw} rounded-2xl border p-4">\n  <input\n    type="text"\n    placeholder="Tìm Figma component..."\n    className="min-w-0 flex-1 rounded-xl border px-3 py-2"\n  />\n  <button className="${btnTw} rounded-xl bg-[#17181C] py-2 text-white">\n    Áp dụng\n  </button>\n</div>`;
      }
      return `.toolbar {\n  display: flex;\n  flex-direction: ${flexDir === "row" ? "row" : "column"};\n  gap: ${flexGap}px;\n  padding: 16px;\n  border-radius: 16px;\n}\n.toolbar-input {\n  flex: 1;\n  min-width: 0;\n}\n.toolbar-btn {\n  ${ctaSizing === "fill" ? "flex: 1;\n  width: 100%;" : "width: fit-content;\n  padding-inline: 20px;"}\n}`;
    }

    if (activeId === "tokens-variables") {
      const palette =
        tokenTheme === "paper"
          ? { bg: "#FFFFFF", text: "#17181C", accent: "#17181C", border: "#E3E0D7" }
          : tokenTheme === "ink"
          ? { bg: "#17181C", text: "#F7F6F2", accent: "#E6DAFB", border: "#2E3039" }
          : { bg: "#F4EEFF", text: "#211834", accent: "#5B35B5", border: "#D5C2F6" };

      if (codeLang === "tailwind") {
        return `<article\n  style={{\n    "--surface-card": "${palette.bg}",\n    "--text-primary": "${palette.text}",\n    "--accent-brand": "${palette.accent}",\n    "--radius-card": "${tokenRadius}px",\n  }}\n  className="rounded-[var(--radius-card)] border border-[${palette.border}] bg-[var(--surface-card)] p-5 text-[var(--text-primary)]"\n>\n  <h3>Design Token Card</h3>\n  <button className="mt-3 rounded-[calc(var(--radius-card)-6px)] bg-[var(--accent-brand)] px-4 py-2">\n    Publish Token\n  </button>\n</article>`;
      }
      return `:root {\n  --surface-card: ${palette.bg};\n  --text-primary: ${palette.text};\n  --accent-brand: ${palette.accent};\n  --radius-card: ${tokenRadius}px;\n}\n.token-card {\n  background: var(--surface-card);\n  color: var(--text-primary);\n  border-radius: var(--radius-card);\n}`;
    }

    if (activeId === "responsive-touch") {
      const minH = touchMode === "safe44" ? "min-h-[44px]" : "min-h-[24px]";
      if (codeLang === "tailwind") {
        return `<section className="grid ${
          viewportMode === "mobile" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        } gap-3">\n  <div className="rounded-2xl border p-4">\n    <h4 className="text-[clamp(1rem,1.5vw,1.25rem)] font-bold">Card A</h4>\n    <button className="mt-3 ${minH} w-full rounded-xl bg-[#17181C] px-4 text-white">\n      ${touchMode === "safe44" ? "Vùng chạm ≥ 44px (Chuẩn HIG)" : "Quá nhỏ (24px dễ bấm hụt)"}\n    </button>\n  </div>\n</section>`;
      }
      return `.grid-cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n@media (min-width: 768px) {\n  .grid-cards { grid-template-columns: repeat(2, 1fr); }\n}\n.action-btn {\n  min-height: ${touchMode === "safe44" ? "44px" : "24px"};\n  min-width: 44px;\n}`;
    }

    // states-a11y
    const isError = uiState === "error";
    const isDisabled = uiState === "disabled";
    if (codeLang === "tailwind") {
      return `<div>\n  <label htmlFor="email-input" className="text-xs font-semibold">\n    Email nhận tài liệu\n  </label>\n  <input\n    id="email-input"\n    type="email"\n    disabled={${isDisabled}}\n    aria-invalid={${isError}}\n    aria-describedby={${isError} ? "email-error" : undefined}\n    className="mt-1.5 w-full rounded-xl border px-3 py-2.5 focus-visible:outline-2 focus-visible:outline-[#6D4AFF] disabled:opacity-50"\n  />\n  ${
        isError
          ? `<p id="email-error" role="alert" className="mt-1 text-xs text-[#B42318]">\n    Email thiếu ký tự @ — vui lòng kiểm tra lại.\n  </p>`
          : `{/* State hiện tại: ${uiState} */}`
      }\n</div>`;
    }
    return `input[aria-invalid="true"] {\n  border-color: #D92D20;\n  background-color: #FEF3F2;\n}\ninput:focus-visible {\n  outline: 2px solid #6D4AFF;\n  outline-offset: 2px;\n}\ninput:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}`;
  };

  const generatedCode = getGeneratedCode();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const selectedOption = selectedOptions[activeModule.id];
  const feedback = challengeFeedback[activeModule.id];

  return (
    <div className="space-y-5">
      {/* Header + 4 Module Pills */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="lavender">
                <Code2 className="h-3.5 w-3.5" />
                UI → FE Code Studio
              </Badge>
              <Badge tone="mint">
                {completedModuleIds.length}/{UI_TO_FE_MODULES.length} bài thực
                hành đã xong
              </Badge>
            </div>
            <h2 className="mt-2 text-lg font-bold tracking-tight text-[#17181C] sm:text-xl">
              Học chuyển giao thiết kế Figma sang Frontend Code
            </h2>
            <p className="mt-1 text-xs text-[#5A5B60]">
              Chọn 1 chủ đề bên dưới, chỉnh thông số Figma bên trái và quan sát
              HTML/CSS/Tailwind đổi ngay theo thời gian thực.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {UI_TO_FE_MODULES.map((mod) => {
            const active = mod.id === activeId;
            const done = completedModuleIds.includes(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveId(mod.id)}
                className={`flex cursor-pointer flex-col items-start justify-between rounded-2xl border p-3 text-left transition-all ${
                  active
                    ? "border-[#17181C] bg-[#17181C] text-white shadow-xs"
                    : "border-[#E3E0D7] bg-[#FAF9F5] text-[#17181C] hover:border-[#BEB9AD] hover:bg-white"
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-bold ${
                      active ? "text-[#E6DAFB]" : "text-[#6B6C72]"
                    }`}
                  >
                    Bài {mod.order}
                  </span>
                  {done && (
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${
                        active ? "text-[#9AE6B4]" : "text-[#195734]"
                      }`}
                    />
                  )}
                </div>
                <span className="mt-1 text-xs font-bold leading-snug">
                  {mod.title}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Main Interactive Split Lab */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Left: Interactive Visual Spec & Preview */}
        <Card className="min-w-0 p-5 xl:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge tone="blue">
              <Figma className="h-3 w-3" />
              {activeModule.figmaConcept}
            </Badge>
            {isCompleted && <Badge tone="mint">Đã hoàn thành +15 XP</Badge>}
          </div>

          <p className="mt-2 text-xs text-[#5A5B60]">{activeModule.subtitle}</p>

          {/* Controls & Live Render by Module */}
          <div className="mt-4 space-y-4 rounded-2xl border border-[#E3E0D7] bg-[#F7F6F2] p-4">
            {activeId === "auto-layout-flex" && (
              <>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full border border-[#DFDBD1] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setFlexDir("row")}
                      className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        flexDir === "row"
                          ? "bg-[#17181C] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      Horizontal (Row)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlexDir("col")}
                      className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        flexDir === "col"
                          ? "bg-[#17181C] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      Vertical (Col)
                    </button>
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-[#DFDBD1] bg-white p-1">
                    {([8, 16, 24] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFlexGap(g)}
                        className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          flexGap === g
                            ? "bg-[#17181C] text-white"
                            : "text-[#5A5B60]"
                        }`}
                      >
                        Gap {g}px
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-[#DFDBD1] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setCtaSizing("fill")}
                      className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        ctaSizing === "fill"
                          ? "bg-[#17181C] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      Button: Fill
                    </button>
                    <button
                      type="button"
                      onClick={() => setCtaSizing("hug")}
                      className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        ctaSizing === "hug"
                          ? "bg-[#17181C] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      Button: Hug
                    </button>
                  </div>
                </div>

                {/* Live Render */}
                <div className="rounded-2xl border border-dashed border-[#C7C2B6] bg-white p-4">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#6B6C72]">
                    Kết quả Render trực tiếp (Flexbox)
                  </div>
                  <div
                    className={`flex rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-4 ${
                      flexDir === "row" ? "flex-row items-center" : "flex-col"
                    }`}
                    style={{ gap: `${flexGap}px` }}
                  >
                    <div className="min-w-0 flex-1 truncate rounded-xl border border-[#DFDBD1] bg-white px-3 py-2 text-xs text-[#6B6C72]">
                      Input (Fill · flex-1 min-w-0)
                    </div>
                    <button
                      type="button"
                      className={`${
                        ctaSizing === "fill" ? "flex-1 w-full" : "w-fit px-5"
                      } rounded-xl bg-[#17181C] py-2 text-xs font-semibold text-white`}
                    >
                      Nút CTA ({ctaSizing === "fill" ? "Fill" : "Hug"})
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeId === "tokens-variables" && (
              <>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full border border-[#DFDBD1] bg-white p-1">
                    {(
                      [
                        { id: "paper", label: "Paper Light" },
                        { id: "ink", label: "Ink Dark" },
                        { id: "lavender", label: "Lavender Accent" },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTokenTheme(t.id)}
                        className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          tokenTheme === t.id
                            ? "bg-[#17181C] text-white"
                            : "text-[#5A5B60]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-[#DFDBD1] bg-white p-1">
                    {([8, 16, 24] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setTokenRadius(r)}
                        className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          tokenRadius === r
                            ? "bg-[#17181C] text-white"
                            : "text-[#5A5B60]"
                        }`}
                      >
                        Radius {r}px
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-[#C7C2B6] bg-white p-4">
                  <div
                    className="border p-5 transition-all"
                    style={{
                      borderRadius: `${tokenRadius}px`,
                      backgroundColor:
                        tokenTheme === "paper"
                          ? "#FFFFFF"
                          : tokenTheme === "ink"
                          ? "#17181C"
                          : "#F4EEFF",
                      color:
                        tokenTheme === "ink" ? "#F7F6F2" : "#17181C",
                      borderColor:
                        tokenTheme === "ink"
                          ? "#2E3039"
                          : tokenTheme === "lavender"
                          ? "#D5C2F6"
                          : "#E3E0D7",
                    }}
                  >
                    <div className="text-xs font-bold">
                      Card dùng CSS Variables
                    </div>
                    <p className="mt-1 text-[11px] opacity-80">
                      Nút bên trong tự tính bo góc đồng tâm (calc(var(--radius) -
                      6px)).
                    </p>
                    <button
                      type="button"
                      className="mt-3 px-4 py-2 text-xs font-semibold transition-all"
                      style={{
                        borderRadius: `${Math.max(4, tokenRadius - 6)}px`,
                        backgroundColor:
                          tokenTheme === "ink"
                            ? "#E6DAFB"
                            : tokenTheme === "lavender"
                            ? "#5B35B5"
                            : "#17181C",
                        color: tokenTheme === "ink" ? "#17181C" : "#FFFFFF",
                      }}
                    >
                      Publish Token
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeId === "responsive-touch" && (
              <>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full border border-[#DFDBD1] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setViewportMode("mobile")}
                      className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        viewportMode === "mobile"
                          ? "bg-[#17181C] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      <Smartphone className="h-3 w-3" />
                      Mobile 1 cột
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewportMode("desktop")}
                      className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        viewportMode === "desktop"
                          ? "bg-[#17181C] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      <Monitor className="h-3 w-3" />
                      Web 2 cột
                    </button>
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-[#DFDBD1] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setTouchMode("safe44")}
                      className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        touchMode === "safe44"
                          ? "bg-[#195734] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      Touch 44px (Đạt)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTouchMode("unsafe24")}
                      className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        touchMode === "unsafe24"
                          ? "bg-[#B42318] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      Touch 24px (Lỗi)
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-[#C7C2B6] bg-white p-4">
                  <div
                    className={`mx-auto grid gap-3 transition-all ${
                      viewportMode === "mobile"
                        ? "max-w-[260px] grid-cols-1"
                        : "grid-cols-2"
                    }`}
                  >
                    {["Card A", "Card B"].map((title) => (
                      <div
                        key={title}
                        className="rounded-xl border border-[#E3E0D7] bg-[#FAF9F5] p-3"
                      >
                        <div className="text-xs font-bold text-[#17181C]">
                          {title}
                        </div>
                        <button
                          type="button"
                          className={`mt-2 w-full rounded-lg text-[11px] font-semibold text-white transition-all ${
                            touchMode === "safe44"
                              ? "min-h-[44px] bg-[#195734]"
                              : "min-h-[24px] bg-[#B42318]"
                          }`}
                        >
                          {touchMode === "safe44"
                            ? "Nút 44px · Dễ chạm"
                            : "Nút 24px · Khó bấm"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeId === "states-a11y" && (
              <>
                <div className="flex flex-wrap gap-1 rounded-2xl border border-[#DFDBD1] bg-white p-1">
                  {(
                    [
                      { id: "default", label: "Default" },
                      { id: "hover", label: "Hover" },
                      { id: "focus", label: "Focus" },
                      { id: "error", label: "Error" },
                      { id: "disabled", label: "Disabled" },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setUiState(st.id)}
                      className={`cursor-pointer rounded-xl px-2.5 py-1 text-[11px] font-semibold ${
                        uiState === st.id
                          ? "bg-[#17181C] text-white"
                          : "text-[#5A5B60]"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-dashed border-[#C7C2B6] bg-white p-4">
                  <label
                    htmlFor="demo-a11y-input"
                    className="block text-xs font-bold text-[#17181C]"
                  >
                    Email nhận tài liệu
                  </label>
                  <input
                    id="demo-a11y-input"
                    type="email"
                    readOnly
                    value={
                      uiState === "error"
                        ? "thao.designer.gmail.com"
                        : "thao@manae.design"
                    }
                    disabled={uiState === "disabled"}
                    className={`mt-1.5 w-full rounded-xl border px-3 py-2 text-xs transition-all ${
                      uiState === "error"
                        ? "border-[#D92D20] bg-[#FEF3F2] text-[#7A271A]"
                        : uiState === "focus"
                        ? "border-[#6D4AFF] bg-white ring-2 ring-[#6D4AFF]/25"
                        : uiState === "hover"
                        ? "border-[#17181C] bg-[#FAF9F5]"
                        : uiState === "disabled"
                        ? "cursor-not-allowed border-[#E3E0D7] bg-[#F0EEE8] opacity-55"
                        : "border-[#DFDBD1] bg-white"
                    }`}
                  />
                  {uiState === "error" && (
                    <p
                      role="alert"
                      className="mt-1.5 text-[11px] font-semibold text-[#B42318]"
                    >
                      Email thiếu ký tự @ — role=&quot;alert&quot; giúp Screen
                      Reader đọc ngay lỗi này.
                    </p>
                  )}
                  {uiState === "focus" && (
                    <p className="mt-1.5 text-[11px] font-medium text-[#4B2D8A]">
                      Ring focus rõ ràng giúp người dùng phím Tab biết con trỏ
                      đang ở đâu.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Right: Generated Live FE Code */}
        <Card className="flex min-w-0 flex-col justify-between p-5 xl:col-span-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 rounded-full border border-[#DFDBD1] bg-[#F7F6F2] p-1">
                <button
                  type="button"
                  onClick={() => setCodeLang("tailwind")}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${
                    codeLang === "tailwind"
                      ? "bg-[#17181C] text-white"
                      : "text-[#5A5B60]"
                  }`}
                >
                  Tailwind / React
                </button>
                <button
                  type="button"
                  onClick={() => setCodeLang("css")}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${
                    codeLang === "css"
                      ? "bg-[#17181C] text-white"
                      : "text-[#5A5B60]"
                  }`}
                >
                  CSS thuần
                </button>
              </div>

              <button
                type="button"
                onClick={() => void handleCopyCode()}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#DFDBD1] bg-white px-3 py-1.5 text-xs font-semibold text-[#17181C] hover:bg-[#F7F6F2]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#195734]" />
                    <span>Đã copy</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="mt-3 overflow-x-auto rounded-2xl bg-[#16181D] p-4 font-mono text-xs leading-relaxed text-[#E9ECF4]">
              <code>{generatedCode}</code>
            </pre>

            {/* Live FE Spec Assertion Bar (SQL-style Expected Output Check) */}
            <div className="mt-3 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-3">
              <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-[#4E4F54]">
                <span>Kiểm tra chuẩn FE Handoff tự động</span>
                <span className="text-[#195734]">Live Spec</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {activeId === "auto-layout-flex" && (
                  <>
                    <div
                      className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold ${
                        flexGap >= 16
                          ? "bg-[#DFF5E5] text-[#195734]"
                          : "bg-[#FCE9F0] text-[#7A2343]"
                      }`}
                    >
                      {flexGap >= 16 ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span>Gap {flexGap}px (Chuẩn &gt;= 16px)</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl bg-[#DFF5E5] px-2.5 py-1.5 text-[11px] font-semibold text-[#195734]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>min-w-0 chống tràn Input</span>
                    </div>
                  </>
                )}
                {activeId === "tokens-variables" && (
                  <>
                    <div className="flex items-center gap-1.5 rounded-xl bg-[#DFF5E5] px-2.5 py-1.5 text-[11px] font-semibold text-[#195734]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Semantic CSS Variables ({tokenTheme})</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl bg-[#DFF5E5] px-2.5 py-1.5 text-[11px] font-semibold text-[#195734]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Radius token {tokenRadius}px (8pt)</span>
                    </div>
                  </>
                )}
                {activeId === "responsive-touch" && (
                  <>
                    <div
                      className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold ${
                        touchMode === "safe44"
                          ? "bg-[#DFF5E5] text-[#195734]"
                          : "bg-[#FCE9F0] text-[#7A2343]"
                      }`}
                    >
                      {touchMode === "safe44" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span>
                        Touch target {touchMode === "safe44" ? ">= 44px" : "24px quá nhỏ"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl bg-[#DFF5E5] px-2.5 py-1.5 text-[11px] font-semibold text-[#195734]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Grid responsive ({viewportMode})</span>
                    </div>
                  </>
                )}
                {activeId === "states-a11y" && (
                  <>
                    <div className="flex items-center gap-1.5 rounded-xl bg-[#DFF5E5] px-2.5 py-1.5 text-[11px] font-semibold text-[#195734]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>State &ldquo;{uiState}&rdquo; có ring/aria chuẩn</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl bg-[#DFF5E5] px-2.5 py-1.5 text-[11px] font-semibold text-[#195734]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Keyboard Focus Visible</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-3.5 text-xs text-[#4E4F54]">
            <span className="font-bold text-[#17181C]">Quy tắc FE cốt lõi:</span>{" "}
            {activeModule.feConcept}
          </div>
        </Card>
      </div>

      {/* Bottom: 3-row Figma -> Code Mapping + 1 Quick Challenge */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Card className="min-w-0 p-5 lg:col-span-6">
          <h3 className="text-sm font-bold text-[#17181C]">
            Bảng dịch nhanh Figma → Code
          </h3>
          <div className="mt-3 space-y-2.5">
            {activeModule.mappingRows.map((row, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-3 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-[#4B2D8A]">
                    Figma: {row.figmaProperty}
                  </span>
                  <code className="rounded-md bg-[#17181C] px-2 py-0.5 font-mono text-[11px] text-white">
                    {row.feEquivalent}
                  </code>
                </div>
                <p className="mt-1.5 text-[#5A5B60]">{row.pitfallNote}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="min-w-0 p-5 lg:col-span-6">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17181C]">
              <Sparkles className="h-4 w-4 text-[#5B35B5]" />
              Thử thách chốt bài (+15 XP)
            </span>
            {isCompleted && <Badge tone="mint">Đã đạt</Badge>}
          </div>

          <p className="mt-2.5 text-xs font-semibold leading-relaxed text-[#17181C]">
            {activeModule.challenge.question}
          </p>

          <div className="mt-3 space-y-2">
            {activeModule.challenge.options.map((opt) => {
              const selected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [activeModule.id]: opt.id,
                    }))
                  }
                  className={`flex w-full cursor-pointer items-start gap-2 rounded-xl border p-2.5 text-left text-xs transition-colors ${
                    selected
                      ? "border-[#17181C] bg-[#17181C] text-white"
                      : "border-[#DFDBD1] bg-white text-[#17181C] hover:bg-[#FAF9F5]"
                  }`}
                >
                  <span className="font-bold uppercase">{opt.id}.</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="dark"
              size="sm"
              disabled={!selectedOption || busy}
              onClick={async () => {
                if (!selectedOption) return;
                const res = await onSubmitChallenge(
                  activeModule.id,
                  selectedOption
                );
                if (res) {
                  setChallengeFeedback((prev) => ({
                    ...prev,
                    [activeModule.id]: res,
                  }));
                }
              }}
            >
              {busy ? "Đang kiểm tra..." : "Kiểm tra & Lưu tiến độ"}
            </Button>
          </div>

          {feedback && (
            <div
              role="status"
              className={`mt-3 rounded-xl border p-3 text-xs ${
                feedback.isCorrect
                  ? "border-[#B6E3C3] bg-[#E8F8EE] text-[#133220]"
                  : "border-[#F5B4AD] bg-[#FFF5F4] text-[#7A231B]"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                {feedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>
                      Chính xác!
                      {feedback.xpAwarded > 0
                        ? ` +${feedback.xpAwarded} XP`
                        : ""}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>Chưa đúng — xem gợi ý rồi chọn lại nhé:</span>
                  </>
                )}
              </div>
              <p className="mt-1 leading-relaxed">{feedback.explanation}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
