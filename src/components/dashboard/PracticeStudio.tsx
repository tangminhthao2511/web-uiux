"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  CheckCircle2,
  ExternalLink,
  ImagePlus,
  Layers,
  Send,
  Sparkles,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { DashboardSnapshot } from "@/types/learning";

interface PracticeStudioProps {
  briefs: DashboardSnapshot["practiceBriefs"];
  submissions: DashboardSnapshot["submissions"];
  aiMentorConfigured: boolean;
  busy: boolean;
  onSubmitPractice: (input: {
    briefId: string;
    figmaUrl?: string;
    imageDataUrl?: string;
    rationale: string;
    selfScores: Record<string, number>;
  }) => Promise<{ aiNote: string } | null>;
}

export function PracticeStudio({
  briefs,
  submissions,
  aiMentorConfigured,
  busy,
  onSubmitPractice,
}: PracticeStudioProps) {
  const [selectedBriefId, setSelectedBriefId] = useState(briefs[0]?.id ?? "");
  const activeBrief =
    briefs.find((b) => b.id === selectedBriefId) ?? briefs[0];

  const [figmaUrl, setFigmaUrl] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [rationale, setRationale] = useState("");
  const [selfScores, setSelfScores] = useState<Record<string, number>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitNote, setSubmitNote] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setFormError("Chỉ hỗ trợ ảnh PNG, JPG hoặc WebP.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFormError("Vui lòng chọn ảnh dung lượng dưới 2MB.");
      return;
    }
    setFormError(null);
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!activeBrief) return;
    if (!figmaUrl.trim() && !imageDataUrl) {
      setFormError("Vui lòng tải lên ít nhất 1 ảnh chụp UI hoặc dán link Figma.");
      return;
    }
    if (rationale.trim().length < 15) {
      setFormError("Vui lòng giải trình quyết định thiết kế ít nhất 15 ký tự.");
      return;
    }
    setFormError(null);
    setSubmitNote(null);

    const scoresPayload: Record<string, number> = {};
    for (const c of activeBrief.rubric) {
      scoresPayload[c.id] = selfScores[c.id] ?? 3;
    }

    const res = await onSubmitPractice({
      briefId: activeBrief.id,
      figmaUrl: figmaUrl.trim() || undefined,
      imageDataUrl: imageDataUrl || undefined,
      rationale: rationale.trim(),
      selfScores: scoresPayload,
    });

    if (res) {
      setSubmitNote(res.aiNote);
      setFigmaUrl("");
      setImageDataUrl("");
      setImageName("");
      setRationale("");
    }
  };

  const briefSubmissions = submissions.filter(
    (s) => s.briefId === activeBrief?.id
  );

  if (!activeBrief) return null;

  return (
    <Card tone="white" className="p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEAE3] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#D9ECFB] text-[#1A4E7A]">
            <Layers className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-bold text-[#17181C]">
              Nộp bài Thực hành &amp; Đánh giá Rubric (Junior)
            </h2>
            <p className="text-xs text-[#5A5B60]">
              Làm thật, nộp ảnh hoặc link Figma kèm lập luận để nâng cấp kỹ năng.
            </p>
          </div>
        </div>

        <Badge tone={aiMentorConfigured ? "mint" : "neutral"} wrap>
          {aiMentorConfigured
            ? "AI Mentor: Đã kết nối"
            : "AI Mentor: Tự chấm Rubric (Chưa bật API key)"}
        </Badge>
      </div>

      {/* Brief Picker Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {briefs.map((brief) => {
          const active = brief.id === activeBrief.id;
          return (
            <button
              key={brief.id}
              type="button"
              onClick={() => {
                setSelectedBriefId(brief.id);
                setFormError(null);
                setSubmitNote(null);
              }}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "border-[#17181C] bg-[#17181C] text-white"
                  : "border-[#DFDCD3] bg-[#FAF9F6] text-[#4E4F54] hover:border-[#BEB9AD]"
              }`}
            >
              {brief.platform} · {brief.title.split(":")[0]}
            </button>
          );
        })}
      </div>

      {/* Concise Brief Details */}
      <div className="mt-4 rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blue">{activeBrief.platform}</Badge>
          <Badge tone="lavender">{activeBrief.level}</Badge>
          <span className="text-xs text-[#6B6C72]">
            ~{activeBrief.estimatedMinutes} phút
          </span>
        </div>
        <h3 className="mt-2 text-sm font-bold text-[#17181C]">
          {activeBrief.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#4E4F54]">
          {activeBrief.goal}
        </p>
        <ul className="mt-2.5 space-y-1 text-xs text-[#17181C]">
          {activeBrief.requirements.map((req) => (
            <li key={req} className="flex items-start gap-1.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A4E7A]" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="practice-image"
              className="mb-1 block text-xs font-semibold text-[#17181C]"
            >
              Tải ảnh màn hình (PNG/JPG/WebP)
            </label>
            <label
              htmlFor="practice-image"
              className="flex cursor-pointer items-center justify-between gap-2 rounded-2xl border border-dashed border-[#BEB9AD] bg-[#FAF9F6] px-3.5 py-2.5 text-xs text-[#4E4F54] hover:border-[#17181C]"
            >
              <span className="flex items-center gap-2 truncate">
                <ImagePlus className="h-4 w-4 shrink-0 text-[#5B35B5]" />
                <span className="truncate">
                  {imageName || "Chọn ảnh từ máy (< 2MB)..."}
                </span>
              </span>
              <Upload className="h-3.5 w-3.5 shrink-0" />
            </label>
            <input
              id="practice-image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="sr-only"
            />
          </div>

          <div>
            <label
              htmlFor="practice-figma"
              className="mb-1 block text-xs font-semibold text-[#17181C]"
            >
              Link Figma Frame / Prototype
            </label>
            <input
              id="practice-figma"
              type="url"
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
              placeholder="https://www.figma.com/design/..."
              className="w-full rounded-2xl border border-[#DCD9D0] bg-white px-3.5 py-2.5 text-xs text-[#17181C] focus:border-[#17181C] focus:outline-none"
            />
          </div>
        </div>

        {imageDataUrl && (
          <div className="overflow-hidden rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-2">
            <img
              src={imageDataUrl}
              alt="Xem trước bài thiết kế tải lên"
              className="max-h-48 w-full rounded-xl object-contain"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="practice-rationale"
            className="mb-1 block text-xs font-semibold text-[#17181C]"
          >
            Giải trình quyết định UI/UX (2–3 câu ngắn) *
          </label>
          <textarea
            id="practice-rationale"
            rows={2}
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="VD: Em đặt nút CTA chính ở cạnh dưới cao 48px để dễ bấm bằng ngón cái, tách nhóm giá và nút bằng khoảng cách 16px..."
            className="w-full rounded-2xl border border-[#DCD9D0] bg-white px-3.5 py-2.5 text-xs text-[#17181C] focus:border-[#17181C] focus:outline-none"
          />
        </div>

        {/* Interactive Rubric Self-Audit */}
        <div className="rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-4">
          <div className="mb-2.5 text-xs font-bold text-[#17181C]">
            Tự chấm theo Rubric trước khi nộp (1 = Yếu → 5 = Chuẩn Junior)
          </div>
          <div className="space-y-2.5">
            {activeBrief.rubric.map((criterion) => {
              const score = selfScores[criterion.id] ?? 3;
              return (
                <div
                  key={criterion.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[#17181C]">
                      {criterion.name}
                    </div>
                    <div className="text-[11px] text-[#6B6C72]">
                      {criterion.description}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() =>
                          setSelfScores((prev) => ({
                            ...prev,
                            [criterion.id]: n,
                          }))
                        }
                        className={`h-7 w-7 cursor-pointer rounded-full text-xs font-bold transition-colors ${
                          score === n
                            ? "bg-[#17181C] text-white"
                            : "bg-[#ECEAE3] text-[#4E4F54] hover:bg-[#DFDCD3]"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {formError && (
          <p className="text-xs font-medium text-[#B91C1C]">{formError}</p>
        )}

        {submitNote && (
          <div className="rounded-2xl border border-[#B6E3C3] bg-[#D4F0DC]/65 p-3 text-xs font-medium text-[#133220]">
            <CheckCircle2 className="mr-1.5 inline h-4 w-4" />
            {submitNote}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="dark" disabled={busy}>
            <Send className="h-3.5 w-3.5" />
            {busy ? "Đang lưu & đánh giá..." : "Nộp bài & Lưu đánh giá (+30 XP)"}
          </Button>
        </div>
      </form>

      {/* Submission History */}
      {briefSubmissions.length > 0 && (
        <div className="mt-5 border-t border-[#ECEAE3] pt-4">
          <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#5A5B60]">
            Lịch sử bài đã nộp ({briefSubmissions.length})
          </h4>
          <div className="space-y-3">
            {briefSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-3.5 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge
                    tone={sub.status === "reviewed" ? "mint" : "lavender"}
                  >
                    {sub.status === "reviewed"
                      ? `Đã chấm bởi ${sub.aiReview?.provider ?? "AI Mentor"}`
                      : "Đã lưu & Tự chấm Rubric"}
                  </Badge>
                  <span className="text-[11px] text-[#6B6C72]">
                    {new Date(sub.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>

                <p className="mt-2 text-[#17181C]">{sub.rationale}</p>

                {sub.figmaUrl && (
                  <a
                    href={sub.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 font-semibold text-[#5B35B5] hover:underline"
                  >
                    Mở link Figma đã nộp
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                {sub.imageDataUrl && (
                  <img
                    src={sub.imageDataUrl}
                    alt="Ảnh bài nộp"
                    className="mt-2 max-h-36 rounded-xl border border-[#E3E0D7] object-contain"
                  />
                )}

                {sub.aiReview && (
                  <div className="mt-2.5 rounded-xl border border-[#B6E3C3] bg-white p-3">
                    <div className="flex items-center gap-1.5 font-bold text-[#133220]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Nhận xét AI Mentor
                    </div>
                    <p className="mt-1 text-[#4E4F54]">
                      {sub.aiReview.summary}
                    </p>
                    {sub.aiReview.findings.map((f, idx) => (
                      <div
                        key={idx}
                        className="mt-2 border-t border-[#ECEAE3] pt-1.5"
                      >
                        <strong>
                          {f.criterion} ({f.score}/5):
                        </strong>{" "}
                        {f.issue} → <em>{f.suggestion}</em>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
