import Link from "next/link";
import { coworkingSpaces } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CoworkingCard } from "@/components/cards/coworking-card";
import { EmptyState } from "@/components/ui/empty-state";
import { CoworkingFilters } from "./_components/coworking-filters";

type SearchParams = {
  city?: string;
  price?: string;
  amenity?: string;
};

function getFilteredSpaces(params: SearchParams) {
  let result = [...coworkingSpaces];

  if (params.city) {
    result = result.filter((s) => s.city === params.city);
  }

  if (params.price) {
    switch (params.price) {
      case "low":
        result = result.filter((s) => s.pricePerDay <= 20000);
        break;
      case "mid":
        result = result.filter((s) => s.pricePerDay > 20000 && s.pricePerDay <= 30000);
        break;
      case "high":
        result = result.filter((s) => s.pricePerDay > 30000);
        break;
    }
  }

  if (params.amenity) {
    const amenityMap: Record<string, string> = {
      와이파이: "wifi",
    };
    if (params.amenity === "와이파이") {
      result = result.filter((s) => s.wifi);
    } else {
      const target = amenityMap[params.amenity] ?? params.amenity;
      result = result.filter((s) => s.amenities.includes(target) || s.amenities.includes(params.amenity!));
    }
  }

  return result;
}

export default async function CoworkingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filtered = getFilteredSpaces(params);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#4A4A4A] dark:text-foreground mb-2">
              💻 코워킹 스페이스
            </h1>
            <p className="text-[#6B6B6B]">
              전국 코워킹 스페이스 {coworkingSpaces.length}곳을 탐색하세요
            </p>
          </div>

          <CoworkingFilters
            currentCity={params.city ?? ""}
            currentPrice={params.price ?? ""}
            currentAmenity={params.amenity ?? ""}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* 카드 목록 */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <EmptyState
                  icon="🔍"
                  message="조건에 맞는 코워킹 스페이스가 없습니다."
                  actionLabel="필터 초기화"
                  actionHref="/coworking"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((space) => (
                    <Link key={space.id} href={`/coworking/${space.id}`}>
                      <CoworkingCard space={space} />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 지도 플레이스홀더 */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-3 h-96 text-center px-6">
                <span className="text-4xl">🗺️</span>
                <p className="text-sm font-medium text-[#4A4A4A] dark:text-foreground">
                  지도 기능 준비 중
                </p>
                <p className="text-xs text-[#6B6B6B]">
                  지도 기반 코워킹 탐색 기능이 곧 추가됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
