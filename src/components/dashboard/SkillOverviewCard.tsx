import { ShieldCheck, Target } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { SkillSummary } from "@/types/learning";

interface SkillOverviewCardProps {
  skills: SkillSummary[];
  learnerBackground: string;
}

export function SkillOverviewCard({
  skills,
  learnerBackground,
}: SkillOverviewCardProps) {
  const assessedCount = skills.filter((s) => s.level > 0).length;
  const focusSkills = skills.filter((s) => s.isFocusArea);
  const otherSkills = skills.filter((s) => !s.isFocusArea);

  return (
    <section aria-label="Tổng quan năng lực kỹ năng">
      <Card tone="white" className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ECEAE3] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold text-[#17181C]">
                Tổng quan kỹ năng (Skill Overview)
              </h2>
              <Badge tone="neutral">
                {assessedCount}/{skills.length} kỹ năng có minh chứng
              </Badge>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#5A5B60]">
              Năng lực chỉ được nâng cấp dựa trên bài tập thực hành, lập luận
              UX/UI và bài kiểm tra đã nộp — không đánh giá dựa trên việc mở
              bài học.
            </p>
          </div>
          <Badge tone="lavender" wrap>
            {learnerBackground}
          </Badge>
        </div>

        {/* Priority focus areas for Marketing -> UI/UX learner */}
        <div className="mt-4">
          <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-[#17181C]">
            <Target className="h-3.5 w-3.5 shrink-0 text-[#5B35B5]" />
            <span>Nhóm kỹ năng trọng tâm cần rèn luyện</span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {focusSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E3E0D7] bg-[#FAF9F6] p-3.5"
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold leading-snug text-[#17181C]">
                        {skill.name}
                      </div>
                      <div className="text-[11px] text-[#6B6C72]">
                        {skill.englishName}
                      </div>
                    </div>
                    <Badge tone={skill.level === 0 ? "neutral" : "mint"}>
                      {skill.levelLabel}
                    </Badge>
                  </div>

                  <p className="mt-2 text-[11px] leading-relaxed text-[#5A5B60]">
                    {skill.focusReason ?? skill.evidenceSummary}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-2 pt-1 text-[11px] text-[#6B6C72]">
                  <span>Minh chứng: {skill.evidenceCount}</span>
                  <span className="shrink-0 font-medium">
                    Cấp {skill.level}/4
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining skills compact matrix */}
        <div className="mt-4 border-t border-[#ECEAE3] pt-3.5">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#5A5B60]">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span>Các nhóm kỹ năng khác trong chuẩn Junior</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {otherSkills.map((skill) => (
              <div
                key={skill.id}
                title={`${skill.name}: ${skill.evidenceSummary}`}
                className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-0.5 rounded-xl border border-[#E3E0D7] bg-[#F7F6F2] px-3 py-1.5 text-xs"
              >
                <span className="font-medium text-[#17181C]">{skill.name}</span>
                <span className="whitespace-nowrap text-[11px] text-[#6B6C72]">
                  {skill.level === 0 ? "Chưa đánh giá" : `Cấp ${skill.level}/4`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
