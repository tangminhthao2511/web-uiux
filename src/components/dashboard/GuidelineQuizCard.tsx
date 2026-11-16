"use client";

import { useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type {
  GuidelineQuizAttempt,
  StandardGuidelineQuizQuestion,
} from "@/types/learning";

interface GuidelineQuizSubmissionView {
  attempt: GuidelineQuizAttempt;
  xpAwarded: number;
  results: {
    questionId: string;
    selectedOptionId: string | null;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

interface GuidelineQuizCardProps {
  questions: StandardGuidelineQuizQuestion[];
  latestAttempt: GuidelineQuizAttempt | null;
  bestScorePercent: number | null;
  busy: boolean;
  onSubmitQuiz: (
    answers: Record<string, string>
  ) => Promise<GuidelineQuizSubmissionView | null>;
}

export function GuidelineQuizCard({
  questions,
  latestAttempt,
  bestScorePercent,
  busy,
  onSubmitQuiz,
}: GuidelineQuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] =
    useState<GuidelineQuizSubmissionView | null>(null);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const progressPercent = Math.round(
    ((currentIndex + 1) / questions.length) * 100
  );

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    const res = await onSubmitQuiz(answers);
    if (res) {
      setSubmissionResult(res);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSubmissionResult(null);
  };

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#D4C3FC] bg-[#EAE0FE] px-2.5 py-0.5 text-[11px] font-bold text-[#37216D]">
              <ShieldCheck className="h-3.5 w-3.5" />
              QUIZ QUY CHUẨN PHỔ BIẾN
            </span>
            {bestScorePercent !== null && (
              <Badge tone="mint">Cao nhất: {bestScorePercent}%</Badge>
            )}
            {latestAttempt && (
              <Badge tone={latestAttempt.passed ? "blue" : "yellow"}>
                Lần gần nhất: {latestAttempt.correctCount}/
                {latestAttempt.totalQuestions} ({latestAttempt.scorePercent}%)
              </Badge>
            )}
          </div>
          <h2 className="mt-2 text-lg font-bold tracking-tight text-[#17181C]">
            Kiểm tra nhanh quy chuẩn UI/UX Junior
          </h2>
          <p className="mt-0.5 text-xs text-[#6B6C72]">
            WCAG 2.2 · Apple HIG (Liquid Glass & 44pt) · Material 3 (48dp) ·
            Laws of UX · Nielsen Heuristics. Đạt ≥ 70% nhận +15 XP/ngày.
          </p>
        </div>
      </div>

      {!submissionResult ? (
        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#4E4F54]">
              <span>
                Câu {currentIndex + 1} / {questions.length} · Đã chọn{" "}
                {answeredCount}/{questions.length}
              </span>
              <Badge tone="blue">{currentQuestion.standard}</Badge>
            </div>
            <ProgressBar value={progressPercent} colorClass="bg-[#7C5CE6]" />
          </div>

          <div className="rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-4 sm:p-5">
            <h3 className="text-sm font-bold leading-snug text-[#17181C] sm:text-base">
              {currentQuestion.question}
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {currentQuestion.options.map((opt) => {
                const selected = answers[currentQuestion.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      handleSelectOption(currentQuestion.id, opt.id)
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

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Câu trước</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentIndex === questions.length - 1}
                onClick={() =>
                  setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
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
              disabled={!allAnswered || busy}
              onClick={() => void handleSubmit()}
            >
              {busy
                ? "Đang chấm..."
                : allAnswered
                ? "Nộp bài & Xem đáp án"
                : `Còn ${questions.length - answeredCount} câu`}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div
            className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 ${
              submissionResult.attempt.passed
                ? "border-[#B6E3C3] bg-[#E8F8EE] text-[#133220]"
                : "border-[#F6D59D] bg-[#FFF4DC] text-[#5C3D0C]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 shrink-0" />
              <div>
                <p className="text-sm font-extrabold">
                  Kết quả: {submissionResult.attempt.correctCount}/
                  {submissionResult.attempt.totalQuestions} câu đúng (
                  {submissionResult.attempt.scorePercent}%)
                </p>
                <p className="text-xs opacity-90">
                  {submissionResult.attempt.passed
                    ? `Đạt chuẩn Junior! ${
                        submissionResult.xpAwarded > 0
                          ? `Nhận +${submissionResult.xpAwarded} XP.`
                          : "Đã ghi nhận điểm hôm nay."
                      }`
                    : "Chưa đạt mốc 70% — xem nhanh giải thích bên dưới và thử lại nhé."}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Làm lại Quiz</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {questions.map((q) => {
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
                    <Badge tone="neutral">{q.standard}</Badge>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 font-bold text-[#1A683B]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Đúng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-[#9C2B20]">
                        <XCircle className="h-3.5 w-3.5" />
                        Sai (Đáp án {q.correctOptionId.toUpperCase()})
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
  );
}
