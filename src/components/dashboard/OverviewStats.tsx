import { Award } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { DashboardSnapshot, GamificationSummary } from "@/types/learning";

interface OverviewStatsProps {
  overview: DashboardSnapshot["overview"];
  gamification?: GamificationSummary;
  knowledgeMasteredCount?: number;
  knowledgeTotal?: number;
}

function resolveJuniorRank(totalXp: number, completedLessons: number): {
  title: string;
  nextHint: string;
} {
  if (totalXp >= 300 || completedLessons >= 10) {
    return {
      title: "UI-FE Hybrid Ready",
      nextHint: "Đạt ngưỡng sẵn sàng handoff & phỏng vấn Junior",
    };
  }
  if (totalXp >= 150 || completedLessons >= 5) {
    return {
      title: "Systems Builder",
      nextHint: "Đang làm chủ Design Tokens, HIG & WCAG 2.2",
    };
  }
  if (totalXp >= 50 || completedLessons >= 2) {
    return {
      title: "Layout Fixer",
      nextHint: "Đã bắt đầu có minh chứng thực hành UI/UX",
    };
  }
  return {
    title: "Pixel Apprentice",
    nextHint: "Chinh phục bài test hoặc Mini-Game đầu tiên để thăng hạng",
  };
}

export function OverviewStats({
  overview,
  gamification,
  knowledgeMasteredCount = 0,
  knowledgeTotal = 500,
}: OverviewStatsProps) {
  const rank = resolveJuniorRank(
    gamification?.totalXp ?? 0,
    overview.completedLessons
  );

  return (
    <section aria-label="Tổng quan tiến độ học tập" className="space-y-3">
      {/* Slim Rank Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E3E0D7] bg-white px-4 py-2.5 shadow-[0_1px_3px_rgba(18,19,22,0.03)]">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EFE6FD] text-[#4B2D8A]">
            <Award className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#17181C]">
              <span>Danh hiệu: {rank.title}</span>
              {gamification && (
                <span className="rounded-full bg-[#17181C] px-2 py-0.5 text-[10px] font-bold text-white">
                  {gamification.totalXp} XP
                </span>
              )}
            </div>
            <p className="truncate text-[11px] text-[#6B6C72]">{rank.nextHint}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-[#4E4F54]">
          <span>
            500 Test:{" "}
            <strong className="text-[#195734]">
              {knowledgeMasteredCount}/{knowledgeTotal}
            </strong>
          </span>
          <span className="text-[#DCD9D0]">|</span>
          <span>
            Hoàn thành:{" "}
            <strong className="text-[#17181C]">
              {overview.overallCompletionPercent}%
            </strong>
          </span>
        </div>
      </div>

      {/* Compact 4-Metric Strip */}
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        <Card tone="blue" className="p-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xl font-bold tracking-tight">
              {overview.totalLessons}
            </span>
            <span className="text-[11px] font-medium text-[#244969]">
              {overview.totalStages} chặng
            </span>
          </div>
          <div className="mt-0.5 text-xs font-semibold text-[#244969]">
            Tổng bài học
          </div>
        </Card>

        <Card tone="mint" className="p-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xl font-bold tracking-tight">
              {overview.completedLessons}
            </span>
            <span className="text-[11px] font-medium text-[#2B6644]">
              {overview.overallCompletionPercent}%
            </span>
          </div>
          <div className="mt-0.5 text-xs font-semibold text-[#184B2E]">
            Đã hoàn thành
          </div>
        </Card>

        <Card tone="muted" className="p-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xl font-bold tracking-tight text-[#17181C]">
              {overview.remainingLessons}
            </span>
            <span className="text-[11px] text-[#6B6C72]">Junior focus</span>
          </div>
          <div className="mt-0.5 text-xs font-semibold text-[#4D4E54]">
            Bài còn lại
          </div>
        </Card>

        <Card tone="lavender" className="flex flex-col justify-between p-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-xs font-bold text-[#2D2047]">
              Chặng {overview.currentStageNumber}/{overview.totalStages}
            </span>
            <span className="shrink-0 text-[11px] font-semibold text-[#4B2D8A]">
              {overview.currentStageCompletedLessons}/
              {overview.currentStageTotalLessons} bài
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar
              value={overview.currentStageCompletedLessons}
              max={overview.currentStageTotalLessons}
              colorClass="bg-[#5B35B5]"
              heightClass="h-1.5"
              ariaLabel="Tiến độ chặng hiện tại"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
