"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import {
  KNOWLEDGE_TEST_QUESTIONS,
  KNOWLEDGE_TRACKS,
} from "@/lib/curriculum/knowledge-test-bank";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { KnowledgeTrackId, KnowledgeTrackSummary } from "@/types/learning";

interface MilestoneSubmitResponse {
  trackId: KnowledgeTrackId;
  milestone: 1 | 2 | 3 | 4 | 5;
  correctCount: number;
  totalQuestions: number;
  scorePercent: number;
  passed: boolean;
  xpAwarded: number;
  results: {
    questionId: string;
    selectedOptionId: string | null;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

interface KnowledgeRoadmapBankProps {
  totalQuestions: number;
  masteredCount: number;
  masteredQuestionIds: string[];
  tracks: KnowledgeTrackSummary[];
  initialTrackId?: KnowledgeTrackId;
  busy: boolean;
  onSubmitMilestone: (
    trackId: KnowledgeTrackId,
    milestone: 1 | 2 | 3 | 4 | 5,
    answers: Record<string, string>
  ) => Promise<MilestoneSubmitResponse | null>;
}

export function KnowledgeRoadmapBank({
  totalQuestions,
  masteredCount,
  masteredQuestionIds,
  tracks,
  initialTrackId = "ux-core",
  busy,
  onSubmitMilestone,
}: KnowledgeRoadmapBankProps) {
  const [activeTrackId, setActiveTrackId] =
    useState<KnowledgeTrackId>(initialTrackId);
  const [activeMilestone, setActiveMilestone] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] =
    useState<MilestoneSubmitResponse | null>(null);

  const masteredSet = new Set(masteredQuestionIds);
  const activeTrackMeta =
    KNOWLEDGE_TRACKS.find((t) => t.id === activeTrackId) ?? KNOWLEDGE_TRACKS[0];
  const activeTrackSummary =
    tracks.find((t) => t.id === activeTrackId) ?? tracks[0];

  const milestoneQuestions = KNOWLEDGE_TEST_QUESTIONS.filter(
    (q) => q.trackId === activeTrackId && q.milestone === activeMilestone
  );
  const currentQuestion = milestoneQuestions[questionIndex] ?? milestoneQuestions[0];

  const answeredInMilestone = milestoneQuestions.filter(
    (q) => Boolean(answers[q.id])
  ).length;
  const allMilestoneAnswered =
    answeredInMilestone === milestoneQuestions.length &&
    milestoneQuestions.length > 0;

  const switchTrackOrMilestone = (
    trackId: KnowledgeTrackId,
    milestone: 1 | 2 | 3 | 4 | 5
  ) => {
    setActiveTrackId(trackId);
    setActiveMilestone(milestone);
    setQuestionIndex(0);
    setSubmissionResult(null);
  };

  const handleSubmit = async () => {
    const relevantAnswers: Record<string, string> = {};
    for (const q of milestoneQuestions) {
      if (answers[q.id]) {
        relevantAnswers[q.id] = answers[q.id];
      }
    }
    const res = await onSubmitMilestone(
      activeTrackId,
      activeMilestone,
      relevantAnswers
    );
    if (res) {
      setSubmissionResult(res);
    }
  };

  const handleRetryMilestone = () => {
    const nextAnswers = { ...answers };
    for (const q of milestoneQuestions) {
      delete nextAnswers[q.id];
    }
    setAnswers(nextAnswers);
    setQuestionIndex(0);
    setSubmissionResult(null);
  };

  const handleGoNextStep = () => {
    if (activeMilestone < 5) {
      switchTrackOrMilestone(
        activeTrackId,
        (activeMilestone + 1) as 1 | 2 | 3 | 4 | 5
      );
      return;
    }
    const idx = KNOWLEDGE_TRACKS.findIndex((t) => t.id === activeTrackId);
    if (idx >= 0 && idx < KNOWLEDGE_TRACKS.length - 1) {
      switchTrackOrMilestone(KNOWLEDGE_TRACKS[idx + 1].id, 1);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. 5-Track Visual Roadmap Header */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="lavender">
                <Compass className="h-3.5 w-3.5" />
                Lộ trình {totalQuestions} Bài Test Theo Chức Năng
              </Badge>
              <Badge tone="mint">
                Đã chinh phục: {masteredCount}/{totalQuestions} câu
              </Badge>
            </div>
            <h2 className="mt-2 text-lg font-bold tracking-tight text-[#17181C]">
              Học &amp; Test tuần tự qua 5 chặng năng lực Junior (100 câu/chặng)
            </h2>
            <p className="mt-0.5 text-xs text-[#6B6C72]">
              Mỗi chặng gồm 100 câu chia thành 5 chủ đề chuyên sâu (20 câu/chủ
              đề). Đạt ≥ 70%/chủ đề nhận +20 XP.
            </p>
          </div>
        </div>

        <div className="mt-3">
          <ProgressBar
            value={masteredCount}
            max={totalQuestions}
            colorClass="bg-[#5B35B5]"
            ariaLabel="Tổng tiến độ 100 bài test kiến thức"
          />
        </div>

        {/* Connected 5-Stage Roadmap Grid */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {tracks.map((track) => {
            const isActive = track.id === activeTrackId;
            const isFull = track.masteredCount >= track.totalQuestions;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => switchTrackOrMilestone(track.id, 1)}
                className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-3.5 text-left transition-all ${
                  isActive
                    ? "border-[#17181C] bg-[#17181C] text-white shadow-xs"
                    : isFull
                    ? "border-[#BEE7C9] bg-[#EAF9EF] text-[#17181C] hover:border-[#68C481]"
                    : "border-[#E3E0D7] bg-[#FAF9F5] text-[#17181C] hover:border-[#BEB9AD] hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wide ${
                        isActive ? "text-[#E6DAFB]" : "text-[#5B35B5]"
                      }`}
                    >
                      Chặng {track.order}
                    </span>
                    <span
                      className={`text-[11px] font-bold ${
                        isActive
                          ? "text-[#9AE6B4]"
                          : isFull
                          ? "text-[#195734]"
                          : "text-[#6B6C72]"
                      }`}
                    >
                      {track.masteredCount}/{track.totalQuestions}
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-bold leading-snug">
                    {track.title.replace(/^Chặng \d+ · /, "")}
                  </div>
                </div>

                <div className="mt-2.5">
                  <div
                    className={`h-1.5 w-full overflow-hidden rounded-full ${
                      isActive ? "bg-white/20" : "bg-black/8"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full transition-all ${
                        isActive ? "bg-[#E6DAFB]" : "bg-[#195734]"
                      }`}
                      style={{
                        width: `${Math.round(
                          (track.masteredCount / Math.max(1, track.totalQuestions)) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* 2. Active Track Milestone Stepper & Question Runner */}
      {activeTrackSummary && currentQuestion && (
        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#17181C]">
                {activeTrackMeta.title}
              </h3>
              <p className="text-xs text-[#6B6C72]">{activeTrackMeta.subtitle}</p>
            </div>
          </div>

          {/* 5 Topic Milestones per Track (20 questions each = 100/stage) */}
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {(activeTrackSummary.milestones ?? []).map((ms) => {
              const selected = activeMilestone === ms.milestone;
              const complete = ms.mastered >= ms.total && ms.total > 0;
              return (
                <button
                  key={ms.milestone}
                  type="button"
                  onClick={() => switchTrackOrMilestone(activeTrackId, ms.milestone)}
                  className={`flex cursor-pointer flex-col justify-between gap-2 rounded-2xl border p-3 text-left transition-colors ${
                    selected
                      ? "border-[#5B35B5] bg-[#F4EEFF]"
                      : "border-[#E3E0D7] bg-[#FAF9F5] hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#5B35B5]">
                      Mốc {ms.milestone}
                    </span>
                    <Badge tone={complete ? "mint" : selected ? "lavender" : "neutral"}>
                      {ms.mastered}/{ms.total}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-1.5 text-xs font-bold leading-snug text-[#17181C]">
                    {complete && (
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#195734]" />
                    )}
                    <span>{ms.label.replace(/^Chủ đề \d+:\s*/, "")}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Runner vs Result Review */}
          {!submissionResult ? (
            <div className="mt-5 space-y-4">
              {/* 10-Question Navigator Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {milestoneQuestions.map((q, idx) => {
                    const isCurrent = idx === questionIndex;
                    const isAnswered = Boolean(answers[q.id]);
                    const wasMastered = masteredSet.has(q.id);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setQuestionIndex(idx)}
                        className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border text-xs font-bold transition-all ${
                          isCurrent
                            ? "border-[#17181C] bg-[#17181C] text-white"
                            : wasMastered
                            ? "border-[#B6E3C3] bg-[#DFF5E5] text-[#195734]"
                            : isAnswered
                            ? "border-[#C5E2FA] bg-[#E4F2FD] text-[#1A4E7A]"
                            : "border-[#DFDBD1] bg-white text-[#5A5B60] hover:border-[#ABA597]"
                        }`}
                        title={
                          wasMastered
                            ? "Đã chinh phục trước đó"
                            : isAnswered
                            ? "Đã chọn đáp án"
                            : "Chưa trả lời"
                        }
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs font-semibold text-[#6B6C72]">
                  Đã chọn {answeredInMilestone}/{milestoneQuestions.length} câu
                </span>
              </div>

              {/* Single Clean Question Card */}
              <div className="rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge tone="blue">{currentQuestion.topicTag}</Badge>
                  <span className="text-xs font-semibold text-[#6B6C72]">
                    Câu {questionIndex + 1} / {milestoneQuestions.length}
                  </span>
                </div>

                <h4 className="mt-3 text-sm font-bold leading-snug text-[#17181C] sm:text-base">
                  {currentQuestion.question}
                </h4>

                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {currentQuestion.options.map((opt) => {
                    const selected = answers[currentQuestion.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentQuestion.id]: opt.id,
                          }))
                        }
                        className={`flex cursor-pointer items-start gap-2.5 rounded-2xl border p-3.5 text-left text-xs font-medium transition-all ${
                          selected
                            ? "border-[#17181C] bg-[#17181C] text-white shadow-xs"
                            : "border-[#DFDBD1] bg-white text-[#17181C] hover:border-[#ABA597]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold uppercase ${
                            selected
                              ? "bg-white text-[#17181C]"
                              : "bg-[#F0EEE8] text-[#4E4F54]"
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span className="leading-relaxed">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={questionIndex === 0}
                    onClick={() => setQuestionIndex((i) => Math.max(0, i - 1))}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span>Câu trước</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={questionIndex >= milestoneQuestions.length - 1}
                    onClick={() =>
                      setQuestionIndex((i) =>
                        Math.min(milestoneQuestions.length - 1, i + 1)
                      )
                    }
                  >
                    <span>Câu tiếp</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="dark"
                  size="sm"
                  disabled={!allMilestoneAnswered || busy}
                  onClick={() => void handleSubmit()}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>
                    {busy
                      ? "Đang chấm..."
                      : allMilestoneAnswered
                      ? "Nộp & Chấm Mốc (10 câu)"
                      : `Còn ${
                          milestoneQuestions.length - answeredInMilestone
                        } câu`}
                  </span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <div
                className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 ${
                  submissionResult.passed
                    ? "border-[#B6E3C3] bg-[#E8F8EE] text-[#133220]"
                    : "border-[#F6D59D] bg-[#FFF4DC] text-[#5C3D0C]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="text-sm font-extrabold">
                      Mốc {submissionResult.milestone}:{" "}
                      {submissionResult.correctCount}/
                      {submissionResult.totalQuestions} câu đúng (
                      {submissionResult.scorePercent}%)
                    </p>
                    <p className="text-xs opacity-90">
                      {submissionResult.passed
                        ? `Hoàn thành mốc lộ trình! ${
                            submissionResult.xpAwarded > 0
                              ? `Nhận +${submissionResult.xpAwarded} XP.`
                              : "Đã lưu điểm vào bản đồ tiến độ."
                          }`
                        : "Cần ≥ 70% để hoàn thành mốc — xem giải thích bên dưới và thử lại."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="white"
                    size="sm"
                    onClick={handleRetryMilestone}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Làm lại mốc này</span>
                  </Button>
                  {(activeMilestone < 5 ||
                    KNOWLEDGE_TRACKS.findIndex((t) => t.id === activeTrackId) <
                      KNOWLEDGE_TRACKS.length - 1) && (
                    <Button
                      type="button"
                      variant="dark"
                      size="sm"
                      onClick={handleGoNextStep}
                    >
                      <span>
                        {activeMilestone < 5
                          ? `Sang Mốc ${activeMilestone + 1} (20 câu tiếp)`
                          : "Sang Chặng tiếp theo"}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {milestoneQuestions.map((q, idx) => {
                  const item = submissionResult.results.find(
                    (r) => r.questionId === q.id
                  );
                  const isCorrect = item?.isCorrect ?? false;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl border p-3.5 text-xs ${
                        isCorrect
                          ? "border-[#B6E3C3] bg-[#F4FBF6]"
                          : "border-[#F5B4AD] bg-[#FFF5F4]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Badge tone="neutral">
                          Câu {idx + 1} · {q.topicTag}
                        </Badge>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 font-bold text-[#1A683B]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Đúng
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-bold text-[#9C2B20]">
                            <XCircle className="h-3.5 w-3.5" />
                            Đáp án {q.correctOptionId.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 font-semibold text-[#17181C]">
                        {q.question}
                      </p>
                      <p className="mt-1.5 text-[#4E4F54]">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
