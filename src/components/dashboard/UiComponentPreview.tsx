"use client";

import {
  AlertTriangle,
  ArrowUpDown,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Filter,
  FolderOpen,
  Home,
  Minus,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  UploadCloud,
  User,
} from "lucide-react";

interface UiComponentPreviewProps {
  componentId: string;
  compact?: boolean;
}

export function UiComponentPreview({
  componentId,
  compact = false,
}: UiComponentPreviewProps) {
  const heightClass = compact ? "h-[112px]" : "h-[128px]";

  return (
    <div
      className={`relative flex w-full ${heightClass} items-center justify-center overflow-hidden rounded-xl border border-[#E5E2DA] bg-[#F7F6F2] p-3 select-none`}
    >
      {renderVisual(componentId)}
    </div>
  );
}

function renderVisual(id: string) {
  switch (id) {
    case "tooltip":
      return (
        <div className="relative flex flex-col items-center">
          <div className="relative mb-2 rounded-lg bg-[#17181C] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
            Sao chép liên kết
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#17181C]" />
          </div>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#D4D1C7] bg-white text-[#17181C] shadow-xs">
            <Copy className="h-3.5 w-3.5" />
            {/* Simulated pointer cursor */}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="absolute -right-2.5 -bottom-2.5 h-4 w-4 drop-shadow-xs"
            >
              <path
                d="M2 1.5L13 8.5L7.8 9.6L5.5 14L2 1.5Z"
                fill="#121316"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      );

    case "fab":
      return (
        <div className="relative h-full w-[160px] rounded-xl border border-[#DFDCD2] bg-white p-2.5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F1EFE9] pb-1.5">
            <span className="h-2 w-14 rounded-full bg-[#17181C]/80" />
            <span className="h-2 w-4 rounded-full bg-[#E3E0D7]" />
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="h-3 w-full rounded bg-[#F3F1EB]" />
            <div className="h-3 w-4/5 rounded bg-[#F3F1EB]" />
            <div className="h-3 w-2/3 rounded bg-[#F3F1EB]" />
          </div>
          {/* Circular Floating Button */}
          <div className="absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#4B2D8A] text-white shadow-[0_6px_14px_rgba(75,45,138,0.42)] ring-2 ring-white">
            <Plus className="h-4 w-4 stroke-[2.6]" />
          </div>
        </div>
      );

    case "snackbar":
      return (
        <div className="relative flex h-full w-full max-w-[230px] flex-col justify-between rounded-xl border border-[#E2DFD5] bg-white p-2.5">
          <div className="space-y-1.5">
            <div className="h-2.5 w-2/3 rounded bg-[#EEECE5]" />
            <div className="h-2.5 w-1/2 rounded bg-[#F4F2EC]" />
          </div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-[#17181C] px-2.5 py-1.5 text-[10px] text-white shadow-md">
            <span className="truncate font-medium text-white/90">
              Đã xóa 1 mục
            </span>
            <span className="shrink-0 font-extrabold text-[#C9B3FF]">
              Hoàn tác
            </span>
          </div>
        </div>
      );

    case "popover":
      return (
        <div className="flex items-start gap-2.5">
          <div className="inline-flex items-center gap-1 rounded-lg border border-[#17181C] bg-white px-2 py-1 text-[10px] font-bold text-[#17181C] shadow-xs">
            <Filter className="h-3 w-3" />
            <span>Bộ lọc</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="relative w-[124px] rounded-xl border border-[#DFDCD2] bg-white p-2 shadow-md">
            <span className="absolute top-2.5 -left-1.5 h-2.5 w-2.5 rotate-45 border-b border-l border-[#DFDCD2] bg-white" />
            <div className="space-y-1.5 text-[10px] font-medium text-[#17181C]">
              <div className="flex items-center gap-1.5">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-[#17181C] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>Đang hoạt động</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6B6C72]">
                <span className="h-3.5 w-3.5 rounded border border-[#CFCBC0]" />
                <span>Đã lưu trữ</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "bottom-sheet":
      return (
        <div className="relative h-full w-[148px] overflow-hidden rounded-xl border border-[#D4D1C7] bg-[#17181C]/35">
          <div className="px-2.5 pt-2 opacity-40">
            <div className="h-2 w-12 rounded bg-white/80" />
            <div className="mt-1.5 h-2 w-20 rounded bg-white/60" />
          </div>
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-3 pt-1.5 pb-2 shadow-lg">
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-[#CFCBC0]" />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold text-[#17181C]">
                <span>Chia sẻ liên kết</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#4B2D8A]" />
              </div>
              <div className="h-2 w-4/5 rounded bg-[#EFECE4]" />
              <div className="h-2 w-3/5 rounded bg-[#EFECE4]" />
            </div>
          </div>
        </div>
      );

    case "segmented-control":
      return (
        <div className="inline-flex rounded-xl border border-[#DFDCD2] bg-[#EAE7DF] p-1 shadow-inner">
          <span className="rounded-lg px-2.5 py-1 text-[10px] font-semibold text-[#6B6C72]">
            Ngày
          </span>
          <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold text-[#17181C] shadow-xs">
            Tuần
          </span>
          <span className="rounded-lg px-2.5 py-1 text-[10px] font-semibold text-[#6B6C72]">
            Tháng
          </span>
        </div>
      );

    case "breadcrumb":
      return (
        <div className="flex max-w-full flex-wrap items-center gap-1 rounded-xl border border-[#DFDCD2] bg-white px-3 py-2 text-[10px] shadow-xs">
          <span className="font-medium text-[#6B6C72] underline decoration-[#D4D1C7]">
            Trang chủ
          </span>
          <ChevronRight className="h-3 w-3 text-[#9E9FA5]" />
          <span className="font-medium text-[#6B6C72] underline decoration-[#D4D1C7]">
            Sản phẩm
          </span>
          <ChevronRight className="h-3 w-3 text-[#9E9FA5]" />
          <span className="font-bold text-[#17181C]">Áo khoác</span>
        </div>
      );

    case "accordion":
      return (
        <div className="w-full max-w-[230px] divide-y divide-[#ECEAE3] rounded-xl border border-[#DFDCD2] bg-white text-[10px] shadow-xs">
          <div className="p-2">
            <div className="flex items-center justify-between font-bold text-[#17181C]">
              <span>Chính sách đổi trả</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#5A5B60]" />
            </div>
            <p className="mt-1 text-[9px] leading-snug text-[#6B6C72]">
              Hỗ trợ đổi size miễn phí trong vòng 7 ngày kể từ khi nhận hàng.
            </p>
          </div>
          <div className="flex items-center justify-between px-2 py-1.5 font-semibold text-[#4E4F54]">
            <span>Thời gian giao hàng</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#8E8F94]" />
          </div>
        </div>
      );

    case "stepper":
      return (
        <div className="flex w-full max-w-[240px] items-center justify-between gap-1 rounded-xl border border-[#DFDCD2] bg-white px-3 py-3 shadow-xs">
          <div className="flex flex-col items-center gap-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#195734] text-[9px] font-bold text-white">
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
            <span className="text-[9px] font-bold text-[#195734]">Giỏ hàng</span>
          </div>
          <div className="mb-3 h-0.5 flex-1 bg-[#195734]" />
          <div className="flex flex-col items-center gap-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#17181C] text-[9px] font-bold text-white ring-2 ring-[#E6DAFB]">
              2
            </span>
            <span className="text-[9px] font-bold text-[#17181C]">Giao hàng</span>
          </div>
          <div className="mb-3 h-0.5 flex-1 bg-[#E3E0D7]" />
          <div className="flex flex-col items-center gap-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#CFCBC0] bg-[#FAF9F5] text-[9px] font-bold text-[#8E8F94]">
              3
            </span>
            <span className="text-[9px] font-medium text-[#8E8F94]">Thanh toán</span>
          </div>
        </div>
      );

    case "drawer":
      return (
        <div className="flex h-full w-full max-w-[230px] overflow-hidden rounded-xl border border-[#D4D1C7] bg-white shadow-xs">
          <div className="w-[92px] shrink-0 space-y-1.5 bg-[#17181C] p-2 text-white">
            <div className="mb-2 h-2 w-12 rounded bg-white/80" />
            <div className="rounded bg-white/18 px-1.5 py-1 text-[9px] font-bold">
              Tổng quan
            </div>
            <div className="px-1.5 py-0.5 text-[9px] text-white/65">Dự án</div>
            <div className="px-1.5 py-0.5 text-[9px] text-white/65">Thành viên</div>
          </div>
          <div className="flex-1 bg-[#17181C]/15 p-2.5">
            <div className="h-2.5 w-16 rounded bg-white/80" />
            <div className="mt-2 h-10 rounded-lg bg-white/75" />
          </div>
        </div>
      );

    case "pagination":
      return (
        <div className="inline-flex items-center gap-1 rounded-xl border border-[#DFDCD2] bg-white p-1.5 text-[10px] font-bold shadow-xs">
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-[#7C7D82]">
            <ChevronLeft className="h-3 w-3" />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-[#5A5B60]">
            1
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#17181C] text-white">
            2
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-[#5A5B60]">
            3
          </span>
          <span className="px-1 text-[#9E9FA5]">...</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-[#5A5B60]">
            12
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-[#17181C]">
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      );

    case "kebab-menu":
      return (
        <div className="relative flex w-full max-w-[210px] items-start justify-between rounded-xl border border-[#DFDCD2] bg-white p-2.5 shadow-xs">
          <div className="space-y-1">
            <div className="h-2.5 w-20 rounded bg-[#17181C]/80" />
            <div className="h-2 w-24 rounded bg-[#ECEAE3]" />
          </div>
          <div className="relative">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F3F1EB] text-[#17181C]">
              <MoreVertical className="h-3.5 w-3.5" />
            </div>
            <div className="mt-1 w-24 rounded-lg border border-[#DFDCD2] bg-white p-1 text-[9px] font-semibold text-[#17181C] shadow-md">
              <div className="rounded px-1.5 py-0.5 hover:bg-[#F3F1EB]">
                Chỉnh sửa
              </div>
              <div className="rounded px-1.5 py-0.5 text-[#7A2343]">Xóa mục</div>
            </div>
          </div>
        </div>
      );

    case "badge":
      return (
        <div className="flex items-center gap-4">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#DFDCD2] bg-white text-[#17181C] shadow-xs">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D92D58] px-1 text-[10px] font-extrabold text-white ring-2 ring-[#F7F6F2]">
              3
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF9EF] px-2.5 py-1 text-[10px] font-bold text-[#195734]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#195734]" />
            Đang duyệt
          </span>
        </div>
      );

    case "chip":
      return (
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#4B2D8A]/30 bg-[#F4EEFF] px-2.5 py-1 text-[10px] font-bold text-[#4B2D8A]">
            UI/UX Mobile
            <span className="font-extrabold">×</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#D4D1C7] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#17181C]">
            Figma
            <span className="text-[#8E8F94]">×</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#B7B3A8] bg-transparent px-2.5 py-1 text-[10px] font-semibold text-[#5A5B60]">
            + Thêm lọc
          </span>
        </div>
      );

    case "skeleton":
      return (
        <div className="w-full max-w-[225px] rounded-xl border border-[#DFDCD2] bg-white p-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-[#E3E0D7]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-3/4 animate-pulse rounded-full bg-[#E3E0D7]" />
              <div className="h-2 w-1/2 animate-pulse rounded-full bg-[#EFECE4]" />
            </div>
          </div>
          <div className="mt-2.5 space-y-1.5">
            <div className="h-2.5 w-full animate-pulse rounded-full bg-[#EFECE4]" />
            <div className="h-2.5 w-5/6 animate-pulse rounded-full bg-[#EFECE4]" />
          </div>
        </div>
      );

    case "empty-state":
      return (
        <div className="flex w-full max-w-[220px] flex-col items-center rounded-xl border border-dashed border-[#CFCBC0] bg-white px-3 py-2.5 text-center">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F1EB] text-[#6B6C72]">
            <FolderOpen className="h-3.5 w-3.5" />
          </span>
          <div className="mt-1 text-[10px] font-bold text-[#17181C]">
            Chưa có dự án nào
          </div>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#17181C] px-2.5 py-0.5 text-[9px] font-bold text-white">
            + Tạo mới
          </span>
        </div>
      );

    case "avatar-stack":
      return (
        <div className="flex items-center">
          <div className="flex -space-x-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D9ECFB] text-[10px] font-extrabold text-[#1A4E7A] ring-2 ring-white">
              MT
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6DAFB] text-[10px] font-extrabold text-[#4B2D8A] ring-2 ring-white">
              AL
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4F0DC] text-[10px] font-extrabold text-[#195734] ring-2 ring-white">
              KH
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17181C] text-[10px] font-extrabold text-white ring-2 ring-white">
              +5
            </span>
          </div>
        </div>
      );

    case "alert-banner":
      return (
        <div className="flex w-full max-w-[240px] items-start gap-2 rounded-xl border border-[#EADCA8] bg-[#FCF7E3] px-3 py-2 text-left">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8B6B15]" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-[#6B5310]">
              Hệ thống bảo trì lúc 23:00
            </div>
            <div className="text-[9px] text-[#7E6418]">
              Vui lòng lưu bản nháp trước giờ trên.
            </div>
          </div>
        </div>
      );

    case "modal":
      return (
        <div className="relative flex h-full w-full max-w-[225px] items-center justify-center rounded-xl bg-[#17181C]/45 p-2.5">
          <div className="w-full max-w-[175px] rounded-xl bg-white p-2.5 shadow-xl">
            <div className="text-[10px] font-extrabold text-[#17181C]">
              Xác nhận xóa file?
            </div>
            <div className="mt-0.5 text-[9px] text-[#6B6C72]">
              Thao tác này không thể hoàn tác.
            </div>
            <div className="mt-2 flex justify-end gap-1.5 text-[9px] font-bold">
              <span className="rounded-md border border-[#DFDCD2] px-2 py-0.5 text-[#5A5B60]">
                Hủy
              </span>
              <span className="rounded-md bg-[#D92D58] px-2 py-0.5 text-white">
                Xóa
              </span>
            </div>
          </div>
        </div>
      );

    case "combobox":
      return (
        <div className="w-full max-w-[200px] space-y-1">
          <div className="flex items-center gap-1.5 rounded-lg border border-[#17181C] bg-white px-2 py-1 text-[10px] text-[#17181C] shadow-xs">
            <Search className="h-3 w-3 text-[#7C7D82]" />
            <span className="font-medium">Be Viet|</span>
          </div>
          <div className="rounded-lg border border-[#DFDCD2] bg-white p-1 text-[9px] shadow-md">
            <div className="rounded bg-[#EDF6FD] px-1.5 py-0.5 font-bold text-[#1A4E7A]">
              Be Vietnam Pro
            </div>
            <div className="px-1.5 py-0.5 text-[#6B6C72]">Plus Jakarta Sans</div>
          </div>
        </div>
      );

    case "toggle-switch":
      return (
        <div className="w-full max-w-[215px] space-y-2 rounded-xl border border-[#DFDCD2] bg-white px-3 py-2 text-[10px] font-semibold text-[#17181C] shadow-xs">
          <div className="flex items-center justify-between gap-3">
            <span>Thông báo tức thì</span>
            <span className="flex h-4.5 w-8 items-center justify-end rounded-full bg-[#195734] p-0.5">
              <span className="h-3.5 w-3.5 rounded-full bg-white shadow-xs" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[#6B6C72]">
            <span>Tự động lưu</span>
            <span className="flex h-4.5 w-8 items-center justify-start rounded-full bg-[#D8D5CC] p-0.5">
              <span className="h-3.5 w-3.5 rounded-full bg-white shadow-xs" />
            </span>
          </div>
        </div>
      );

    case "carousel":
      return (
        <div className="flex w-full max-w-[230px] flex-col items-center gap-1.5">
          <div className="flex w-full items-center gap-1.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#DFDCD2] bg-white text-[#17181C]">
              <ChevronLeft className="h-3 w-3" />
            </span>
            <div className="flex flex-1 gap-1.5 overflow-hidden">
              <div className="h-14 w-28 shrink-0 rounded-lg border border-[#C5E2FA] bg-[#EDF6FD] p-2">
                <div className="h-2 w-12 rounded bg-[#1A4E7A]/40" />
                <div className="mt-1.5 h-5 w-full rounded bg-white/80" />
              </div>
              <div className="h-14 w-12 shrink-0 rounded-lg border border-[#E5E2DA] bg-white/75 p-2 opacity-65" />
            </div>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#DFDCD2] bg-white text-[#17181C]">
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-3 rounded-full bg-[#17181C]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#CFCBC0]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#CFCBC0]" />
          </div>
        </div>
      );

    case "hover-card":
      return (
        <div className="flex flex-col items-start gap-1">
          <span className="text-[10px] font-bold text-[#1A4E7A] underline decoration-dotted underline-offset-2">
            @minhthao
          </span>
          <div className="w-[188px] rounded-xl border border-[#DFDCD2] bg-white p-2 shadow-md">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6DAFB] text-[9px] font-extrabold text-[#4B2D8A]">
                MT
              </span>
              <div>
                <div className="text-[10px] font-bold text-[#17181C]">
                  Minh Thảo
                </div>
                <div className="text-[8px] text-[#6B6C72]">
                  UI/UX Designer · 12 dự án
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "date-picker":
      return (
        <div className="w-full max-w-[190px] rounded-xl border border-[#DFDCD2] bg-white p-2 text-[9px] shadow-xs">
          <div className="mb-1 flex items-center justify-between font-bold text-[#17181C]">
            <span>Tháng 11</span>
            <Sparkles className="h-2.5 w-2.5 text-[#4B2D8A]" />
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center font-semibold">
            <span className="py-0.5 text-[#8E8F94]">10</span>
            <span className="py-0.5 text-[#8E8F94]">11</span>
            <span className="rounded-l bg-[#17181C] py-0.5 text-white">12</span>
            <span className="bg-[#E6DAFB] py-0.5 text-[#4B2D8A]">13</span>
            <span className="bg-[#E6DAFB] py-0.5 text-[#4B2D8A]">14</span>
            <span className="rounded-r bg-[#17181C] py-0.5 text-white">15</span>
            <span className="py-0.5 text-[#5A5B60]">16</span>
          </div>
        </div>
      );

    case "radio-group":
      return (
        <div className="w-full max-w-[205px] space-y-1.5 rounded-xl border border-[#DFDCD2] bg-white p-2.5 text-[10px] font-semibold shadow-xs">
          <div className="flex items-center gap-2 text-[#17181C]">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#4B2D8A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4B2D8A]" />
            </span>
            <span>Giao hàng tiêu chuẩn</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B6C72]">
            <span className="h-3.5 w-3.5 rounded-full border border-[#CFCBC0]" />
            <span>Giao hỏa tốc 2 giờ</span>
          </div>
        </div>
      );

    case "checkbox-group":
      return (
        <div className="w-full max-w-[205px] space-y-1 rounded-xl border border-[#DFDCD2] bg-white p-2.5 text-[10px] shadow-xs">
          <div className="flex items-center gap-2 font-bold text-[#17181C]">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-[#17181C] text-white">
              <Minus className="h-2.5 w-2.5 stroke-[3]" />
            </span>
            <span>Chọn tất cả quyền (1/2)</span>
          </div>
          <div className="space-y-1 pl-4 text-[9px] text-[#4E4F54]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-3 w-3 items-center justify-center rounded bg-[#17181C] text-white">
                <Check className="h-2 w-2 stroke-[3]" />
              </span>
              <span>Xem báo cáo</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#7C7D82]">
              <span className="h-3 w-3 rounded border border-[#CFCBC0]" />
              <span>Chỉnh sửa dữ liệu</span>
            </div>
          </div>
        </div>
      );

    case "range-slider":
      return (
        <div className="w-full max-w-[215px] rounded-xl border border-[#DFDCD2] bg-white px-3.5 py-2.5 shadow-xs">
          <div className="mb-2 flex justify-between text-[9px] font-bold text-[#17181C]">
            <span>200.000đ</span>
            <span>800.000đ</span>
          </div>
          <div className="relative h-1.5 rounded-full bg-[#E6E3DA]">
            <div className="absolute inset-y-0 right-1/4 left-1/5 rounded-full bg-[#4B2D8A]" />
            <span className="absolute top-1/2 left-1/5 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#4B2D8A] bg-white shadow-xs" />
            <span className="absolute top-1/2 right-1/4 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#4B2D8A] bg-white shadow-xs" />
          </div>
        </div>
      );

    case "split-button":
      return (
        <div className="flex flex-col items-end gap-1">
          <div className="inline-flex overflow-hidden rounded-lg bg-[#17181C] text-[10px] font-bold text-white shadow-xs">
            <span className="px-3 py-1.5">Xuất bản ngay</span>
            <span className="flex items-center border-l border-white/25 px-2">
              <ChevronDown className="h-3 w-3" />
            </span>
          </div>
          <div className="w-28 rounded-lg border border-[#DFDCD2] bg-white p-1 text-[9px] font-semibold text-[#4E4F54] shadow-md">
            <div className="rounded px-1.5 py-0.5">Lên lịch đăng</div>
            <div className="rounded px-1.5 py-0.5">Lưu bản nháp</div>
          </div>
        </div>
      );

    case "file-dropzone":
      return (
        <div className="flex w-full max-w-[220px] flex-col items-center rounded-xl border-2 border-dashed border-[#B7B3A8] bg-white px-3 py-2 text-center">
          <UploadCloud className="h-4 w-4 text-[#4B2D8A]" />
          <div className="mt-1 text-[10px] font-bold text-[#17181C]">
            Kéo thả tệp vào đây
          </div>
          <div className="text-[8px] text-[#7C7D82]">
            Hoặc <span className="underline">chọn từ máy</span> · PDF, PNG ≤ 10MB
          </div>
        </div>
      );

    case "otp-input":
      return (
        <div className="flex items-center gap-1.5">
          {["4", "8", "1", "9", "|", ""].map((digit, idx) => (
            <span
              key={idx}
              className={`flex h-8 w-6 items-center justify-center rounded-lg border text-xs font-extrabold ${
                idx === 4
                  ? "border-[#4B2D8A] bg-[#F4EEFF] text-[#4B2D8A] ring-2 ring-[#4B2D8A]/20"
                  : digit
                  ? "border-[#17181C] bg-white text-[#17181C]"
                  : "border-[#D4D1C7] bg-white/70 text-[#8E8F94]"
              }`}
            >
              {digit}
            </span>
          ))}
        </div>
      );

    case "tabs":
      return (
        <div className="w-full max-w-[225px] rounded-xl border border-[#DFDCD2] bg-white px-3 pt-2 pb-2.5 shadow-xs">
          <div className="flex gap-3 border-b border-[#ECEAE3] text-[10px] font-bold">
            <span className="border-b-2 border-[#17181C] pb-1.5 text-[#17181C]">
              Tổng quan
            </span>
            <span className="pb-1.5 text-[#7C7D82]">Thông số</span>
            <span className="pb-1.5 text-[#7C7D82]">Đánh giá</span>
          </div>
          <div className="mt-2 h-2 w-4/5 rounded bg-[#EFECE4]" />
          <div className="mt-1.5 h-2 w-3/5 rounded bg-[#F5F3EE]" />
        </div>
      );

    case "command-palette":
      return (
        <div className="w-full max-w-[220px] rounded-xl border border-[#CFCBC0] bg-white p-2 shadow-lg">
          <div className="flex items-center justify-between gap-2 border-b border-[#ECEAE3] pb-1.5 text-[10px]">
            <span className="flex items-center gap-1.5 text-[#6B6C72]">
              <Search className="h-3 w-3" />
              <span>Tìm nhanh hoặc gõ lệnh...</span>
            </span>
            <kbd className="rounded bg-[#F3F1EB] px-1 text-[8px] font-bold text-[#17181C]">
              ⌘K
            </kbd>
          </div>
          <div className="mt-1.5 space-y-1 text-[9px]">
            <div className="flex items-center justify-between rounded bg-[#EDF6FD] px-1.5 py-0.5 font-bold text-[#1A4E7A]">
              <span>+ Tạo dự án mới</span>
              <span>⌘N</span>
            </div>
            <div className="flex items-center justify-between px-1.5 py-0.5 text-[#5A5B60]">
              <span>Chuyển Dark Mode</span>
              <span>⌘D</span>
            </div>
          </div>
        </div>
      );

    case "bottom-nav":
      return (
        <div className="relative h-full w-[190px] overflow-hidden rounded-xl border border-[#D4D1C7] bg-white">
          <div className="space-y-1.5 p-2.5">
            <div className="h-2.5 w-20 rounded bg-[#EFECE4]" />
            <div className="h-7 rounded-lg bg-[#F5F3EE]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 border-t border-[#ECEAE3] bg-white py-1.5 text-[8px] font-bold">
            <div className="flex flex-col items-center text-[#4B2D8A]">
              <Home className="h-3 w-3" />
              <span>Chính</span>
            </div>
            <div className="flex flex-col items-center text-[#8E8F94]">
              <Compass className="h-3 w-3" />
              <span>Khám phá</span>
            </div>
            <div className="flex flex-col items-center text-[#8E8F94]">
              <Bell className="h-3 w-3" />
              <span>Tin</span>
            </div>
            <div className="flex flex-col items-center text-[#8E8F94]">
              <User className="h-3 w-3" />
              <span>Tôi</span>
            </div>
          </div>
        </div>
      );

    case "mega-menu":
      return (
        <div className="w-full max-w-[235px] rounded-xl border border-[#DFDCD2] bg-white p-2 shadow-md">
          <div className="mb-1.5 flex gap-3 border-b border-[#ECEAE3] pb-1 text-[9px] font-bold">
            <span className="text-[#4B2D8A]">Danh mục ▾</span>
            <span className="text-[#7C7D82]">Bộ sưu tập</span>
            <span className="text-[#7C7D82]">Ưu đãi</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[8px]">
            <div className="space-y-0.5">
              <div className="font-bold text-[#17181C]">Thiết kế</div>
              <div className="text-[#6B6C72]">UI Kit</div>
              <div className="text-[#6B6C72]">Icons</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-[#17181C]">Code</div>
              <div className="text-[#6B6C72]">React</div>
              <div className="text-[#6B6C72]">Tailwind</div>
            </div>
            <div className="rounded bg-[#F4EEFF] p-1 font-bold text-[#4B2D8A]">
              Nổi bật 2026
            </div>
          </div>
        </div>
      );

    case "nav-rail":
      return (
        <div className="flex h-full w-full max-w-[215px] overflow-hidden rounded-xl border border-[#D4D1C7] bg-[#FAF9F5]">
          <div className="flex w-10 shrink-0 flex-col items-center justify-between border-r border-[#E5E2DA] bg-white py-2">
            <div className="space-y-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#17181C] text-white">
                <Home className="h-3 w-3" />
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-md text-[#7C7D82]">
                <Compass className="h-3 w-3" />
              </span>
            </div>
            <Settings className="h-3 w-3 text-[#7C7D82]" />
          </div>
          <div className="flex-1 p-2.5">
            <div className="h-2.5 w-16 rounded bg-[#E3E0D7]" />
            <div className="mt-2 h-11 rounded-lg bg-white border border-[#ECEAE3]" />
          </div>
        </div>
      );

    case "anchor-toc":
      return (
        <div className="flex w-full max-w-[225px] items-start gap-3 rounded-xl border border-[#DFDCD2] bg-white p-2.5 shadow-xs">
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-20 rounded bg-[#17181C]/80" />
            <div className="h-2 w-full rounded bg-[#EFECE4]" />
            <div className="h-2 w-4/5 rounded bg-[#EFECE4]" />
          </div>
          <div className="w-24 shrink-0 space-y-1 border-l border-[#E5E2DA] pl-2 text-[8px]">
            <div className="text-[#8E8F94]">1. Giới thiệu</div>
            <div className="-ml-[9px] border-l-2 border-[#4B2D8A] pl-2 font-bold text-[#4B2D8A]">
              2. Quy chuẩn 8pt
            </div>
            <div className="text-[#8E8F94]">3. Ví dụ code</div>
          </div>
        </div>
      );

    case "data-table":
      return (
        <div className="w-full max-w-[235px] overflow-hidden rounded-xl border border-[#DFDCD2] bg-white text-[9px] shadow-xs">
          <div className="grid grid-cols-3 bg-[#F3F1EB] px-2.5 py-1 font-bold text-[#17181C]">
            <span>Khách hàng</span>
            <span className="flex items-center gap-0.5">
              Trạng thái <ArrowUpDown className="h-2.5 w-2.5" />
            </span>
            <span className="text-right">Số tiền</span>
          </div>
          <div className="divide-y divide-[#ECEAE3] px-2.5">
            <div className="grid grid-cols-3 py-1 text-[#4E4F54]">
              <span>Minh An</span>
              <span className="text-[#195734]">Đã thu</span>
              <span className="text-right font-mono font-bold">240k</span>
            </div>
            <div className="grid grid-cols-3 py-1 text-[#4E4F54]">
              <span>Lan Chi</span>
              <span className="text-[#8B6B15]">Chờ</span>
              <span className="text-right font-mono font-bold">180k</span>
            </div>
          </div>
        </div>
      );

    case "context-menu":
      return (
        <div className="relative flex w-full max-w-[220px] items-start justify-between rounded-xl border border-[#DFDCD2] bg-white p-2.5">
          <div className="relative rounded-lg bg-[#EDF6FD] px-2.5 py-1.5 text-[9px] font-bold text-[#1A4E7A]">
            Frame Header.fig
            <span className="mt-0.5 block text-[8px] font-medium text-[#5A5B60]">
              (Nhấp chuột phải)
            </span>
          </div>
          <div className="w-24 rounded-lg border border-[#DFDCD2] bg-white p-1 text-[9px] font-semibold text-[#17181C] shadow-md">
            <div className="rounded bg-[#F3F1EB] px-1.5 py-0.5">Sao chép</div>
            <div className="px-1.5 py-0.5">Đổi tên</div>
            <div className="px-1.5 py-0.5 text-[#7A2343]">Xóa</div>
          </div>
        </div>
      );

    case "popconfirm":
      return (
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative rounded-xl border border-[#DFDCD2] bg-white p-2 text-[9px] shadow-md">
            <div className="font-bold text-[#17181C]">Xác nhận xóa mục này?</div>
            <div className="mt-1.5 flex justify-end gap-1 font-bold">
              <span className="rounded border border-[#DFDCD2] px-1.5 py-0.5 text-[#5A5B60]">
                Hủy
              </span>
              <span className="rounded bg-[#D92D58] px-1.5 py-0.5 text-white">
                Đồng ý
              </span>
            </div>
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-[#DFDCD2] bg-white" />
          </div>
          <span className="inline-flex items-center gap-1 rounded-md border border-[#F0C6D5] bg-[#FAE0E9] px-2 py-0.5 text-[9px] font-bold text-[#7A2343]">
            <Trash2 className="h-2.5 w-2.5" /> Xóa
          </span>
        </div>
      );

    case "timeline":
      return (
        <div className="w-full max-w-[215px] rounded-xl border border-[#DFDCD2] bg-white px-3 py-2 text-[9px] shadow-xs">
          <div className="space-y-1.5 border-l-2 border-[#E3E0D7] pl-3">
            <div className="relative">
              <span className="absolute top-1 -left-[17px] h-2 w-2 rounded-full bg-[#195734]" />
              <div className="font-bold text-[#17181C]">Đã giao thành công</div>
              <div className="text-[8px] text-[#7C7D82]">14:20 hôm nay</div>
            </div>
            <div className="relative">
              <span className="absolute top-1 -left-[17px] h-2 w-2 rounded-full bg-[#CFCBC0]" />
              <div className="font-semibold text-[#5A5B60]">Đang vận chuyển</div>
              <div className="text-[8px] text-[#8E8F94]">09:15 hôm nay</div>
            </div>
          </div>
        </div>
      );

    case "progress-meter":
      return (
        <div className="w-full max-w-[215px] space-y-2 rounded-xl border border-[#DFDCD2] bg-white p-2.5 text-[9px] shadow-xs">
          <div>
            <div className="mb-1 flex justify-between font-bold text-[#17181C]">
              <span>Đang tải file...</span>
              <span>68%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#ECEAE3]">
              <div className="h-full w-2/3 rounded-full bg-[#195734]" />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between font-semibold text-[#5A5B60]">
              <span>Dung lượng trống</span>
              <span>8 / 10 GB</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#ECEAE3]">
              <div className="h-full w-4/5 rounded-full bg-[#4B2D8A]" />
            </div>
          </div>
        </div>
      );

    case "bulk-action-bar":
      return (
        <div className="flex w-full max-w-[235px] flex-col gap-1.5">
          <div className="flex items-center gap-2 px-1 text-[9px] text-[#6B6C72]">
            <span className="flex h-3 w-3 items-center justify-center rounded bg-[#17181C] text-white">
              <Check className="h-2 w-2 stroke-[3]" />
            </span>
            <span>3 dòng đang được tích chọn</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-xl bg-[#17181C] px-2.5 py-1.5 text-[9px] font-bold text-white shadow-md">
            <span>Đã chọn 3</span>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-white/15 px-1.5 py-0.5">Xuất CSV</span>
              <span className="rounded bg-[#D92D58] px-1.5 py-0.5">Xóa</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="text-xs font-semibold text-[#6B6C72]">{id}</div>
      );
  }
}
