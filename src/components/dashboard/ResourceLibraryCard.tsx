"use client";

import { useState, type FormEvent } from "react";
import {
  BookMarked,
  CalendarCheck,
  ExternalLink,
  Figma,
  Globe,
  Layers,
  Plus,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/StateView";
import type { LearningResource, ResourceTrack } from "@/types/learning";

interface ResourceLibraryCardProps {
  resources: LearningResource[];
  busyAction: string | null;
  onAddResource: (input: {
    title: string;
    track: ResourceTrack;
    summary: string;
    keyPointsText?: string;
    sourceName?: string;
    sourceUrl?: string;
  }) => Promise<boolean>;
}

const TRACK_META: Record<
  ResourceTrack,
  { label: string; tone: BadgeTone; icon: typeof Layers }
> = {
  ux_core: { label: "UX Core", tone: "lavender", icon: Layers },
  web: { label: "Web Guideline", tone: "blue", icon: Globe },
  mobile: { label: "Mobile (iOS / M3)", tone: "mint", icon: Smartphone },
  figma: { label: "Figma", tone: "yellow", icon: Figma },
  personal: { label: "Cá nhân", tone: "pink", icon: Sparkles },
};

export function ResourceLibraryCard({
  resources,
  busyAction,
  onAddResource,
}: ResourceLibraryCardProps) {
  const [selectedTrack, setSelectedTrack] = useState<"all" | ResourceTrack>(
    "all"
  );
  const [readingResource, setReadingResource] =
    useState<LearningResource | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [track, setTrack] = useState<ResourceTrack>("web");
  const [summary, setSummary] = useState("");
  const [keyPointsText, setKeyPointsText] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const filtered =
    selectedTrack === "all"
      ? resources
      : resources.filter((r) => r.track === selectedTrack);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (title.trim().length < 3) {
      setFormError("Vui lòng nhập tiêu đề ít nhất 3 ký tự.");
      return;
    }
    if (summary.trim().length < 5) {
      setFormError("Vui lòng nhập tóm tắt nội dung ít nhất 5 ký tự.");
      return;
    }
    setFormError(null);

    const ok = await onAddResource({
      title,
      track,
      summary,
      keyPointsText,
      sourceName,
      sourceUrl,
    });
    if (ok) {
      setTitle("");
      setSummary("");
      setKeyPointsText("");
      setSourceName("");
      setSourceUrl("");
      setAddModalOpen(false);
    }
  };

  return (
    <section aria-label="Thư viện tài liệu và guideline UI/UX">
      <Card tone="white" className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ECEAE3] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="flex items-center gap-2 text-base font-bold text-[#17181C]">
                <BookMarked className="h-4 w-4 text-[#5B35B5]" />
                Tài liệu & Guideline chuẩn (UX Core · Web · Mobile)
              </h2>
              <Badge tone="lavender">{resources.length} tài liệu</Badge>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#5A5B60]">
              Tổng hợp từ NN/g, Apple HIG, Material Design 3, W3C WCAG 2.2 và
              Figma Docs có dẫn link gốc &amp; ngày rà soát. Bạn có thể đọc ngay
              hoặc tự nhập thêm tài liệu riêng.
            </p>
          </div>

          <Button
            variant="dark"
            size="sm"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            Nhập tài liệu
          </Button>
        </div>

        {/* Track Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedTrack("all")}
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              selectedTrack === "all"
                ? "border-[#17181C] bg-[#17181C] text-white"
                : "border-[#DFDCD3] bg-[#FAF9F6] text-[#5A5B60] hover:text-[#17181C]"
            }`}
          >
            Tất cả ({resources.length})
          </button>

          {(Object.keys(TRACK_META) as ResourceTrack[]).map((key) => {
            const meta = TRACK_META[key];
            const Icon = meta.icon;
            const count = resources.filter((r) => r.track === key).length;
            const active = selectedTrack === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedTrack(key)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "border-[#17181C] bg-[#17181C] text-white"
                    : "border-[#DFDCD3] bg-[#FAF9F6] text-[#5A5B60] hover:text-[#17181C]"
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>
                  {meta.label} ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Resource Grid */}
        {filtered.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Chưa có tài liệu trong nhóm này"
              description="Bạn có thể bấm nút 'Nhập tài liệu' ở góc trên để thêm ghi chú hoặc đường dẫn tài liệu của riêng mình."
            />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((res) => {
              const meta = TRACK_META[res.track];
              return (
                <div
                  key={res.id}
                  className="flex flex-col justify-between rounded-[18px] border border-[#E3E0D7] bg-[#FAF9F6] p-4 transition-colors hover:border-[#BEB9AD]"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                      <span className="text-[11px] text-[#6B6C72]">
                        Chặng {res.stageOrder} · {res.level}
                      </span>
                    </div>

                    <h3 className="mt-2 text-sm font-bold leading-snug text-[#17181C]">
                      {res.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#5A5B60]">
                      {res.summary}
                    </p>
                  </div>

                  <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-[#ECEAE3] pt-3">
                    <span className="truncate text-[11px] font-medium text-[#6B6C72]">
                      Nguồn: {res.sourceName}
                    </span>
                    <Button
                      variant="white"
                      size="sm"
                      onClick={() => setReadingResource(res)}
                    >
                      Đọc tài liệu
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Reader Modal */}
      <Modal
        open={Boolean(readingResource)}
        onClose={() => setReadingResource(null)}
        title={readingResource?.title ?? ""}
        subtitle={
          readingResource
            ? `${TRACK_META[readingResource.track].label} · Chặng ${readingResource.stageOrder} · ${readingResource.level}`
            : undefined
        }
      >
        {readingResource && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-[#17181C]">
              {readingResource.summary}
            </p>

            <div className="rounded-2xl border border-[#E3E0D7] bg-white p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A5B60]">
                Điểm cốt lõi cần nắm
              </h3>
              <ul className="mt-2.5 space-y-2">
                {readingResource.keyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm leading-relaxed text-[#17181C]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5B35B5]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {readingResource.webVsMobileNote && (
              <div className="rounded-2xl border border-[#BDDCF6] bg-[#D9ECFB]/65 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A4E7A]">
                  So sánh Web vs Mobile Guideline
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#142A3D]">
                  {readingResource.webVsMobileNote}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E3E0D7] bg-[#F5F3EE] px-4 py-3 text-xs text-[#5A5B60]">
              <span className="inline-flex items-center gap-1.5">
                <CalendarCheck className="h-3.5 w-3.5" />
                Nguồn: <strong>{readingResource.sourceName}</strong> · Rà soát:{" "}
                {readingResource.reviewedAt}
              </span>

              {readingResource.sourceUrl && (
                <a
                  href={readingResource.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#17181C] underline-offset-2 hover:underline"
                >
                  Mở tài liệu gốc
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Add Custom Resource Modal */}
      <Modal
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setFormError(null);
        }}
        title="Nhập tài liệu học tập hoặc ghi chú UI/UX"
        subtitle="Lưu trực tiếp vào kho tài liệu cá nhân của bạn trên MeowProduct"
        maxWidthClass="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label
              htmlFor="res-title"
              className="mb-1 block text-xs font-semibold text-[#17181C]"
            >
              Tiêu đề tài liệu *
            </label>
            <input
              id="res-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Nguyên tắc thiết kế Form trên Mobile"
              className="w-full rounded-xl border border-[#DCD9D0] bg-white px-3 py-2 text-sm text-[#17181C] focus:border-[#17181C] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="res-track"
                className="mb-1 block text-xs font-semibold text-[#17181C]"
              >
                Phân loại Guideline
              </label>
              <select
                id="res-track"
                value={track}
                onChange={(e) => setTrack(e.target.value as ResourceTrack)}
                className="w-full rounded-xl border border-[#DCD9D0] bg-white px-3 py-2 text-sm text-[#17181C]"
              >
                <option value="ux_core">UX Core (Chung)</option>
                <option value="web">Web Guideline</option>
                <option value="mobile">Mobile (iOS / Android)</option>
                <option value="figma">Figma &amp; Design System</option>
                <option value="personal">Ghi chú cá nhân</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="res-source"
                className="mb-1 block text-xs font-semibold text-[#17181C]"
              >
                Tên nguồn (tùy chọn)
              </label>
              <input
                id="res-source"
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="VD: Baymard, Apple HIG..."
                className="w-full rounded-xl border border-[#DCD9D0] bg-white px-3 py-2 text-sm text-[#17181C] focus:border-[#17181C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="res-summary"
              className="mb-1 block text-xs font-semibold text-[#17181C]"
            >
              Tóm tắt nội dung *
            </label>
            <textarea
              id="res-summary"
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Nội dung chính của tài liệu này là gì?"
              className="w-full rounded-xl border border-[#DCD9D0] bg-white px-3 py-2 text-sm text-[#17181C] focus:border-[#17181C] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="res-points"
              className="mb-1 block text-xs font-semibold text-[#17181C]"
            >
              Các ý chính (mỗi dòng 1 ý, tùy chọn)
            </label>
            <textarea
              id="res-points"
              rows={3}
              value={keyPointsText}
              onChange={(e) => setKeyPointsText(e.target.value)}
              placeholder={"Ý 1...\nÝ 2...\nÝ 3..."}
              className="w-full rounded-xl border border-[#DCD9D0] bg-white px-3 py-2 text-sm text-[#17181C] focus:border-[#17181C] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="res-url"
              className="mb-1 block text-xs font-semibold text-[#17181C]"
            >
              Link tài liệu gốc (tùy chọn)
            </label>
            <input
              id="res-url"
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-[#DCD9D0] bg-white px-3 py-2 text-sm text-[#17181C] focus:border-[#17181C] focus:outline-none"
            />
          </div>

          {formError && (
            <p className="text-xs font-medium text-[#B91C1C]">{formError}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setAddModalOpen(false);
                setFormError(null);
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="dark"
              disabled={busyAction === "add_resource"}
            >
              Lưu vào thư viện
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
