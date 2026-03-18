"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuth } from "@/providers/auth-provider";

const navLinks = [
  { label: "도시랭킹", href: "/cities" },
  { label: "밋업", href: "/meetups" },
  { label: "코워킹", href: "/coworking" },
  { label: "커뮤니티", href: "/community" },
];

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    router.push("/");
  }

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
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 border border-[#1B9AAA]/40 hover:bg-[#1B9AAA]/10 transition-colors text-sm font-medium text-[#1B9AAA]"
              >
                <User className="h-4 w-4" />
                <span>{user.nickname}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-background shadow-md py-1 text-sm">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-[#1B9AAA]/10 text-foreground transition-colors"
                  >
                    프로필
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#1B9AAA]/10 text-foreground transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/10"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                로그인
              </Button>
              <Button
                size="sm"
                className="gap-1 bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white rounded-full px-5"
                nativeButton={false}
                render={<Link href="/signup" />}
              >
                가입하기 →
              </Button>
            </>
          )}
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
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 px-1 py-1 text-sm font-medium text-[#1B9AAA]">
                        <User className="h-4 w-4" />
                        <span>{user.nickname}</span>
                      </div>
                      <SheetClose>
                        <Link
                          href="/profile"
                          className="block w-full text-center rounded-full border border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/10 py-2 text-sm font-medium transition-colors"
                        >
                          프로필
                        </Link>
                      </SheetClose>
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-full bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white py-2 text-sm font-medium transition-colors"
                      >
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full rounded-full border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/10"
                        nativeButton={false}
                        render={<Link href="/login" />}
                      >
                        로그인
                      </Button>
                      <Button
                        className="w-full bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white rounded-full"
                        nativeButton={false}
                        render={<Link href="/signup" />}
                      >
                        가입하기 →
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
