"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "도시랭킹", href: "/cities" },
  { label: "밋업", href: "/meetups" },
  { label: "코워킹", href: "/coworking" },
  { label: "커뮤니티", href: "/community" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#1B9AAA]/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span>🌿</span>
          <span className="bg-gradient-to-r from-[#1B9AAA] to-[#2D6A4F] bg-clip-text text-transparent">
            NOMAD KOREA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#6B6B6B] hover:text-[#1B9AAA] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/10"
            render={<Link href="/login" />}
          >
            로그인
          </Button>
          <Button
            size="sm"
            className="gap-1 bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white rounded-full px-5"
            render={<Link href="/signup" />}
          >
            가입하기 →
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger>
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-full hover:bg-[#1B9AAA]/10 transition-colors" aria-label="메뉴 열기">
                <Menu className="h-5 w-5 text-[#4A4A4A]" />
              </span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[#FAF7F2]">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <span>🌿</span>
                  <span className="bg-gradient-to-r from-[#1B9AAA] to-[#2D6A4F] bg-clip-text text-transparent">
                    NOMAD KOREA
                  </span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base font-medium text-[#6B6B6B] hover:text-[#1B9AAA] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/10"
                    render={<Link href="/login" />}
                  >
                    로그인
                  </Button>
                  <Button
                    className="w-full bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white rounded-full"
                    render={<Link href="/signup" />}
                  >
                    가입하기 →
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
