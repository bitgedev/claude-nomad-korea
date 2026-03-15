"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cities } from "@/lib/mock-data";

// Phase 1: filter badges are UI-only; wiring to actual filtering is Phase 2
const filters = ["전체", "수도권", "남부", "제주", "가성비순"];

export function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryLower = query.toLowerCase();
  const suggestions =
    open && query.length > 0
      ? cities
          .filter(
            (c) =>
              c.name.includes(query) ||
              c.nameEn.toLowerCase().includes(queryLower)
          )
          .slice(0, 3)
      : [];

  function handleBlur() {
    closeTimerRef.current = setTimeout(() => setOpen(false), 100);
  }

  function handleFocus() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push("/cities?q=" + encodeURIComponent(trimmed));
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
          <Input
            placeholder="도시명 또는 지역을 검색하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="pl-10 h-12 bg-white/90 backdrop-blur-sm text-base rounded-full border-[#1B9AAA]/25 focus:border-[#1B9AAA] focus:ring-[#1B9AAA]/20"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#1B9AAA]/20 rounded-2xl shadow-lg overflow-hidden z-10">
              {suggestions.map((city) => (
                <li key={city.id}>
                  <Link
                    href={`/cities/${city.id}`}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#EDF5EE] transition-colors"
                  >
                    <span className="font-medium">{city.name}</span>
                    <span className="text-[#6B6B6B]">{city.nameEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-12 px-6 rounded-full bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white"
        >
          검색
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Badge
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className={`cursor-pointer px-3 py-1 rounded-full transition-colors ${
              activeFilter === filter
                ? "bg-[#1B9AAA] text-white border-[#1B9AAA] hover:bg-[#1B9AAA]/90"
                : "border-[#1B9AAA]/30 text-[#1B9AAA] hover:bg-[#1B9AAA]/10 hover:text-[#1B9AAA]"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>
    </div>
  );
}
