"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "도시랭킹", href: "#" },
  { label: "밋업", href: "#" },
  { label: "코워킹", href: "#" },
  { label: "커뮤니티", href: "#" },
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
        <a href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span>🌿</span>
          <span className="bg-gradient-to-r from-[#1B9AAA] to-[#2D6A4F] bg-clip-text text-transparent">
            NOMAD KOREA
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#6B6B6B] hover:text-[#1B9AAA] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            className="gap-1 bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white rounded-full px-5"
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
                <a href="#" className="flex items-center gap-2 font-bold text-lg">
                  <span>🌿</span>
                  <span className="bg-gradient-to-r from-[#1B9AAA] to-[#2D6A4F] bg-clip-text text-transparent">
                    NOMAD KOREA
                  </span>
                </a>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.label}>
                      <a
                        href={link.href}
                        className="text-base font-medium text-[#6B6B6B] hover:text-[#1B9AAA] transition-colors"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <Button className="w-full gap-1 bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white rounded-full">
                  가입하기 →
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
