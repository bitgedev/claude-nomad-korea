"use client";

import { useRouter, usePathname } from "next/navigation";

const TAGS = ["바다", "자연", "가성비", "대도시"];

const SORT_OPTIONS = [
  { value: "rank", label: "기본 순위" },
  { value: "rating", label: "평점순" },
  { value: "reviews", label: "리뷰 많은 순" },
  { value: "cost", label: "생활비 낮은 순" },
  { value: "internet", label: "인터넷 빠른 순" },
];

type CityFiltersProps = {
  currentQuery: string;
  currentSort: string;
  currentTag: string;
};

export function CityFilters({
  currentQuery,
  currentSort,
  currentTag,
}: CityFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  function buildParams(updates: Record<string, string>) {
    const params = new URLSearchParams();
    if (currentQuery) params.set("q", currentQuery);
    if (currentSort && currentSort !== "rank") params.set("sort", currentSort);
    if (currentTag) params.set("tag", currentTag);
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = (new FormData(e.currentTarget).get("q") as string).trim();
    router.push(buildParams({ q }));
  }

  function handleTag(tag: string) {
    router.push(buildParams({ tag: currentTag === tag ? "" : tag }));
  }

  function handleSort(sort: string) {
    router.push(buildParams({ sort }));
  }

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          name="q"
          defaultValue={currentQuery}
          placeholder="도시 이름으로 검색..."
          className="flex-1 px-4 py-2.5 rounded-full border border-[#1B9AAA]/30 text-[#4A4A4A] dark:text-foreground bg-white dark:bg-card focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]/30 text-sm"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-full bg-[#1B9AAA] text-white text-sm font-medium hover:bg-[#1B9AAA]/90 transition-colors"
        >
          검색
        </button>
      </form>

      {/* Tags + Sort */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTag("")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !currentTag
                ? "bg-[#1B9AAA] text-white"
                : "bg-white dark:bg-card border border-[#1B9AAA]/20 text-[#6B6B6B] hover:border-[#1B9AAA]/50"
            }`}
          >
            전체
          </button>
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentTag === tag
                  ? "bg-[#1B9AAA] text-white"
                  : "bg-white dark:bg-card border border-[#1B9AAA]/20 text-[#6B6B6B] hover:border-[#1B9AAA]/50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <select
          value={currentSort}
          onChange={(e) => handleSort(e.target.value)}
          className="px-3 py-1.5 rounded-full border border-[#1B9AAA]/20 text-sm text-[#4A4A4A] dark:text-foreground bg-white dark:bg-card focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]/30"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
