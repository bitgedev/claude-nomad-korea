"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Review } from "@/lib/mock-data";
import { ReviewCard } from "@/components/cards/review-card";
import { ReviewForm } from "@/components/review-form";

const ALL_CITIES = ["전체", "서울", "부산", "제주", "기타"];

type SortKey = "최신순" | "평점 높은 순" | "도움 많은 순";
const SORT_OPTIONS: SortKey[] = ["최신순", "평점 높은 순", "도움 많은 순"];

const KNOWN_CITIES = ["서울", "부산", "제주"];

function getCityTab(cityName: string) {
  return KNOWN_CITIES.includes(cityName) ? cityName : "기타";
}

function avgRating(list: Review[]) {
  if (!list.length) return 0;
  return list.reduce((sum, r) => sum + r.rating, 0) / list.length;
}

export function ReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [selectedCity, setSelectedCity] = useState("전체");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>("최신순");
  const [formOpen, setFormOpen] = useState(false);

  function handleHelpfulToggle(id: string, liked: boolean) {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + (liked ? 1 : -1),
    }));
  }

  function handleAddReview(review: Review) {
    setReviews((prev) => [review, ...prev]);
  }

  const filtered = reviews
    .filter((r) => {
      if (selectedCity === "전체") return true;
      return getCityTab(r.cityName) === selectedCity;
    })
    .filter((r) => (selectedRating ? r.rating === selectedRating : true))
    .sort((a, b) => {
      if (sortBy === "평점 높은 순") return b.rating - a.rating;
      if (sortBy === "도움 많은 순")
        return (helpfulCounts[b.id] ?? 0) - (helpfulCounts[a.id] ?? 0);
      return reviews.indexOf(a) - reviews.indexOf(b);
    });

  const average = avgRating(reviews);
  const cityDist = KNOWN_CITIES.map((city) => ({
    city,
    count: reviews.filter((r) => r.cityName === city).length,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="bg-[#FAF7F2] dark:bg-background py-12 flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          {/* 헤더 */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#4A4A4A] dark:text-foreground">전체 리뷰</h1>
              <p className="text-[#6B6B6B] mt-1">실제 노마드들의 생생한 후기</p>
            </div>
            <button
              onClick={() => setFormOpen(true)}
              className="shrink-0 bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors"
            >
              리뷰 쓰기
            </button>
          </div>

          {/* 요약 통계 */}
          <div className="bg-white dark:bg-card border border-[#1B9AAA]/10 rounded-3xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-[#6B6B6B]">전체 리뷰</p>
                <p className="text-2xl font-bold text-[#4A4A4A] dark:text-foreground">
                  {reviews.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6B6B6B]">평균 평점</p>
                <p className="text-2xl font-bold text-[#FF6B35]">
                  ★ {average.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {cityDist.map(({ city, count }) => (
                <div key={city} className="flex items-center gap-3">
                  <span className="text-xs text-[#6B6B6B] w-8">{city}</span>
                  <div className="flex-1 h-2 bg-[#1B9AAA]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1B9AAA] rounded-full transition-all"
                      style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#6B6B6B] w-4 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 도시 탭 */}
          <div className="flex gap-2 flex-wrap">
            {ALL_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selectedCity === city
                    ? "bg-[#1B9AAA] text-white border-[#1B9AAA]"
                    : "border-[#1B9AAA]/30 text-[#6B6B6B] hover:border-[#1B9AAA] hover:text-[#1B9AAA]"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* 필터 + 정렬 */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#6B6B6B]">별점</span>
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(selectedRating === star ? 0 : star)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    selectedRating === star
                      ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                      : "border-[#4A4A4A]/20 text-[#6B6B6B] hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  }`}
                >
                  ★{star}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-[#6B6B6B]">정렬</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="text-sm border border-[#1B9AAA]/30 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#1B9AAA] dark:bg-background"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 리뷰 그리드 */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  helpfulCount={helpfulCounts[review.id] ?? 0}
                  onHelpfulToggle={handleHelpfulToggle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#6B6B6B]">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">검색 결과가 없습니다</p>
              <p className="text-sm mt-1">필터 조건을 바꿔보세요</p>
            </div>
          )}
        </div>

        <ReviewForm
          open={formOpen}
          onOpenChange={setFormOpen}
          onSubmit={handleAddReview}
        />
      </main>
      <Footer />
    </div>
  );
}
