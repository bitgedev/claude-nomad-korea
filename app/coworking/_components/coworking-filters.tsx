"use client";

import { useRouter, usePathname } from "next/navigation";

const CITIES = ["서울", "부산", "제주"];
const PRICE_OPTIONS = [
  { value: "", label: "전체 가격" },
  { value: "low", label: "~2만원" },
  { value: "mid", label: "2~3만원" },
  { value: "high", label: "3만원+" },
];
const AMENITIES = ["와이파이", "프린터", "회의실", "카페"];

type CoworkingFiltersProps = {
  currentCity: string;
  currentPrice: string;
  currentAmenity: string;
};

export function CoworkingFilters({
  currentCity,
  currentPrice,
  currentAmenity,
}: CoworkingFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  function buildParams(updates: Record<string, string>) {
    const params = new URLSearchParams();
    if (currentCity) params.set("city", currentCity);
    if (currentPrice) params.set("price", currentPrice);
    if (currentAmenity) params.set("amenity", currentAmenity);
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  function handleCity(city: string) {
    router.push(buildParams({ city: currentCity === city ? "" : city }));
  }

  function handlePrice(price: string) {
    router.push(buildParams({ price }));
  }

  function handleAmenity(amenity: string) {
    router.push(buildParams({ amenity: currentAmenity === amenity ? "" : amenity }));
  }

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* 도시 탭 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCity("")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !currentCity
              ? "bg-[#1B9AAA] text-white"
              : "bg-white dark:bg-card border border-[#1B9AAA]/20 text-[#6B6B6B] hover:border-[#1B9AAA]/50"
          }`}
        >
          전체
        </button>
        {CITIES.map((city) => (
          <button
            key={city}
            onClick={() => handleCity(city)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              currentCity === city
                ? "bg-[#1B9AAA] text-white"
                : "bg-white dark:bg-card border border-[#1B9AAA]/20 text-[#6B6B6B] hover:border-[#1B9AAA]/50"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* 가격대 + 편의시설 */}
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={currentPrice}
          onChange={(e) => handlePrice(e.target.value)}
          className="px-3 py-1.5 rounded-full border border-[#1B9AAA]/20 text-sm text-[#4A4A4A] dark:text-foreground bg-white dark:bg-card focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]/30"
        >
          {PRICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((amenity) => (
            <button
              key={amenity}
              onClick={() => handleAmenity(amenity)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentAmenity === amenity
                  ? "bg-[#2D6A4F] text-white"
                  : "bg-white dark:bg-card border border-[#2D6A4F]/20 text-[#6B6B6B] hover:border-[#2D6A4F]/50"
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
