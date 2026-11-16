"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Lightbulb,
  Link2,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { UiComponentPreview } from "@/components/dashboard/UiComponentPreview";
import {
  TERMINOLOGY_ROUNDS,
  UI_COMPONENT_CATEGORY_LABELS,
  UI_COMPONENT_GLOSSARY,
  type TerminologyRoundNumber,
  type UiComponentCategory,
  type UiComponentTerm,
} from "@/lib/curriculum/ui-components-glossary";

const INITIAL_RIGHT_PERMUTATION = [3, 5, 0, 4, 1, 2];
const LETTERS = ["A", "B", "C", "D", "E", "F"];

function getInitialShuffledTerms(items: UiComponentTerm[]): UiComponentTerm[] {
  return INITIAL_RIGHT_PERMUTATION.map((idx) => items[idx]).filter(Boolean);
}

function randomizeOrder(items: UiComponentTerm[]): UiComponentTerm[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function UiTerminologyStudio() {
  const [mode, setMode] = useState<"match" | "browse">("match");
  const [activeRound, setActiveRound] = useState<TerminologyRoundNumber>(1);

  // Matching game state per round
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedMap, setMatchedMap] = useState<Record<string, boolean>>({});
  const [pairCodeMap, setPairCodeMap] = useState<Record<string, string>>({});
  const [latestMatchedId, setLatestMatchedId] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<{
    leftId: string;
    rightId: string;
  } | null>(null);
  const [hintedId, setHintedId] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [customRightOrderByRound, setCustomRightOrderByRound] = useState<
    Partial<Record<TerminologyRoundNumber, string[]>>
  >({});

  // Glossary browse state
  const [categoryFilter, setCategoryFilter] = useState<
    UiComponentCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const roundMeta =
    TERMINOLOGY_ROUNDS.find((r) => r.round === activeRound) ??
    TERMINOLOGY_ROUNDS[0];

  const roundLeftItems = useMemo(
    () => UI_COMPONENT_GLOSSARY.filter((item) => item.round === activeRound),
    [activeRound]
  );

  const roundRightItems = useMemo(() => {
    const customIds = customRightOrderByRound[activeRound];
    if (customIds && customIds.length === roundLeftItems.length) {
      const byId = new Map(roundLeftItems.map((item) => [item.id, item]));
      const ordered = customIds
        .map((id) => byId.get(id))
        .filter((x): x is UiComponentTerm => Boolean(x));
      if (ordered.length === roundLeftItems.length) return ordered;
    }
    return getInitialShuffledTerms(roundLeftItems);
  }, [activeRound, customRightOrderByRound, roundLeftItems]);

  const totalMatchedCount = useMemo(
    () =>
      UI_COMPONENT_GLOSSARY.filter((item) => Boolean(matchedMap[item.id]))
        .length,
    [matchedMap]
  );

  const roundMatchedCount = useMemo(
    () => roundLeftItems.filter((item) => Boolean(matchedMap[item.id])).length,
    [matchedMap, roundLeftItems]
  );

  const latestMatchedTerm = useMemo(
    () =>
      UI_COMPONENT_GLOSSARY.find((item) => item.id === latestMatchedId) ?? null,
    [latestMatchedId]
  );

  const filteredGlossary = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return UI_COMPONENT_GLOSSARY.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        item.term,
        item.shortLabel,
        item.shortDefinition,
        item.confusedWith.term,
        ...item.commonMistakes,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [categoryFilter, searchQuery]);

  const evaluatePair = (leftId: string, rightId: string) => {
    setAttemptCount((prev) => prev + 1);
    setHintedId(null);

    if (leftId === rightId) {
      const leftIdx = roundLeftItems.findIndex((i) => i.id === leftId);
      const rightIdx = roundRightItems.findIndex((i) => i.id === rightId);
      const code = `${LETTERS[leftIdx] ?? "?"} ↔ ${rightIdx + 1}`;
      setMatchedMap((prev) => ({ ...prev, [leftId]: true }));
      setPairCodeMap((prev) => ({ ...prev, [leftId]: code }));
      setLatestMatchedId(leftId);
      setSelectedLeftId(null);
      setSelectedRightId(null);
      setWrongPair(null);
      return;
    }

    setWrongCount((prev) => prev + 1);
    setWrongPair({ leftId, rightId });
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setTimeout(() => {
      setWrongPair((current) =>
        current && current.leftId === leftId && current.rightId === rightId
          ? null
          : current
      );
    }, 900);
  };

  const handleSelectLeft = (id: string) => {
    if (matchedMap[id]) {
      setLatestMatchedId(id);
      return;
    }
    setWrongPair(null);
    if (selectedRightId) {
      evaluatePair(id, selectedRightId);
      return;
    }
    setSelectedLeftId((prev) => (prev === id ? null : id));
  };

  const handleSelectRight = (id: string) => {
    if (matchedMap[id]) {
      setLatestMatchedId(id);
      return;
    }
    setWrongPair(null);
    if (selectedLeftId) {
      evaluatePair(selectedLeftId, id);
      return;
    }
    setSelectedRightId((prev) => (prev === id ? null : id));
  };

  const handleHint = () => {
    const firstUnmatched = roundLeftItems.find((item) => !matchedMap[item.id]);
    if (!firstUnmatched) return;
    setHintedId(firstUnmatched.id);
    setTimeout(() => {
      setHintedId((curr) => (curr === firstUnmatched.id ? null : curr));
    }, 2400);
  };

  const handleResetRound = () => {
    setMatchedMap((prev) => {
      const next = { ...prev };
      for (const item of roundLeftItems) {
        delete next[item.id];
      }
      return next;
    });
    setPairCodeMap((prev) => {
      const next = { ...prev };
      for (const item of roundLeftItems) {
        delete next[item.id];
      }
      return next;
    });
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setWrongPair(null);
    setHintedId(null);
    setLatestMatchedId(null);
    const shuffled = randomizeOrder(roundLeftItems).map((item) => item.id);
    setCustomRightOrderByRound((prev) => ({
      ...prev,
      [activeRound]: shuffled,
    }));
  };

  const accuracyPercent =
    attemptCount > 0
      ? Math.max(
          0,
          Math.round(((attemptCount - wrongCount) / attemptCount) * 100)
        )
      : 100;

  return (
    <div className="space-y-5">
      {/* Header & Mode Tabs */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="lavender">
                <Sparkles className="h-3 w-3" />
                {UI_COMPONENT_GLOSSARY.length} Thuật ngữ Component Chuẩn
              </Badge>
              <Badge tone="mint">
                Đã nối {totalMatchedCount}/{UI_COMPONENT_GLOSSARY.length} cặp
              </Badge>
            </div>
            <h2 className="mt-2 text-lg font-extrabold tracking-tight text-[#17181C]">
              Nối Tên Học Thuật với Hình Minh Họa Thành Phần UI
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#5A5B60]">
              Gọi đúng tên component như <strong>Tooltip</strong>,{" "}
              <strong>Floating Action Button (FAB)</strong> (hay bị gọi nhầm là
              &ldquo;float butter&rdquo;), <strong>Snackbar</strong>,{" "}
              <strong>Popover</strong>, <strong>Bottom Sheet</strong> để nói
              chuyện chuẩn với Dev và Design System.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Chọn chế độ học thuật ngữ UI"
            className="inline-flex shrink-0 self-start rounded-full border border-[#E5E2DA] bg-[#F3F1EB] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "match"}
              onClick={() => setMode("match")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                mode === "match"
                  ? "bg-[#121316] text-white shadow-xs"
                  : "text-[#5A5B60] hover:text-[#17181C]"
              }`}
            >
              <Link2 className="h-3.5 w-3.5" />
              Nối Tên ↔ Hình
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "browse"}
              onClick={() => setMode("browse")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                mode === "browse"
                  ? "bg-[#121316] text-white shadow-xs"
                  : "text-[#5A5B60] hover:text-[#17181C]"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Kho Minh họa ({UI_COMPONENT_GLOSSARY.length})
            </button>
          </div>
        </div>
      </Card>

      {/* MODE 1: INTERACTIVE NAME <-> VISUAL MATCHING GAME */}
      {mode === "match" && (
        <div className="space-y-4">
          {/* Round Selector & Stats Bar */}
          <Card className="p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {TERMINOLOGY_ROUNDS.map((r) => {
                  const doneInRound = UI_COMPONENT_GLOSSARY.filter(
                    (item) => item.round === r.round && matchedMap[item.id]
                  ).length;
                  const active = activeRound === r.round;
                  return (
                    <button
                      key={r.round}
                      type="button"
                      onClick={() => {
                        setActiveRound(r.round);
                        setSelectedLeftId(null);
                        setSelectedRightId(null);
                        setWrongPair(null);
                        setHintedId(null);
                      }}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
                        active
                          ? "border-[#121316] bg-[#121316] text-white"
                          : doneInRound === 6
                          ? "border-[#BEE7C9] bg-[#EAF9EF] text-[#195734]"
                          : "border-[#E3E0D7] bg-[#FAF9F5] text-[#4E4F54] hover:border-[#BEB9AD] hover:bg-white"
                      }`}
                    >
                      <span>
                        Vòng {r.round}/{TERMINOLOGY_ROUNDS.length}
                      </span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-black/5 text-current"
                        }`}
                      >
                        {doneInRound}/6
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#F3F1EB] px-3 py-1 text-[11px] font-bold text-[#4E4F54]">
                  Độ chính xác: {accuracyPercent}%
                </span>
                <button
                  type="button"
                  onClick={handleHint}
                  disabled={roundMatchedCount === 6}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#EADCA8] bg-[#FCF7E3] px-3 py-1 text-[11px] font-bold text-[#6B5310] transition-colors hover:border-[#D4BE6E] disabled:opacity-45"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  Gợi ý 1 cặp
                </button>
                <button
                  type="button"
                  onClick={handleResetRound}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#E3E0D7] bg-white px-3 py-1 text-[11px] font-bold text-[#17181C] transition-colors hover:bg-[#FAF9F5]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Chơi lại vòng này
                </button>
              </div>
            </div>

            <div className="mt-3 border-t border-[#ECEAE3] pt-3">
              <div className="text-xs font-extrabold text-[#17181C]">
                {roundMeta.title}
              </div>
              <div className="mt-0.5 text-[11px] text-[#5A5B60]">
                {roundMeta.subtitle} —{" "}
                <span className="font-semibold text-[#17181C]">
                  Cách chơi:
                </span>{" "}
                Bấm 1 Hình ở cột trái rồi bấm 1 Tên học thuật tương ứng ở cột
                phải (hoặc ngược lại).
              </div>
            </div>
          </Card>

          {/* Status Feedback Banner */}
          {wrongPair && (
            <div className="rounded-2xl border border-[#F4CEDC] bg-[#FDF0F5] px-4 py-2.5 text-xs font-bold text-[#7A2343]">
              Chưa khớp — hãy quan sát kỹ vị trí (góc màn hình, trong luồng hay
              neo vào nút) và chức năng trong hình nhé!
            </div>
          )}

          {roundMatchedCount === 6 && (
            <Card className="border-[#BEE7C9] bg-[#EAF9EF] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#195734] shadow-xs">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-extrabold text-[#195734]">
                      Hoàn thành Vòng {activeRound}/{TERMINOLOGY_ROUNDS.length} (
                      {roundMatchedCount}/6 cặp chuẩn xác)!
                    </div>
                    <div className="text-xs text-[#22643E]">
                      Bấm vào từng cặp xanh bên dưới để xem lại phân tích, hoặc
                      chuyển sang vòng kế tiếp.
                    </div>
                  </div>
                </div>
                {activeRound < TERMINOLOGY_ROUNDS.length ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRound((prev) =>
                        prev < TERMINOLOGY_ROUNDS.length
                          ? ((prev + 1) as TerminologyRoundNumber)
                          : prev
                      );
                      setSelectedLeftId(null);
                      setSelectedRightId(null);
                      setWrongPair(null);
                    }}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#195734] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#134227]"
                  >
                    Sang Vòng {activeRound + 1}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMode("browse")}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#195734] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#134227]"
                  >
                    Mở Kho {UI_COMPONENT_GLOSSARY.length} Thuật ngữ
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </Card>
          )}

          {/* Two-Column Matching Board */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* LEFT COLUMN: VISUAL PREVIEWS */}
            <div className="space-y-2.5 lg:col-span-6">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#5A5B60]">
                  Cột Trái · Hình minh họa UI (A–F)
                </span>
                <span className="text-[11px] font-semibold text-[#7C7D82]">
                  {selectedLeftId ? "Đã chọn 1 hình" : "Chọn 1 hình"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {roundLeftItems.map((item, idx) => {
                  const isMatched = Boolean(matchedMap[item.id]);
                  const isSelected = selectedLeftId === item.id;
                  const isWrong = wrongPair?.leftId === item.id;
                  const isHinted = hintedId === item.id;
                  const letter = LETTERS[idx] ?? String(idx + 1);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectLeft(item.id)}
                      className={`group flex w-full cursor-pointer flex-col gap-2 rounded-2xl border p-2.5 text-left transition-all ${
                        isMatched
                          ? "border-[#68C481] bg-[#EAF9EF]"
                          : isWrong
                          ? "border-[#E58AA9] bg-[#FDF0F5]"
                          : isSelected
                          ? "border-[#4B2D8A] bg-[#F4EEFF] ring-2 ring-[#4B2D8A]/25"
                          : isHinted
                          ? "border-dashed border-[#D4BE6E] bg-[#FCF7E3] ring-2 ring-[#EADCA8]"
                          : "border-[#E3E0D7] bg-white hover:border-[#9E9FA5]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 px-1">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-extrabold ${
                            isMatched
                              ? "text-[#195734]"
                              : isSelected
                              ? "text-[#4B2D8A]"
                              : "text-[#17181C]"
                          }`}
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-black/6 text-[11px]">
                            {letter}
                          </span>
                          <span>Hình {letter}</span>
                        </span>
                        {isMatched ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold text-[#195734] shadow-xs">
                            <CheckCircle2 className="h-3 w-3" />
                            {pairCodeMap[item.id]} · {item.term}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-[#7C7D82]">
                            {isSelected ? "Đang chọn..." : "Bấm để nối"}
                          </span>
                        )}
                      </div>
                      <UiComponentPreview componentId={item.id} compact />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: ACADEMIC TERM NAMES */}
            <div className="space-y-2.5 lg:col-span-6">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#5A5B60]">
                  Cột Phải · Tên học thuật chuẩn (1–6)
                </span>
                <span className="text-[11px] font-semibold text-[#7C7D82]">
                  {selectedRightId ? "Đã chọn 1 tên" : "Chọn 1 tên"}
                </span>
              </div>

              <div className="space-y-2.5">
                {roundRightItems.map((item, idx) => {
                  const isMatched = Boolean(matchedMap[item.id]);
                  const isSelected = selectedRightId === item.id;
                  const isWrong = wrongPair?.rightId === item.id;
                  const isHinted = hintedId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectRight(item.id)}
                      className={`flex min-h-[76px] w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                        isMatched
                          ? "border-[#68C481] bg-[#EAF9EF]"
                          : isWrong
                          ? "border-[#E58AA9] bg-[#FDF0F5]"
                          : isSelected
                          ? "border-[#4B2D8A] bg-[#F4EEFF] ring-2 ring-[#4B2D8A]/25"
                          : isHinted
                          ? "border-dashed border-[#D4BE6E] bg-[#FCF7E3] ring-2 ring-[#EADCA8]"
                          : "border-[#E3E0D7] bg-white hover:border-[#9E9FA5]"
                      }`}
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                            isMatched
                              ? "bg-white text-[#195734]"
                              : isSelected
                              ? "bg-[#4B2D8A] text-white"
                              : "bg-[#F3F1EB] text-[#17181C]"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-[#17181C]">
                            {item.term}
                          </div>
                          <div className="mt-0.5 text-xs text-[#5A5B60]">
                            {item.shortLabel}
                          </div>
                          {isMatched && (
                            <div className="mt-1.5 text-[11px] font-semibold text-[#195734]">
                              Hay bị gọi nhầm:{" "}
                              {item.commonMistakes
                                .map((m) => `“${m}”`)
                                .join(", ")}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isMatched ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-[#195734] shadow-xs">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {pairCodeMap[item.id]}
                          </span>
                        ) : (
                          <span className="rounded-full bg-[#FAF9F5] px-2.5 py-1 text-[10px] font-bold text-[#6B6C72]">
                            {isSelected ? "Đang chọn" : "Ghép cặp"}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Latest Matched Explanation Card */}
              {latestMatchedTerm && (
                <Card className="border-[#C5E2FA] bg-[#EDF6FD] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#1A4E7A]">
                      Giải mã thuật ngữ vừa nối
                    </span>
                    <Badge tone="lavender">{latestMatchedTerm.categoryLabel}</Badge>
                  </div>
                  <div className="mt-1.5 text-base font-extrabold text-[#17181C]">
                    {latestMatchedTerm.term}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#2F333B]">
                    {latestMatchedTerm.shortDefinition}
                  </p>
                  <div className="mt-2.5 space-y-1.5 rounded-xl bg-white/85 p-3 text-xs">
                    <div>
                      <span className="font-bold text-[#17181C]">
                        Khi nào dùng:
                      </span>{" "}
                      <span className="text-[#4E4F54]">
                        {latestMatchedTerm.whenToUse}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#7A2343]">
                        Phân biệt với {latestMatchedTerm.confusedWith.term}:
                      </span>{" "}
                      <span className="text-[#4E4F54]">
                        {latestMatchedTerm.confusedWith.difference}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-0.5 text-[11px] font-semibold text-[#4B2D8A]">
                      <Code2 className="h-3.5 w-3.5 shrink-0" />
                      <code>{latestMatchedTerm.codeHint}</code>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: VISUAL DICTIONARY & COMPARISON EXPLORER */}
      {mode === "browse" && (
        <div className="space-y-4">
          <Card className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {(
                  Object.keys(UI_COMPONENT_CATEGORY_LABELS) as Array<
                    UiComponentCategory | "all"
                  >
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                      categoryFilter === cat
                        ? "bg-[#121316] text-white"
                        : "bg-[#F3F1EB] text-[#4E4F54] hover:bg-[#E7E4DC]"
                    }`}
                  >
                    {UI_COMPONENT_CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8E8F94]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm: tooltip, float butter, popup..."
                  className="w-full rounded-full border border-[#E3E0D7] bg-[#FAF9F5] py-2 pr-3 pl-9 text-xs text-[#17181C] placeholder:text-[#8E8F94] focus:border-[#121316] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </Card>

          {filteredGlossary.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-sm font-bold text-[#17181C]">
                Không tìm thấy thành phần UI khớp từ khóa &ldquo;{searchQuery}
                &rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("all");
                  setSearchQuery("");
                }}
                className="mt-3 cursor-pointer rounded-full bg-[#121316] px-4 py-1.5 text-xs font-bold text-white"
              >
                Hiện lại toàn bộ {UI_COMPONENT_GLOSSARY.length} thành phần
              </button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredGlossary.map((item) => (
                <Card key={item.id} className="flex flex-col p-4 sm:p-5">
                  <UiComponentPreview componentId={item.id} />

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-extrabold text-[#17181C]">
                      {item.term}
                    </h3>
                    <Badge tone="lavender">{item.categoryLabel}</Badge>
                  </div>

                  <div className="mt-1 text-[11px] font-semibold text-[#7A2343]">
                    Hay bị gọi nhầm:{" "}
                    {item.commonMistakes.map((m) => `“${m}”`).join(", ")}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-[#4E4F54]">
                    {item.shortDefinition}
                  </p>

                  <div className="mt-3 space-y-1.5 rounded-xl border border-[#ECEAE3] bg-[#FAF9F5] p-3 text-xs">
                    <div>
                      <span className="font-bold text-[#17181C]">
                        Khi nào dùng:
                      </span>{" "}
                      <span className="text-[#4E4F54]">{item.whenToUse}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#195734]">
                        Khác với {item.confusedWith.term}:
                      </span>{" "}
                      <span className="text-[#4E4F54]">
                        {item.confusedWith.difference}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#4B2D8A]">
                    <Code2 className="h-3.5 w-3.5 shrink-0" />
                    <code className="truncate">{item.codeHint}</code>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
