"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Check,
  Code2,
  Eye,
  EyeOff,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { MeowAvatar } from "@/components/layout/TopNav";
import type { AuthUser } from "@/lib/services/auth";

interface LoginClientProps {
  initialUser: AuthUser | null;
}

export function LoginClient({ initialUser }: LoginClientProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [displayName, setDisplayName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [busy, setBusy] = useState<"submit" | "guest" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy("submit");
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          identifier,
          password,
          displayName: mode === "register" ? displayName : undefined,
          rememberMe,
        }),
      });

      const data = (await response.json()) as {
        user?: AuthUser;
        error?: string;
      };

      if (!response.ok || !data.user) {
        throw new Error(data.error || "Không thể đăng nhập lúc này.");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi xác thực."
      );
    } finally {
      setBusy(null);
    }
  };

  const handleGuestAccess = async () => {
    setError(null);
    setBusy("guest");
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "guest" }),
      });
      router.push("/");
      router.refresh();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0C0D10] p-3 sm:p-6 lg:p-8">
      <div className="w-full max-w-[1040px] rounded-[28px] bg-[#FAF9F6] p-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-[34px] sm:p-3.5">
        <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-12 lg:gap-4">
          {/* Left Dark Feature Showcase Panel */}
          <section
            aria-label="Giới thiệu MeowProduct"
            className="flex flex-col justify-between gap-6 rounded-[22px] bg-[#121316] p-5 text-white sm:rounded-[26px] sm:p-7 lg:col-span-5"
          >
            <div>
              {/* Brand */}
              <div className="flex items-center gap-3">
                <MeowAvatar size={42} />
                <div>
                  <div className="text-lg font-extrabold tracking-tight text-white">
                    MeowProduct
                  </div>
                  <div className="text-xs text-[#9E9FA5]">
                    Học UI/UX Junior &amp; UI → FE Code
                  </div>
                </div>
              </div>

              {/* Tag Pill */}
              <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold text-white/90">
                <Sparkles className="h-3.5 w-3.5 text-[#E6DAFB]" />
                <span>Tập trung lộ trình Junior thực chiến</span>
              </div>

              {/* Hero Heading */}
              <h1 className="mt-3.5 text-2xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-[27px]">
                Nâng cấp tư duy UI/UX mỗi ngày với lộ trình cá nhân hóa.
              </h1>

              <p className="mt-2.5 text-xs leading-relaxed text-[#A4A6AB]">
                Lưu tiến độ bài học, Mini-Game soi lỗi thị giác, 500 bài test
                kiến thức theo chức năng và dịch thiết kế Figma sang FE Code ngay
                trên trình duyệt.
              </p>

              {/* 3 Feature Rows */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9ECFB] text-[#1A4E7A]">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white">
                      UI/UX Junior → FE Code
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-[#9E9FA5]">
                      40+ bài học trọng tâm, Auto Layout, Tokens &amp; Tailwind CSS
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6DAFB] text-[#4B2D8A]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white">
                      500 Bài Test &amp; Mini-Game
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-[#9E9FA5]">
                      5 chặng năng lực × 100 câu, Quiz chuẩn HIG / M3 / WCAG 2.2
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D4F0DC] text-[#195734]">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white">
                      Mở khóa linh hoạt &amp; Chấm Rubric
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-[#9E9FA5]">
                      Tự chọn bỏ qua Beginner, nộp bài Figma &amp; cập nhật NEW/HOT
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Summary Note */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
              <div className="text-xs font-bold text-white">
                Học đều mỗi ngày cùng MeowProduct
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[#9E9FA5]">
                Tiến độ bài học, 500 bài test, Code Lab và chuỗi ngày học được lưu
                tự động an toàn.
              </p>
            </div>
          </section>

          {/* Right White Auth Form Panel */}
          <section
            aria-label="Biểu mẫu đăng nhập và tạo tài khoản"
            className="flex flex-col justify-between rounded-[22px] bg-white px-5 py-6 sm:rounded-[26px] sm:px-9 sm:py-9 lg:col-span-7"
          >
            <div>
              {initialUser && (
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#C5E2FA] bg-[#EDF6FD] px-3.5 py-2.5 text-xs text-[#1A4E7A]">
                  <span>
                    Đang đăng nhập: <strong>{initialUser.displayName}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="inline-flex cursor-pointer items-center gap-1 font-bold underline underline-offset-2 hover:text-[#121316]"
                  >
                    Vào không gian học
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Segmented Auth Mode Pill */}
              <div
                role="tablist"
                aria-label="Chọn đăng nhập hoặc tạo tài khoản"
                className="inline-flex rounded-full border border-[#E5E2DA] bg-[#F3F1EB] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "login"}
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                  className={`cursor-pointer rounded-full px-5 py-2 text-xs font-bold transition-all ${
                    mode === "login"
                      ? "bg-[#121316] text-white shadow-xs"
                      : "text-[#5A5B60] hover:text-[#17181C]"
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "register"}
                  onClick={() => {
                    setMode("register");
                    setError(null);
                  }}
                  className={`cursor-pointer rounded-full px-5 py-2 text-xs font-bold transition-all ${
                    mode === "register"
                      ? "bg-[#121316] text-white shadow-xs"
                      : "text-[#5A5B60] hover:text-[#17181C]"
                  }`}
                >
                  Tạo tài khoản
                </button>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-extrabold tracking-tight text-[#17181C] sm:text-2xl">
                  {mode === "login"
                    ? "Chào mừng quay lại MeowProduct!"
                    : "Tạo tài khoản MeowProduct"}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#6B6C72]">
                  {mode === "login"
                    ? "Đăng nhập để tiếp tục chuỗi ngày học, kiểm tra XP và tiến độ lộ trình."
                    : "Lưu riêng hồ sơ học tập UI/UX Junior & chuyển giao FE Code của bạn."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="auth-display-name"
                      className="mb-1.5 block text-xs font-bold text-[#17181C]"
                    >
                      Tên hiển thị
                    </label>
                    <div className="relative">
                      <Sparkles className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8E8F94]" />
                      <input
                        id="auth-display-name"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="VD: Minh Thảo"
                        className="w-full rounded-2xl border border-[#E5E2DA] bg-[#F7F6F2] py-3 pl-10 pr-4 text-sm text-[#17181C] placeholder:text-[#9A9B9E] focus:border-[#121316] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="auth-identifier"
                    className="mb-1.5 block text-xs font-bold text-[#17181C]"
                  >
                    Email hoặc tên đăng nhập
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8E8F94]" />
                    <input
                      id="auth-identifier"
                      type="text"
                      required
                      autoComplete="username"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Nhập email hoặc tên đăng nhập"
                      className="w-full rounded-2xl border border-[#E5E2DA] bg-[#F7F6F2] py-3 pl-10 pr-4 text-sm text-[#17181C] placeholder:text-[#9A9B9E] focus:border-[#121316] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="auth-password"
                    className="mb-1.5 block text-xs font-bold text-[#17181C]"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8E8F94]" />
                    <input
                      id="auth-password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={mode === "register" ? 6 : 1}
                      autoComplete={
                        mode === "login" ? "current-password" : "new-password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        mode === "login"
                          ? "Nhập mật khẩu"
                          : "Tối thiểu 6 ký tự"
                      }
                      className="w-full rounded-2xl border border-[#E5E2DA] bg-[#F7F6F2] py-3 pl-10 pr-11 text-sm text-[#17181C] placeholder:text-[#9A9B9E] focus:border-[#121316] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#7C7D82] transition-colors hover:bg-black/5 hover:text-[#17181C]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <label className="inline-flex cursor-pointer items-center gap-2.5 text-xs font-medium text-[#4E4F54] select-none">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={rememberMe}
                    onClick={() => setRememberMe((prev) => !prev)}
                    className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-colors ${
                      rememberMe
                        ? "border-[#121316] bg-[#121316] text-white"
                        : "border-[#CFCBC0] bg-white text-transparent"
                    }`}
                  >
                    <Check className="h-3 w-3 stroke-[3]" />
                  </button>
                  <span>Ghi nhớ đăng nhập trên trình duyệt này</span>
                </label>

                {error && (
                  <div className="rounded-2xl border border-[#F0C6D5] bg-[#FAE0E9] px-3.5 py-2.5 text-xs font-semibold text-[#7A2343]">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy !== null}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#121316] px-5 py-3.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#23252C] disabled:opacity-60"
                >
                  <span>
                    {busy === "submit"
                      ? mode === "login"
                        ? "Đang đăng nhập..."
                        : "Đang tạo tài khoản..."
                      : mode === "login"
                      ? "Đăng nhập vào học ngay"
                      : "Tạo tài khoản & vào học ngay"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Bottom Local Note + Guest Trial Access */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#ECEAE3] pt-4 text-xs">
              <span className="inline-flex items-center gap-1.5 text-[#7C7D82]">
                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                <span>Dữ liệu học tập được lưu cục bộ an toàn.</span>
              </span>

              <button
                type="button"
                disabled={busy !== null}
                onClick={() => void handleGuestAccess()}
                className="inline-flex cursor-pointer items-center gap-1 font-bold text-[#17181C] underline decoration-[#BEB9AD] underline-offset-4 transition-colors hover:text-[#4B2D8A] hover:decoration-[#4B2D8A]"
              >
                <span>
                  {busy === "guest"
                    ? "Đang vào học..."
                    : "Vào học thử không cần tài khoản"}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
