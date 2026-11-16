"use client";

import { useState } from "react";
import {
  BarChart3,
  Bell,
  BookMarked,
  Code2,
  Gamepad2,
  GitFork,
  GraduationCap,
  Home,
  Layers,
  Menu,
  Newspaper,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

export type RailSectionId =
  | "overview"
  | "roadmap"
  | "lesson"
  | "ui_to_fe"
  | "collab"
  | "test_bank"
  | "minigames"
  | "practice"
  | "hot_topics"
  | "guidelines"
  | "progress";

export interface RailFeatureItem {
  id: RailSectionId | "settings";
  label: string;
  badge?: string;
  icon: typeof Home;
  dividerAfter?: boolean;
}

export const RAIL_ITEMS: RailFeatureItem[] = [
  { id: "overview", label: "Tổng quan", icon: Home },
  { id: "roadmap", label: "Lộ trình học", icon: GitFork },
  {
    id: "lesson",
    label: "Bài học trọng tâm",
    icon: GraduationCap,
    dividerAfter: true,
  },
  { id: "minigames", label: "Mini-Game & Quiz", icon: Gamepad2 },
  { id: "test_bank", label: "500 Bài Test", badge: "500", icon: ShieldCheck },
  { id: "practice", label: "Nộp bài Rubric", icon: Layers },
  {
    id: "ui_to_fe",
    label: "UI → FE Code",
    badge: "4",
    icon: Code2,
  },
  {
    id: "collab",
    label: "Phối hợp BA & Dev",
    badge: "5",
    icon: Users,
    dividerAfter: true,
  },
  { id: "hot_topics", label: "TOPIC: NEW & HOT", badge: "NEW", icon: Newspaper },
  {
    id: "guidelines",
    label: "Kho Guideline",
    icon: BookMarked,
  },
  {
    id: "progress",
    label: "Theo dõi & Đánh giá",
    icon: BarChart3,
    dividerAfter: true,
  },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

interface LeftFeatureRailProps {
  activeId: RailSectionId;
  pendingTaskCount: number;
  rightPanelOpen: boolean;
  onSelect: (id: RailSectionId) => void;
  onOpenSettings: () => void;
  onToggleRightPanel: () => void;
}

export function LeftFeatureRail({
  activeId,
  pendingTaskCount,
  rightPanelOpen,
  onSelect,
  onOpenSettings,
  onToggleRightPanel,
}: LeftFeatureRailProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      aria-label="Thanh tính năng bên trái"
      className={`hidden shrink-0 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:sticky md:top-4 md:flex md:max-h-[calc(100vh-2rem)] md:flex-col md:items-start md:gap-3 md:overflow-y-auto md:pb-2 ${
        expanded ? "md:w-[200px] lg:w-[212px]" : "md:w-[54px]"
      }`}
    >
      <div className="flex w-full flex-col items-start gap-3">
        {/* Top Circular Toggle Button */}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={expanded ? "Thu gọn thanh tính năng" : "Mở rộng tên tính năng"}
          title={expanded ? "Thu gọn chỉ còn icon" : "Mở rộng hiển thị tên mục"}
          className="ml-[5px] flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#E3E0D7] bg-white text-[#17181C] shadow-[0_2px_8px_rgba(18,19,22,0.05)] transition-colors hover:bg-[#FAF9F5]"
        >
          {expanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {/* Floating White Vertical Pill Container */}
        <nav
          aria-label="Danh mục chức năng"
          className={`flex w-full flex-col gap-1 overflow-hidden border border-[#E3E0D7] bg-white p-1.5 shadow-[0_4px_16px_rgba(18,19,22,0.05)] transition-[border-radius] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded ? "rounded-[24px]" : "rounded-[27px]"
          }`}
        >
          {RAIL_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeId;

            return (
              <div key={item.id} className="w-full">
                <button
                  type="button"
                  onClick={() => {
                    if (item.id === "settings") {
                      onOpenSettings();
                    } else {
                      onSelect(item.id);
                    }
                  }}
                  title={item.label}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex h-10 w-full cursor-pointer items-center justify-between rounded-full px-[11px] text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-[#17181C] text-white shadow-xs"
                      : "text-[#5A5B60] hover:bg-[#F5F3EE] hover:text-[#17181C]"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span
                      className={`whitespace-nowrap transition-opacity duration-200 ${
                        expanded
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>

                  {item.badge && (
                    <span
                      className={`ml-1.5 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-opacity duration-200 ${
                        expanded
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      } ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#EFE6FD] text-[#4B2D8A]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>

                {item.dividerAfter && (
                  <div className="mx-2 my-1 h-px bg-[#ECEAE3]" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Standalone Circular Bell / Today Quick Toggle */}
        <button
          type="button"
          onClick={onToggleRightPanel}
          aria-label={rightPanelOpen ? "Thu gọn thanh Hôm nay" : "Mở thanh Hôm nay"}
          title={
            rightPanelOpen
              ? `Đang mở thanh Hôm nay (${pendingTaskCount} việc) — nhấn để thu gọn`
              : `Mở thanh Hôm nay (${pendingTaskCount} việc cần làm)`
          }
          className={`relative ml-[5px] flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-[0_2px_8px_rgba(18,19,22,0.05)] transition-colors ${
            rightPanelOpen
              ? "border-[#17181C] bg-[#17181C] text-white"
              : "border-[#E3E0D7] bg-white text-[#17181C] hover:bg-[#FAF9F5]"
          }`}
        >
          <Bell className="h-4 w-4" />
          {pendingTaskCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E11D48] px-1 text-[9px] font-extrabold text-white">
              {pendingTaskCount}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
