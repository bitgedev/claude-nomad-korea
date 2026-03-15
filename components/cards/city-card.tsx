"use client";

import Link from "next/link";
import { Wifi, DollarSign, Building2, Heart } from "lucide-react";
import type { City } from "@/lib/mock-data";
import { useFavorites } from "@/providers/favorites-provider";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-sm ${i <= Math.round(rating) ? "text-[#FF6B35]" : "text-[#4A4A4A]/20"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function NetworkDots({ quality }: { quality: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-xs ${i <= quality ? "text-[#1B9AAA]" : "text-[#4A4A4A]/20"}`}
        >
          ◆
        </span>
      ))}
    </div>
  );
}

function BarChart({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex-1 h-2 bg-[#F5EFE6] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

const rankColors = [
  "bg-[#FF6B35] text-white",
  "bg-[#4A4A4A] text-white",
  "bg-[#F4A261] text-white",
];

const badgeVariants: Record<string, string> = {
  "인기 1위": "bg-[#1B9AAA]/10 text-[#1B9AAA] border border-[#1B9AAA]/20",
  "가성비 최고": "bg-[#4CAF50]/10 text-[#2D6A4F] border border-[#4CAF50]/20",
  "자연 최고": "bg-[#4CAF50]/15 text-[#2D6A4F] border border-[#4CAF50]/25",
};

type CityCardProps = {
  city: City;
  rankIndex?: number;
};

export function CityCard({ city, rankIndex }: CityCardProps) {
  const idx = rankIndex ?? city.rank - 1;
  const rankColor = rankColors[idx] ?? "bg-[#6B6B6B] text-white";
  const { isFavorite, toggle } = useFavorites();
  const favorited = isFavorite(city.id);

  return (
    <Link href={`/cities/${city.id}`} className="block">
      <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-3xl p-6 hover:shadow-[0_8px_30px_rgba(27,154,170,0.12)] transition-shadow flex flex-col gap-4 cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${rankColor}`}
            >
              {city.rank}
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#4A4A4A] dark:text-foreground">
                {city.name}
              </h3>
              <p className="text-sm text-[#6B6B6B]">{city.nameEn}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                badgeVariants[city.badge] ?? "bg-[#FAF7F2] text-[#6B6B6B]"
              }`}
            >
              {city.badge}
            </span>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(city.id); }}
              className="p-1 rounded-full hover:bg-[#FAF7F2] transition-colors"
              aria-label={favorited ? "즐겨찾기 제거" : "즐겨찾기 추가"}
            >
              <Heart
                className={`h-4 w-4 ${favorited ? "fill-[#FF6B35] text-[#FF6B35]" : "text-[#6B6B6B]"}`}
              />
            </button>
          </div>
        </div>

        <p className="text-sm text-[#6B6B6B]">{city.description}</p>

        {/* Bars */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-3.5 w-3.5 text-[#6B6B6B]" />
            <span className="text-[#6B6B6B] w-16">생활비</span>
            <BarChart value={city.costOfLiving} color="bg-[#FF6B35]" />
            <span className="text-xs text-[#6B6B6B] w-6">{city.costOfLiving}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wifi className="h-3.5 w-3.5 text-[#6B6B6B]" />
            <span className="text-[#6B6B6B] w-16">인터넷</span>
            <BarChart value={city.internetSpeed} color="bg-[#1B9AAA]" />
            <span className="text-xs text-[#6B6B6B] w-6">{city.internetSpeed}</span>
          </div>
        </div>

        {/* Network quality */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#6B6B6B]">네트워크</span>
          <NetworkDots quality={city.networkQuality} />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-[#6B6B6B]" />
            <span className="text-[#6B6B6B]">코워킹</span>
            <span className="font-medium text-[#4A4A4A] dark:text-foreground">
              {city.coworkingCount}개
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#6B6B6B]">추천지역</span>
            <span className="font-medium text-[#4A4A4A] dark:text-foreground">
              {city.recommendedArea}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between pt-1 border-t border-[#1B9AAA]/10">
          <StarRating rating={city.rating} />
          <span className="text-sm text-[#6B6B6B]">
            <span className="font-semibold text-[#4A4A4A] dark:text-foreground">
              {city.rating}
            </span>{" "}
            ({city.reviewCount.toLocaleString()}개 리뷰)
          </span>
        </div>
      </div>
    </Link>
  );
}
