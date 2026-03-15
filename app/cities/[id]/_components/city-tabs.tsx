"use client";

import { useState } from "react";
import { Wifi, DollarSign, MapPin, Star } from "lucide-react";
import type { City, CoworkingSpace, Review } from "@/lib/mock-data";
import { CoworkingCard } from "@/components/cards/coworking-card";

const TABS = ["개요", "코워킹", "리뷰"] as const;
type Tab = (typeof TABS)[number];

function BarChart({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex-1 h-2.5 bg-[#F5EFE6] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function NetworkDots({ quality }: { quality: number }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-base ${i <= quality ? "text-[#1B9AAA]" : "text-[#4A4A4A]/20"}`}
        >
          ◆
        </span>
      ))}
    </div>
  );
}

type CityTabsProps = {
  city: City;
  coworkingSpaces: CoworkingSpace[];
  reviews: Review[];
};

export function CityTabs({ city, coworkingSpaces, reviews }: CityTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("개요");

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-1 border-b border-[#1B9AAA]/15 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium transition-colors rounded-t-lg ${
              activeTab === tab
                ? "border-b-2 border-[#1B9AAA] text-[#1B9AAA]"
                : "text-[#6B6B6B] hover:text-[#4A4A4A]"
            }`}
          >
            {tab}
            {tab === "코워킹" && (
              <span className="ml-1.5 text-xs text-[#6B6B6B]">
                ({coworkingSpaces.length})
              </span>
            )}
            {tab === "리뷰" && (
              <span className="ml-1.5 text-xs text-[#6B6B6B]">
                ({reviews.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 개요 탭 */}
      {activeTab === "개요" && (
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-[#4A4A4A] dark:text-foreground">
              지표 상세
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <DollarSign className="h-4 w-4 text-[#6B6B6B] shrink-0" />
                <span className="text-[#6B6B6B] w-20">생활비 지수</span>
                <BarChart value={city.costOfLiving} color="bg-[#FF6B35]" />
                <span className="text-xs text-[#6B6B6B] w-8 text-right">
                  {city.costOfLiving}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Wifi className="h-4 w-4 text-[#6B6B6B] shrink-0" />
                <span className="text-[#6B6B6B] w-20">인터넷 속도</span>
                <BarChart value={city.internetSpeed} color="bg-[#1B9AAA]" />
                <span className="text-xs text-[#6B6B6B] w-8 text-right">
                  {city.internetSpeed}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm pt-2 border-t border-[#1B9AAA]/10">
              <span className="text-[#6B6B6B]">네트워크 품질</span>
              <NetworkDots quality={city.networkQuality} />
              <span className="text-xs text-[#6B6B6B]">
                {city.networkQuality}/5
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-2xl p-6">
            <h3 className="font-semibold text-[#4A4A4A] dark:text-foreground mb-3">
              추천 지역
            </h3>
            <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
              <MapPin className="h-4 w-4 text-[#FF6B35]" />
              <span>{city.recommendedArea}</span>
            </div>
          </div>
        </div>
      )}

      {/* 코워킹 탭 */}
      {activeTab === "코워킹" && (
        <div>
          {coworkingSpaces.length === 0 ? (
            <p className="text-[#6B6B6B] text-center py-12">
              등록된 코워킹 스페이스가 없습니다
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coworkingSpaces.map((space) => (
                <CoworkingCard key={space.id} space={space} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 리뷰 탭 */}
      {activeTab === "리뷰" && (
        <div className="flex flex-col gap-4">
          {avgRating && (
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-[#FF6B35] fill-current" />
              <span className="text-2xl font-bold text-[#4A4A4A] dark:text-foreground">
                {avgRating}
              </span>
              <span className="text-[#6B6B6B] text-sm">
                평균 ({reviews.length}개 리뷰)
              </span>
            </div>
          )}

          {reviews.length === 0 ? (
            <p className="text-[#6B6B6B] text-center py-12">
              아직 리뷰가 없습니다
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#4A4A4A] dark:text-foreground">
                    {review.nickname}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`text-xs ${i <= review.rating ? "text-[#FF6B35]" : "text-[#4A4A4A]/20"}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-[#6B6B6B] ml-1">
                      {review.date}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {review.content}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {review.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#1B9AAA] bg-[#1B9AAA]/8 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
