import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeowProduct — Học UI/UX & Product Design",
  description:
    "Nền tảng học UI/UX & Product Design cá nhân hóa từ nền tảng đến sẵn sàng ứng tuyển Junior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen antialiased selection:bg-[#E6DAFB] selection:text-[#17181C]">
        {children}
      </body>
    </html>
  );
}
