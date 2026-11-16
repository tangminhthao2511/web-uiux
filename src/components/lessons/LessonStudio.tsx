"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  Lock,
  Save,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/StateView";
import type { DashboardSnapshot, LessonDetailSnapshot } from "@/types/learning";

interface LessonStudioProps {
  lessonId: string;
  onBackToRoadmap: () => void;
  onOpenPracticeTab: () => void;
  onSelectLessonId: (nextLessonId: string) => void;
  onDashboardUpdated: (snapshot: DashboardSnapshot) => void;
}

type LessonReferenceTab = "theory" | "examples";

export function LessonStudio({
  lessonId,
  onBackToRoadmap,
  onOpenPracticeTab,
  onSelectLessonId,
  onDashboardUpdated,
}: LessonStudioProps) {
  const [detail, setDetail] = useState<LessonDetailSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refTab, setRefTab] = useState<LessonReferenceTab>("theory");
  const [busy, setBusy] = useState<string | null>(null);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResultMsg, setQuizResultMsg] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [noteMsg, setNoteMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      setQuizResultMsg(null);
      setNoteMsg(null);
      setRefTab("theory");
      try {
        const res = await fetch(
          `/api/lessons?id=${encodeURIComponent(lessonId)}`,
          { cache: "no-store" }
        );
        const data = (await res.json()) as LessonDetailSnapshot & {
          error?: string;
        };
        if (!res.ok) {
          throw new Error(data.error || "Không thể tải nội dung bài học.");
        }
        if (!cancelled) {
          setDetail(data);
          setNoteInput(data.personalNote ?? "");
          setQuizAnswers(data.latestQuizAttempt?.answers ?? {});
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Lỗi khi tải bài học."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const callLessonAction = async (
    actionKey: string,
    payload: Record<string, unknown>
  ) => {
    setBusy(actionKey);
    setError(null);
    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, ...payload }),
      });
      const data = (await res.json()) as {
        detail?: LessonDetailSnapshot;
        dashboard?: DashboardSnapshot;
        score?: number;
        totalQuestions?: number;
        passed?: boolean;
        error?: string;
      };
      if (!res.ok || !data.detail) {
        throw new Error(data.error || "Không thể lưu tiến độ bài học.");
      }
      setDetail(data.detail);
      if (data.dashboard) {
        onDashboardUpdated(data.dashboard);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi xử lý bài học.");
      return null;
    } finally {
      setBusy(null);
    }
  };

  if (loading) {
    return (
      <Card tone="white" className="space-y-4 p-6 animate-pulse">
        <div className="h-6 w-48 rounded-full bg-[#ECEAE3]" />
        <div className="h-10 w-3/4 rounded-2xl bg-[#ECEAE3]" />
        <div className="h-64 rounded-2xl bg-[#F5F3EE]" />
      </Card>
    );
  }

  if (error && !detail) {
    return <ErrorState message={error} onRetry={onBackToRoadmap} />;
  }

  if (!detail) return null;

  const { lesson, content, milestones } = detail;
  const totalMilestones = 3;
  const doneMilestones =
    (milestones.theoryConfirmed ? 1 : 0) +
    (milestones.quizPassed ? 1 : 0) +
    (milestones.noteSaved ? 1 : 0);

  return (
    <section aria-label="Không gian học bài" className="space-y-4">
      {/* Top Bar & Completion Milestones */}
      <Card tone="white" className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBackToRoadmap}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#5A5B60] hover:text-[#17181C]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Quay lại Lộ trình
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="lavender">{lesson.level}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-[#6B6C72]">
              <Clock className="h-3.5 w-3.5" />~{lesson.estimatedMinutes} phút
            </span>
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
                ? "Đã hoàn thành (+25 XP)"
                : `Tiến độ: ${doneMilestones}/${totalMilestones} tiêu chí`}
            </Badge>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#5B35B5]">
            Chặng {detail.stageOrder}: {detail.stageTitle}
          </div>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#17181C]">
            Bài {detail.stageOrder}.{lesson.order}: {lesson.title}
          </h2>
          <p className="mt-1 text-xs text-[#6B6C72]">
            {lesson.englishSubtitle}
          </p>
        </div>

        {detail.isStageLocked && detail.lockReason && (
          <div className="mt-3 flex items-start gap-2 rounded-2xl border border-[#DCD9D0] bg-[#F5F3EE] p-3 text-xs text-[#5A5B60]">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{detail.lockReason}</span>
          </div>
        )}
      </Card>

      {error && (
        <div className="rounded-2xl border border-[#F0C6D5] bg-[#FAE0E9] px-4 py-2.5 text-xs font-medium text-[#7A2343]">
          {error}
        </div>
      )}

      {/* SQLBolt-style 2-Column Split Study Studio */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        {/* LEFT COLUMN: Theory & Visual Examples (Always visible while doing the exercises) */}
        <div className="min-w-0 space-y-4 lg:col-span-6">
          <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-[#E3E0D7] bg-[#F0EEE8] p-1.5">
            <button
              type="button"
              onClick={() => setRefTab("theory")}
              className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                refTab === "theory"
                  ? "bg-[#17181C] text-white"
                  : "text-[#4E4F54] hover:bg-white/75"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              <span>Lý thuyết cốt lõi</span>
            </button>
            <button
              type="button"
              onClick={() => setRefTab("examples")}
              className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                refTab === "examples"
                  ? "bg-[#17181C] text-white"
                  : "text-[#4E4F54] hover:bg-white/75"
              }`}
            >
              <Layers className="h-3.5 w-3.5 shrink-0" />
              <span>Good vs Bad &amp; Ví dụ</span>
            </button>
          </div>

          {refTab === "theory" ? (
            <div className="space-y-4">
              <Card tone="lavender" className="p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B2D8A]">
                  Mục tiêu bài học (Objectives)
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {lesson.objectives.map((obj) => (
                    <li
                      key={obj}
                      className="flex items-start gap-2 text-xs leading-relaxed text-[#211834]"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5B35B5]" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {content.theoryBlocks.map((block) => (
                <Card key={block.heading} tone="white" className="space-y-3 p-4">
                  <h3 className="text-sm font-bold text-[#17181C]">
                    {block.heading}
                  </h3>
                  <ul className="space-y-1.5">
                    {block.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2 text-xs leading-relaxed text-[#2D2E33]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#17181C]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {(block.webNote || block.mobileNote) && (
                    <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                      {block.webNote && (
                        <div className="rounded-xl border border-[#BDDCF6] bg-[#D9ECFB]/55 p-2.5 text-[11px] leading-relaxed text-[#142A3D]">
                          <strong>Web:</strong> {block.webNote}
                        </div>
                      )}
                      {block.mobileNote && (
                        <div className="rounded-xl border border-[#B6E3C3] bg-[#D4F0DC]/55 p-2.5 text-[11px] leading-relaxed text-[#133220]">
                          <strong>Mobile:</strong> {block.mobileNote}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Card tone="yellow" className="p-4">
                  <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#6B5310]">
                    <Lightbulb className="h-3.5 w-3.5" />
                    Vì sao quan trọng
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#352C10]">
                    {content.whyItMatters}
                  </p>
                </Card>

                <Card tone="white" className="p-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wide text-[#5A5B60]">
                    Khi nào dùng &amp; Giới hạn
                  </h4>
                  <ul className="mt-1.5 space-y-1 text-xs text-[#17181C]">
                    {content.whenToUse.useWhen.map((u) => (
                      <li key={u}>• Dùng khi: {u}</li>
                    ))}
                    {content.whenToUse.limitations.map((lim) => (
                      <li key={lim} className="text-[#6B6C72]">
                        • Lưu ý: {lim}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Card tone="white" className="p-4">
                <h3 className="text-sm font-bold text-[#17181C]">
                  So sánh Good vs Bad — {content.goodVsBad.scenario}
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#F0C6D5] bg-[#FAE0E9]/55 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A2343]">
                      <ThumbsDown className="h-4 w-4" />
                      Chưa tốt (Bad)
                    </div>
                    <div className="mt-1 text-xs font-bold text-[#17181C]">
                      {content.goodVsBad.badTitle}
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#4E4F54]">
                      {content.goodVsBad.badReason}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#B6E3C3] bg-[#D4F0DC]/55 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#133220]">
                      <ThumbsUp className="h-4 w-4" />
                      Chuẩn UX/UI (Good)
                    </div>
                    <div className="mt-1 text-xs font-bold text-[#17181C]">
                      {content.goodVsBad.goodTitle}
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#143321]">
                      {content.goodVsBad.goodReason}
                    </p>
                  </div>
                </div>
              </Card>

              <Card tone="white" className="p-4">
                <h3 className="text-sm font-bold text-[#17181C]">
                  Ví dụ thực tế (Real-world Examples)
                </h3>
                <div className="mt-3 space-y-2.5">
                  {content.realWorldExamples.map((ex) => (
                    <div
                      key={ex.product}
                      className="rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-3 text-xs"
                    >
                      <div className="font-bold text-[#17181C]">{ex.product}</div>
                      <div className="mt-0.5 text-[#5A5B60]">{ex.context}</div>
                      <div className="mt-1 font-medium text-[#17181C]">
                        → Bài học: {ex.takeaway}
                      </div>
                    </div>
                  ))}
                </div>

                {content.sourceLinks.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[#ECEAE3] pt-3 text-xs text-[#5A5B60]">
                    <span className="font-semibold">Nguồn:</span>
                    {content.sourceLinks.map((src) => (
                      <a
                        key={src.url}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#5B35B5] hover:underline"
                      >
                        {src.label} ({src.reviewedAt})
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Confirm Theory Button always easy to click at bottom of Left Reference */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Button
              variant={milestones.theoryConfirmed ? "pastel" : "dark"}
              disabled={busy === "confirm_theory"}
              onClick={async () => {
                await callLessonAction("confirm_theory", {
                  action: "confirm_theory",
                });
              }}
            >
              <CheckCircle2 className="h-4 w-4" />
              {milestones.theoryConfirmed
                ? "1/3 · Đã xác nhận lý thuyết ✓"
                : "1/3 · Đánh dấu đã nắm lý thuyết"}
            </Button>

            {refTab === "theory" && (
              <Button variant="white" size="sm" onClick={() => setRefTab("examples")}>
                Xem Good vs Bad
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SQL-style Interactive Practice, Knowledge Check & Notes */}
        <div className="min-w-0 space-y-4 lg:col-span-6">
          <Card tone="blue" className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-[#1A4E7A]">
                Bài tập thực hành nhanh
              </h3>
              <Button variant="white" size="sm" onClick={onOpenPracticeTab}>
                Nộp Figma Practice
              </Button>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#142A3D]">
              {content.practicalPrompt}
            </p>
          </Card>

          {/* Interactive Knowledge Check */}
          <Card tone="white" className="space-y-3.5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-[#5B35B5]" />
                <h3 className="text-sm font-bold text-[#17181C]">
                  2/3 · Knowledge Check ({content.quiz.length} câu)
                </h3>
              </div>
              {milestones.quizPassed && (
                <Badge tone="mint">Đã đạt Knowledge Check ✓</Badge>
              )}
            </div>

            {content.quiz.map((q, qIdx) => {
              const picked = quizAnswers[q.id];
              const latest = detail.latestQuizAttempt;
              const showExplanation = Boolean(latest);

              return (
                <div
                  key={q.id}
                  className="space-y-2 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-3.5"
                >
                  <div className="text-xs font-bold leading-snug text-[#17181C]">
                    Câu {qIdx + 1}: {q.question}
                  </div>
                  <div className="space-y-1.5">
                    {q.options.map((opt) => {
                      const isSelected = picked === opt.id;
                      const isCorrectOpt = opt.id === q.correctOptionId;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setQuizAnswers((prev) => ({
                              ...prev,
                              [q.id]: opt.id,
                            }))
                          }
                          className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors ${
                            isSelected
                              ? "border-[#17181C] bg-white font-semibold text-[#17181C]"
                              : "border-[#E3E0D7] bg-white/75 text-[#4E4F54] hover:border-[#BEB9AD]"
                          }`}
                        >
                          <span className="min-w-0 flex-1">{opt.text}</span>
                          {showExplanation && isCorrectOpt && (
                            <Badge tone="mint" className="shrink-0 whitespace-nowrap">
                              Đáp án đúng
                            </Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <div className="rounded-xl bg-white px-3 py-2 text-[11px] leading-relaxed text-[#4E4F54]">
                      <strong>Giải thích:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {quizResultMsg && (
              <div
                className={`rounded-2xl border p-3 text-xs font-semibold ${
                  detail.latestQuizAttempt?.passed
                    ? "border-[#B6E3C3] bg-[#D4F0DC] text-[#133220]"
                    : "border-[#F0C6D5] bg-[#FAE0E9] text-[#7A2343]"
                }`}
              >
                {quizResultMsg}
              </div>
            )}

            <Button
              variant="dark"
              size="sm"
              disabled={
                busy === "submit_quiz" ||
                Object.keys(quizAnswers).length < content.quiz.length
              }
              onClick={async () => {
                const res = await callLessonAction("submit_quiz", {
                  action: "submit_quiz",
                  answers: quizAnswers,
                });
                if (res) {
                  setQuizResultMsg(
                    res.passed
                      ? `Tuyệt vời! Bạn đúng ${res.score}/${res.totalQuestions} câu và đã vượt qua Knowledge Check.`
                      : `Bạn đúng ${res.score}/${res.totalQuestions} câu. Hãy đọc lại giải thích và thử lại nhé.`
                  );
                }
              }}
            >
              {busy === "submit_quiz" ? "Đang chấm..." : "Kiểm tra đáp án (Run Check)"}
            </Button>
          </Card>

          {/* Personal Note & Complete Lesson */}
          <Card tone="white" className="space-y-3 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-[#195734]" />
                <h3 className="text-sm font-bold text-[#17181C]">
                  3/3 · Ghi chú thực hành (+25 XP khi đủ 3/3)
                </h3>
              </div>
              {milestones.noteSaved && (
                <Badge tone="mint">Đã lưu ghi chú ✓</Badge>
              )}
            </div>

            <textarea
              rows={3}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Ghi nhanh 1 nguyên tắc bạn sẽ áp dụng (tối thiểu 5 ký tự)..."
              className="w-full rounded-2xl border border-[#DCD9D0] bg-[#FAF9F6] p-3 text-xs text-[#17181C] focus:border-[#17181C] focus:outline-none"
            />

            {noteMsg && (
              <div className="rounded-2xl border border-[#B6E3C3] bg-[#D4F0DC]/65 px-3.5 py-2 text-xs font-semibold text-[#133220]">
                {noteMsg}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2">
              <Button
                variant="dark"
                size="sm"
                disabled={busy === "save_note"}
                onClick={async () => {
                  const res = await callLessonAction("save_note", {
                    action: "save_note",
                    content: noteInput,
                  });
                  if (res) {
                    setNoteMsg(
                      res.detail?.lesson.status === "completed"
                        ? "Đã lưu ghi chú! Chúc mừng bạn đã hoàn thành đủ 3/3 tiêu chí bài học (+25 XP)."
                        : "Đã lưu ghi chú cá nhân vào SQLite."
                    );
                  }
                }}
              >
                <Save className="h-3.5 w-3.5" />
                {busy === "save_note" ? "Đang lưu..." : "Lưu ghi chú"}
              </Button>

              {detail.nextLesson && (
                <Button
                  variant="pastel"
                  size="sm"
                  onClick={() => onSelectLessonId(detail.nextLesson!.id)}
                >
                  Bài tiếp: {detail.nextLesson.title}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
