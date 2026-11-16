"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Home,
  LogIn,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { ProgressRing } from "@/components/ui/ProgressBar";
import type { AuthUser } from "@/lib/services/auth";
import type { GamificationSummary } from "@/types/learning";
import { RAIL_ITEMS, type RailSectionId } from "./LeftFeatureRail";

export interface NavItem {
  id: string;
  label: string;
  phase: string;
  status: "ready" | "upcoming" | "settings";
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "overview",
    label: "Tổng quan",
    phase: "Tổng quan",
    status: "ready",
    description: "Tổng quan tiến độ và lộ trình 5 bước.",
  },
];

interface TopNavProps {
  activeSection: RailSectionId;
  activeSectionLabel: string;
  gamification: GamificationSummary;
  authUser: AuthUser | null;
  onSelectSection: (id: RailSectionId) => void;
  onOpenSettings: () => void;
  onLogout: () => Promise<void>;
}

export function MeowAvatar({ size = 34 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white p-0.5 shadow-inner"
      aria-hidden="true"
    >
      <img
        src="/meow-avatar.png"
        alt=""
        width={size}
        height={size}
        className="h-full w-full rounded-full object-cover"
      />
    </div>
  );
}

export const ManaeAvatar = MeowAvatar;

export function TopNav({
  activeSection,
  activeSectionLabel,
  gamification,
  authUser,
  onSelectSection,
  onOpenSettings,
  onLogout,
}: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative bg-[#121316] text-white">
      <div className="mx-auto flex h-16 max-w-[1520px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Clean Left Brand + Active Workspace Pill */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectSection("overview")}
            className="flex shrink-0 cursor-pointer items-center gap-2.5 text-left"
          >
            <MeowAvatar size={34} />
            <span className="text-lg font-bold tracking-tight text-white">
              MeowProduct
            </span>
          </button>

          <span className="hidden items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/85 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
            <span>{activeSectionLabel}</span>
          </span>
        </div>

        {/* Right Status Only (No cluttered horizontal center links) */}
        <div className="flex shrink-0 items-center gap-2.5">
          {gamification.enabled ? (
            <>
              <div
                className="flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/90"
                title="Chuỗi ngày học liên tiếp"
              >
                <Flame
                  className={`h-3.5 w-3.5 ${
                    gamification.streakDays > 0
                      ? "text-[#FBBF24]"
                      : "text-[#9A9B9E]"
                  }`}
                />
                <span>{gamification.streakDays}</span>
              </div>

              <button
                type="button"
                onClick={onOpenSettings}
                className="hidden cursor-pointer items-center gap-2 rounded-full bg-white/8 py-1 pl-2 pr-3 text-left transition-colors hover:bg-white/12 sm:flex"
                title="Tùy chỉnh mục tiêu XP"
              >
                <ProgressRing
                  value={gamification.todayXp}
                  max={gamification.dailyGoalXp}
                  size={22}
                />
                <div className="leading-tight">
                  <div className="text-[11px] font-bold text-white">
                    Cấp {gamification.level}
                  </div>
                  <div className="text-[10px] text-[#A4A6AB]">
                    {gamification.todayXp}/{gamification.dailyGoalXp} XP
                  </div>
                </div>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onOpenSettings}
              className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 hover:bg-white/15 sm:flex"
            >
              Chế độ tập trung
            </button>
          )}

          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Cài đặt học tập"
            title="Cài đặt"
            className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/8 text-white/85 transition-colors hover:bg-white/15 sm:flex"
          >
            <Settings className="h-4 w-4" />
          </button>

          {authUser ? (
            <div className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/8 py-1 pl-2.5 pr-1 sm:flex">
              <User className="h-3.5 w-3.5 text-[#E6DAFB]" />
              <span className="max-w-[110px] truncate text-xs font-semibold text-white">
                {authUser.displayName}
              </span>
              <button
                type="button"
                onClick={() => void onLogout()}
                aria-label="Đăng xuất"
                title="Đăng xuất khỏi tài khoản"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/18 sm:inline-flex"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Đăng nhập</span>
            </Link>
          )}

          {/* Mobile Drawer Trigger (hidden on md+ because LeftFeatureRail handles navigation) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu điều hướng"}
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#18191D] px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-2">
            {RAIL_ITEMS.map((item) => {
              const Icon = item.icon ?? Home;
              const isActive = item.id === activeSection;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.id === "settings") {
                      onOpenSettings();
                    } else {
                      onSelectSection(item.id);
                    }
                  }}
                  className={`flex cursor-pointer items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#E6DAFB] text-[#17181C]"
                      : "bg-white/6 text-white/85 hover:bg-white/12"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-2.5 flex max-w-[1440px] items-center justify-between gap-2 border-t border-white/10 pt-2.5">
            {authUser ? (
              <>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90">
                  <User className="h-3.5 w-3.5 text-[#E6DAFB]" />
                  <span>{authUser.displayName}</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    void onLogout();
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-[#121316]"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Đăng nhập / Tạo tài khoản</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
