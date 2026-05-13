import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { FavoritesProvider } from "@/providers/favorites-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nomad Korea — 한국 디지털 노마드 정보 플랫폼",
    template: "%s | Nomad Korea",
  },
  description:
    "실제 노마드들의 리뷰와 데이터로 최적의 한국 거점 도시를 찾아보세요. 코워킹 스페이스, 밋업, 생활비 정보를 한 곳에서.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Nomad Korea",
    title: "Nomad Korea — 한국 디지털 노마드 정보 플랫폼",
    description:
      "실제 노마드들의 리뷰와 데이터로 최적의 한국 거점 도시를 찾아보세요. 코워킹 스페이스, 밋업, 생활비 정보를 한 곳에서.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomad Korea — 한국 디지털 노마드 정보 플랫폼",
    description:
      "실제 노마드들의 리뷰와 데이터로 최적의 한국 거점 도시를 찾아보세요. 코워킹 스페이스, 밋업, 생활비 정보를 한 곳에서.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <FavoritesProvider>
              {children}
              <ScrollToTop />
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
