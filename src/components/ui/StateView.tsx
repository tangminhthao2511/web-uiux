import { AlertCircle, CheckCircle2, Inbox, RefreshCw } from "lucide-react";
import { Button } from "./Button";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Đang tải bảng điều khiển">
      <div className="h-10 w-72 rounded-full bg-[#EAE7DF]" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-8">
          <div className="h-12 w-full rounded-2xl bg-[#EAE7DF]" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-24 rounded-[20px] bg-[#DCEAF5]" />
            <div className="h-24 rounded-[20px] bg-[#D6EEDD]" />
            <div className="h-24 rounded-[20px] bg-[#ECEAE3]" />
          </div>
          <div className="h-72 rounded-[24px] bg-[#EAE7DF]" />
        </div>
        <div className="space-y-4 lg:col-span-4">
          <div className="h-96 rounded-[24px] bg-[#ECEAE3]" />
        </div>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#F0C6D5] bg-[#FAE0E9]/60 px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#9D2B52]">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-[#17181C]">
        Không thể tải dữ liệu học tập
      </h3>
      <p className="mt-1 max-w-md text-sm text-[#5A5B60]">{message}</p>
      {onRetry && (
        <Button variant="dark" className="mt-4" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          Thử tải lại
        </Button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  variant?: "neutral" | "success";
}

export function EmptyState({
  title,
  description,
  variant = "neutral",
}: EmptyStateProps) {
  const Icon = variant === "success" ? CheckCircle2 : Inbox;
  return (
    <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-[#D6D2C7] bg-white/60 px-4 py-6 text-center">
      <Icon
        className={`mb-2 h-6 w-6 ${
          variant === "success" ? "text-[#195734]" : "text-[#7C7D82]"
        }`}
      />
      <p className="text-sm font-semibold text-[#17181C]">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#5A5B60]">{description}</p>
    </div>
  );
}
