import type { HTMLAttributes, ReactNode } from "react";

export type CardTone =
  | "white"
  | "panel"
  | "muted"
  | "lavender"
  | "blue"
  | "mint"
  | "yellow"
  | "pink";

const TONE_CLASSES: Record<CardTone, string> = {
  white: "bg-white border-[#E3E0D7] text-[#17181C]",
  panel: "bg-[#F0EEE8] border-[#E3E0D7] text-[#17181C]",
  muted: "bg-[#ECEAE3] border-[#DCD9D0] text-[#17181C]",
  lavender: "bg-[#E6DAFB] border-[#D5C2F6] text-[#211834]",
  blue: "bg-[#D9ECFB] border-[#BDDCF6] text-[#142A3D]",
  mint: "bg-[#D4F0DC] border-[#B6E3C3] text-[#133220]",
  yellow: "bg-[#FAF0CA] border-[#EADCA8] text-[#352C10]",
  pink: "bg-[#FAE0E9] border-[#F0C6D5] text-[#391623]",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  children: ReactNode;
}

export function Card({
  tone = "white",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border shadow-[0_2px_10px_rgba(18,19,22,0.03)] ${TONE_CLASSES[tone]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
