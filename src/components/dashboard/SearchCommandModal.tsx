"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lock, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import type { LessonWithProgress, StageWithProgress } from "@/types/learning";

interface SearchCommandModalProps {
  open: boolean;
  stages: StageWithProgress[];
  onClose: () => void;
  onSelectLesson: (lesson: LessonWithProgress, stage: StageWithProgress) => void;
}

export function SearchCommandModal({
  open,
  stages,
  onClose,
  onSelectLesson,
}: SearchCommandModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = stages.flatMap((stage) =>
      stage.modules.flatMap((mod) =>
        mod.lessons.map((lesson) => ({
          lesson,
          stage,
          moduleTitle: mod.title,
        }))
      )
    );

    if (!q) return items.slice(0, 10);

    return items.filter(({ lesson, stage }) => {
      const haystack = [
        lesson.title,
        lesson.englishSubtitle,
        lesson.summary,
        stage.title,
        stage.englishTitle,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, stages]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Tìm kiếm bài học & chặng lộ trình"
      subtitle="Tìm theo tên bài học tiếng Việt, thuật ngữ tiếng Anh hoặc tên chặng"
    >
      <div className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C7D82]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ví dụ: User Flow, Auto Layout, Heuristic, Figma, Funnel..."
            aria-label="Từ khóa tìm kiếm bài học"
            className="w-full rounded-2xl border border-[#DCD9D0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#17181C] placeholder:text-[#8E8F94] focus:border-[#17181C] focus:outline-none"
          />
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#DCD9D0] bg-white px-4 py-8 text-center text-sm text-[#5A5B60]">
            Không tìm thấy bài học nào khớp với &ldquo;{query}&rdquo;.
          </div>
        ) : (
          <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {results.map(({ lesson, stage }) => {
              const locked = stage.status === "locked";
              return (
                <li key={lesson.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectLesson(lesson, stage);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#E3E0D7] bg-white p-3.5 text-left transition-colors hover:border-[#17181C] hover:bg-[#FAF9F6]"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[#5A5B60]">
                        <span>
                          Chặng {stage.order} · Bài {stage.order}.
                          {lesson.order}
                        </span>
                        {locked && (
                          <span className="inline-flex items-center gap-0.5 text-[#7C7D82]">
                            <Lock className="h-3 w-3" /> Đang khóa
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 truncate text-sm font-bold text-[#17181C]">
                        {lesson.title}
                      </div>
                      <div className="truncate text-xs text-[#6B6C72]">
                        {lesson.englishSubtitle}
                      </div>
                    </div>

                    <Badge
                      tone={
                        lesson.status === "completed"
                          ? "mint"
                          : lesson.status === "in_progress"
                          ? "lavender"
                          : "neutral"
                      }
                    >
                      {lesson.status === "completed"
                        ? "Đã xong"
                        : lesson.status === "in_progress"
                        ? "Đang học"
                        : lesson.level}
                    </Badge>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  );
}
