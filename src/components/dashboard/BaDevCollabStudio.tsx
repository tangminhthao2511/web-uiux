"use client";

import { useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Copy,
  MessageSquare,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import {
  BA_DEV_CHECKLISTS,
  BA_DEV_SCENARIOS,
  COLLAB_TEMPLATES,
} from "@/lib/curriculum/ba-dev-playbook";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type CollabTab = "scenarios" | "checklist" | "templates";

export function BaDevCollabStudio() {
  const [tab, setTab] = useState<CollabTab>("scenarios");
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [pickedByScenario, setPickedByScenario] = useState<
    Record<string, string>
  >({});
  const [solvedIds, setSolvedIds] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const current = BA_DEV_SCENARIOS[scenarioIdx] ?? BA_DEV_SCENARIOS[0];
  const pickedId = pickedByScenario[current.id] ?? null;
  const isAnswered = Boolean(pickedId);
  const isCorrect = pickedId === current.correctOptionId;
  const solvedCount = Object.values(solvedIds).filter(Boolean).length;

  const totalChecklistItems = BA_DEV_CHECKLISTS.reduce(
    (sum, g) => sum + g.items.length,
    0
  );
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const handlePickOption = (optId: string) => {
    setPickedByScenario((prev) => ({ ...prev, [current.id]: optId }));
    if (optId === current.correctOptionId) {
      setSolvedIds((prev) => ({ ...prev, [current.id]: true }));
    }
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Card */}
      <Card tone="white" className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ECEAE3] pb-4">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#D9ECFB] text-[#1A4E7A]">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">Teamwork UI/UX ↔ BA &amp; Dev</Badge>
                <Badge tone="mint">
                  {solvedCount}/{BA_DEV_SCENARIOS.length} ca xử lý đạt
                </Badge>
              </div>
              <h2 className="mt-1.5 text-lg font-extrabold tracking-tight text-[#17181C]">
                Hướng dẫn làm việc thực tế với BA &amp; Dev (Không lệch spec)
              </h2>
              <p className="mt-0.5 text-xs text-[#5A5B60]">
                Luyện phản xạ hỏi Edge Case với BA, chốt Feasibility &amp; 6
                States với Dev và báo lỗi Design QA chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Mode Tabs */}
        <div className="mt-4 grid grid-cols-1 gap-1.5 rounded-2xl border border-[#E3E0D7] bg-[#F3F1EB] p-1.5 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setTab("scenarios")}
            className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
              tab === "scenarios"
                ? "bg-[#17181C] text-white"
                : "text-[#4E4F54] hover:bg-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>1. Tình huống BA &amp; Dev ({BA_DEV_SCENARIOS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setTab("checklist")}
            className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
              tab === "checklist"
                ? "bg-[#17181C] text-white"
                : "text-[#4E4F54] hover:bg-white"
            }`}
          >
            <ClipboardCheck className="h-3.5 w-3.5 shrink-0" />
            <span>
              2. Checklist BA &amp; Handoff ({checkedCount}/{totalChecklistItems})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTab("templates")}
            className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
              tab === "templates"
                ? "bg-[#17181C] text-white"
                : "text-[#4E4F54] hover:bg-white"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 shrink-0" />
            <span>3. Mẫu câu Slack / Jira ({COLLAB_TEMPLATES.length})</span>
          </button>
        </div>
      </Card>

      {/* TAB 1: Interactive 5-Case SQL-style Simulator */}
      {tab === "scenarios" && (
        <Card tone="white" className="p-5">
          {/* Scenario Stepper Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECEAE3] pb-3.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {BA_DEV_SCENARIOS.map((sc, idx) => {
                const active = idx === scenarioIdx;
                const solved = Boolean(solvedIds[sc.id]);
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setScenarioIdx(idx)}
                    className={`inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-bold transition-colors ${
                      active
                        ? "bg-[#17181C] text-white"
                        : solved
                        ? "bg-[#D4F0DC] text-[#133220]"
                        : "bg-[#EFECE5] text-[#4E4F54] hover:bg-[#E3E0D7]"
                    }`}
                  >
                    <span>
                      Ca {idx + 1} · {sc.partner}
                    </span>
                    {solved && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
            <Badge tone={current.partner === "BA" ? "lavender" : "blue"}>
              {current.stageLabel}
            </Badge>
          </div>

          {/* 2-Column Split Simulator */}
          <div className="mt-4 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
            {/* Left: Situation Brief + Incoming Message + Copyable Reply */}
            <div className="flex min-w-0 flex-col justify-between gap-3 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-4 lg:col-span-6">
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#5B35B5]">
                    Tình huống thực tế · Đối tác: {current.partner}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-[#17181C]">
                    {current.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4E4F54]">
                    {current.context}
                  </p>
                </div>

                {/* Chat Bubble */}
                <div className="rounded-2xl border border-[#C5E2FA] bg-[#EDF6FD] p-3.5 text-xs leading-relaxed text-[#142A3D]">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1A4E7A]">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Tin nhắn vừa nhận trên Slack / Jira
                  </div>
                  <p className="font-medium">{current.incomingMessage}</p>
                </div>
              </div>

              {/* Copyable Script unlocked cleanly */}
              <div className="rounded-2xl border border-[#E3E0D7] bg-white p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#195734]">
                    Mẫu câu phản hồi chuẩn (Copy dùng thật)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      void handleCopy(current.id, current.copyTemplate)
                    }
                    className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#DCD9D0] bg-[#FAF9F6] px-2.5 py-1 text-[11px] font-bold text-[#17181C] hover:bg-[#ECEAE3]"
                  >
                    {copiedId === current.id ? (
                      <>
                        <Check className="h-3 w-3 text-[#195734]" />
                        <span>Đã copy</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy mẫu câu</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-[11px] leading-relaxed text-[#3D3E42]">
                  {current.copyTemplate}
                </pre>
              </div>
            </div>

            {/* Right: Dark Decision Runner */}
            <div className="flex min-w-0 flex-col justify-between rounded-2xl bg-[#121316] p-4 text-white lg:col-span-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <span className="text-xs font-bold text-[#E6DAFB]">
                    Bạn sẽ xử lý thế nào? (Chọn để chấm ngay)
                  </span>
                </div>

                <div className="space-y-2.5">
                  {current.options.map((opt) => {
                    const isPicked = pickedId === opt.id;
                    const isRightOpt = opt.id === current.correctOptionId;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handlePickOption(opt.id)}
                        className={`w-full cursor-pointer rounded-xl border p-3 text-left transition-all ${
                          isPicked
                            ? isRightOpt
                              ? "border-[#4ADE80] bg-[#195734]/45"
                              : "border-[#FB7185] bg-[#7A2343]/45"
                            : "border-white/12 bg-white/[0.04] hover:border-white/30 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-white">
                            {opt.id.toUpperCase()}. {opt.label}
                          </span>
                          <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-[#E6DAFB]">
                            Chọn
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] leading-snug text-white/75">
                          {opt.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {isAnswered ? (
                  <div
                    className={`rounded-xl border p-3.5 ${
                      isCorrect
                        ? "border-[#4ADE80]/45 bg-[#195734]/45 text-[#DCFCE7]"
                        : "border-[#FB7185]/45 bg-[#7A2343]/45 text-[#FFE4E6]"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#4ADE80]" />
                          <span>PASS · Xử lý chuẩn teamwork BA / Dev!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 shrink-0 text-[#FB7185]" />
                          <span>
                            FAIL · Cách này dễ phát sinh sửa lại hoặc trễ sprint
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-white/90">
                      {current.whyItWorks}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3 text-[11px] text-[#A4A6AB]">
                    Chọn 1 phương án phía trên để xem đánh giá và lý do thực tế.
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
                <button
                  type="button"
                  disabled={scenarioIdx === 0}
                  onClick={() => setScenarioIdx((i) => Math.max(0, i - 1))}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Ca trước</span>
                </button>
                <button
                  type="button"
                  disabled={scenarioIdx === BA_DEV_SCENARIOS.length - 1}
                  onClick={() =>
                    setScenarioIdx((i) =>
                      Math.min(BA_DEV_SCENARIOS.length - 1, i + 1)
                    )
                  }
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-[#E6DAFB] px-3.5 py-1.5 text-xs font-bold text-[#17181C] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span>Ca tiếp theo</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 2: Interactive BA & Dev Handoff Checklist */}
      {tab === "checklist" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {BA_DEV_CHECKLISTS.map((group) => (
            <Card key={group.id} tone="white" className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECEAE3] pb-3">
                <div>
                  <Badge tone={group.partner === "BA" ? "lavender" : "blue"}>
                    Làm việc với {group.partner}
                  </Badge>
                  <h3 className="mt-1.5 text-sm font-bold text-[#17181C]">
                    {group.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#6B6C72]">
                    {group.subtitle}
                  </p>
                </div>
              </div>

              <ul className="mt-3.5 space-y-2.5">
                {group.items.map((item) => {
                  const checked = Boolean(checkedItems[item.id]);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setCheckedItems((prev) => ({
                            ...prev,
                            [item.id]: !prev[item.id],
                          }))
                        }
                        className={`flex w-full cursor-pointer items-start gap-3 rounded-2xl border p-3 text-left transition-colors ${
                          checked
                            ? "border-[#B6E3C3] bg-[#EAF9EF]"
                            : "border-[#E3E0D7] bg-[#FAF9F6] hover:border-[#BEB9AD]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            checked
                              ? "border-[#195734] bg-[#195734] text-white"
                              : "border-[#BEB9AD] bg-white"
                          }`}
                        >
                          {checked && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <div className="min-w-0">
                          <div
                            className={`text-xs font-bold ${
                              checked
                                ? "text-[#133220] line-through"
                                : "text-[#17181C]"
                            }`}
                          >
                            {item.label}
                          </div>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-[#5A5B60]">
                            {item.why}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 3: Ready-to-copy Slack / Jira Templates */}
      {tab === "templates" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {COLLAB_TEMPLATES.map((tpl) => (
            <Card key={tpl.id} tone="white" className="flex flex-col justify-between p-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge tone={tpl.audience === "Với BA" ? "lavender" : "blue"}>
                    {tpl.audience}
                  </Badge>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void handleCopy(tpl.id, tpl.script)}
                  >
                    {copiedId === tpl.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#195734]" />
                        <span>Đã copy</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy mẫu câu</span>
                      </>
                    )}
                  </Button>
                </div>
                <h3 className="mt-2.5 text-sm font-bold text-[#17181C]">
                  {tpl.situation}
                </h3>
                <pre className="mt-2.5 whitespace-pre-wrap rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-3.5 font-sans text-xs leading-relaxed text-[#2D2E33]">
                  {tpl.script}
                </pre>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
