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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="도시명 또는 지역을 검색하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 bg-background/90 backdrop-blur-sm text-base"
          />
        </div>
        <Button size="lg" className="h-12 px-6">
          검색
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Badge
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>
    </div>
  );
}
