"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MeetupCard } from "@/components/cards/meetup-card";
import type { Meetup, MeetupCategory } from "@/lib/mock-data";
import { Calendar } from "lucide-react";

const CITIES = ["전체", "서울", "부산", "제주", "기타"] as const;
const CATEGORIES: MeetupCategory[] = ["네트워킹", "스터디", "워크숍", "소셜"];
const MAIN_CITIES = ["서울", "부산", "제주"];

interface MeetupFiltersProps {
  meetups: Meetup[];
  highlightMeetups: Meetup[];
}

export function MeetupFilters({ meetups, highlightMeetups }: MeetupFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") ?? "전체";
  const category = searchParams.get("category") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/meetups?${params.toString()}`);
  }

  const filtered = meetups.filter((m) => {
    const cityMatch =
      city === "전체" ||
      (city === "기타" ? !MAIN_CITIES.includes(m.city) : m.city === city);
    const categoryMatch = !category || m.category === category;
    return cityMatch && categoryMatch;
  });

  return (
    <div>
      {/* 이번 주 밋업 하이라이트 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#4A4A4A] dark:text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#1B9AAA]" />
          이번 주 밋업
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlightMeetups.map((meetup) => (
            <MeetupCard key={meetup.id} meetup={meetup} />
          ))}
        </div>
      </section>

      {/* 필터 영역 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* 도시 탭 */}
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => updateParam("city", c === "전체" ? "" : c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                city === c || (c === "전체" && city === "전체")
                  ? "bg-[#1B9AAA] text-white border-[#1B9AAA]"
                  : "bg-white dark:bg-card text-[#6B6B6B] border-[#1B9AAA]/20 hover:border-[#1B9AAA]/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => updateParam("category", category === cat ? "" : cat)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${
                category === cat
                  ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                  : "bg-white dark:bg-card text-[#6B6B6B] border-[#1B9AAA]/20 hover:border-[#1B9AAA]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 전체 밋업 목록 */}
      <div>
        <h2 className="text-lg font-semibold text-[#4A4A4A] dark:text-foreground mb-4">
          전체 밋업{" "}
          <span className="text-[#6B6B6B] font-normal text-sm">({filtered.length}개)</span>
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#6B6B6B]">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-medium mb-2">해당하는 밋업이 없습니다</p>
            <p className="text-sm">필터를 변경해보세요</p>
            <button
              onClick={() => router.push("/meetups")}
              className="mt-4 px-4 py-2 rounded-lg bg-[#1B9AAA] text-white text-sm hover:bg-[#1B9AAA]/90 transition-colors"
            >
              전체 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((meetup) => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
