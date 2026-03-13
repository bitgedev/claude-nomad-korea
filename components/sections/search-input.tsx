"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const filters = ["전체", "수도권", "남부", "제주", "가성비순"];

export function SearchInput() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
          <Input
            placeholder="도시명 또는 지역을 검색하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 bg-white/90 backdrop-blur-sm text-base rounded-full border-[#1B9AAA]/25 focus:border-[#1B9AAA] focus:ring-[#1B9AAA]/20"
          />
        </div>
        <Button
          size="lg"
          className="h-12 px-6 rounded-full bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white"
        >
          검색
        </Button>
      </div>

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
