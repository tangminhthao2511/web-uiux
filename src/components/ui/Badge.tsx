import type { ReactNode } from "react";

export type BadgeTone =
  | "neutral"
  | "lavender"
  | "blue"
  | "mint"
  | "yellow"
  | "pink"
  | "dark";

const BADGE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-[#ECEAE3] text-[#4E4F54] border-[#DCD9D0]",
  lavender: "bg-[#EFE6FD] text-[#4B2D8A] border-[#DBC9FA]",
  blue: "bg-[#E4F2FD] text-[#1A4E7A] border-[#C5E2FA]",
  mint: "bg-[#DFF5E5] text-[#195734] border-[#BEE7C9]",
  yellow: "bg-[#FCF5DA] text-[#6B5310] border-[#EFE2AC]",
  pink: "bg-[#FCE9F0] text-[#7A2343] border-[#F4CEDC]",
  dark: "bg-[#17181C] text-white border-[#17181C]",
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
  wrap?: boolean;
}

export function Badge({
  tone = "neutral",
  children,
  className = "",
  wrap = false,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5 ${
        wrap ? "whitespace-normal text-left" : "whitespace-nowrap"
      } ${BADGE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
