"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Flame,
  RefreshCw,
  Rss,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type {
  HotTopic,
  HotTopicBadge,
  HotTopicPlatform,
} from "@/types/learning";

interface HotTopicsCardProps {
  topics: HotTopic[];
  syncing: boolean;
  syncMessage: string | null;
  onSyncTopics: () => Promise<void>;
}

const PLATFORMS: { id: HotTopicPlatform | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "Figma", label: "Figma" },
  { id: "Mobile", label: "Mobile (iOS/M3)" },
  { id: "Web", label: "Web & WCAG" },
  { id: "AI & Workflow", label: "AI UX" },
  { id: "UX Core", label: "UX Core" },
];

const BADGE_TONE: Record<HotTopicBadge, "pink" | "lavender" | "blue"> = {
  HOT: "pink",
  NEW: "lavender",
  GUIDELINE: "blue",
};

export function HotTopicsCard({
  topics,
  syncing,
  syncMessage,
  onSyncTopics,
}: HotTopicsCardProps) {
  const [platform, setPlatform] = useState<HotTopicPlatform | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(
    topics[0]?.id ?? null
  );

  const filteredTopics =
    platform === "all"
      ? topics
      : topics.filter((topic) => topic.platform === platform);

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#F5B4AD] bg-[#FFE8E5] px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-[#7A231B]">
              <Flame className="h-3.5 w-3.5" />
              TOPIC: NEW & HOT
            </span>
            <Badge tone="mint">{topics.length} chủ đề đã cập nhật</Badge>
          </div>
          <h2 className="mt-2 text-lg font-bold tracking-tight text-[#17181C]">
            Cập nhật UI/UX & Design System mới nhất
          </h2>
          <p className="mt-0.5 text-xs text-[#6B6C72]">
            Tóm tắt ngắn gọn để đọc nhanh trên web (Figma Config, Material 3
            Expressive, Apple Liquid Glass, WCAG 2.2) + đồng bộ RSS thực.
          </p>
        </div>

        <Button
          type="button"
          variant="dark"
          size="sm"
          disabled={syncing}
          onClick={() => void onSyncTopics()}
          className="inline-flex items-center gap-1.5"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`}
          />
          <span>
            {syncing ? "Đang quét RSS..." : "Cập nhật bài mới (RSS)"}
          </span>
        </Button>
      </div>

      {syncMessage && (
        <div
          role="status"
          className="mt-3 flex items-start gap-2 rounded-2xl border border-[#BDDCF6] bg-[#EDF6FD] px-3.5 py-2.5 text-xs text-[#1A4E7A]"
        >
          <Rss className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Platform filters */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {PLATFORMS.map((item) => {
          const active = platform === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPlatform(item.id)}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                active
                  ? "bg-[#17181C] text-white"
                  : "border border-[#E3E0D7] bg-[#F7F6F2] text-[#4E4F54] hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Topic cards */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredTopics.map((topic) => {
          const isOpen = expandedId === topic.id;
          return (
            <article
              key={topic.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E3E0D7] bg-[#FAF9F5] p-4 transition-colors hover:border-[#CBC6B9]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge tone={BADGE_TONE[topic.badge]}>{topic.badge}</Badge>
                    <Badge tone="neutral">{topic.platform}</Badge>
                    {topic.isLiveFeed && (
                      <Badge tone="mint">Live RSS</Badge>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-[#6B6C72]">
                    {topic.publishedAt}
                  </span>
                </div>

                <h3 className="mt-2.5 text-sm font-bold leading-snug text-[#17181C]">
                  {topic.title}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-[#4E4F54]">
                  {topic.summary}
                </p>

                {isOpen && topic.keyTakeaways.length > 0 && (
                  <ul className="mt-3 space-y-1.5 rounded-xl border border-[#E8E5DC] bg-white p-3 text-xs text-[#2B2C32]">
                    {topic.keyTakeaways.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#17181C]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#E8E5DC] pt-2.5">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(isOpen ? null : topic.id)
                  }
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#17181C] hover:underline"
                >
                  <span>
                    {isOpen
                      ? "Thu gọn"
                      : `Xem ${topic.keyTakeaways.length} điểm chính`}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>

                <a
                  href={topic.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A4E7A] hover:underline"
                >
                  <span>{topic.sourceName}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}
