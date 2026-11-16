import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "dark" | "white" | "outline" | "ghost" | "pastel";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  dark: "bg-[#17181C] text-white hover:bg-[#2A2C33] border border-transparent",
  white:
    "bg-white text-[#17181C] hover:bg-[#FAF9F6] border border-[#DFDCD3] shadow-[0_1px_2px_rgba(18,19,22,0.05)]",
  outline:
    "bg-transparent text-[#17181C] hover:bg-[#ECEAE3] border border-[#D4D0C6]",
  ghost: "bg-transparent text-[#5A5B60] hover:bg-[#ECEAE3] hover:text-[#17181C]",
  pastel:
    "bg-[#E6DAFB] text-[#211834] hover:bg-[#DAC9F8] border border-[#D5C2F6]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "white",
  size = "md",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
