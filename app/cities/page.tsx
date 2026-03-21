import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CityCard } from "@/components/cards/city-card";
import { CityFilters } from "./_components/city-filters";
import { createClient } from "@/lib/supabase/server";
import { rowToCity } from "@/lib/supabase/mappers";
import type { City } from "@/lib/mock-data";

type SearchParams = {
  q?: string;
  sort?: string;
  tag?: string;
};

function applyFilters(cities: City[], params: SearchParams): City[] {
  let result = [...cities];

  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.includes(params.q!) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.tags.some((t) => t.includes(params.q!))
    );
  }

  if (params.tag) {
    result = result.filter((c) => c.tags.includes(params.tag!));
  }

  switch (params.sort) {
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "reviews":
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "cost":
      result.sort((a, b) => a.costOfLiving - b.costOfLiving);
      break;
    case "internet":
      result.sort((a, b) => b.internetSpeed - a.internetSpeed);
      break;
    default:
      result.sort((a, b) => a.rank - b.rank);
  }

  return result;
}

export default async function CitiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const { data } = await supabase.from("cities").select("*").order("rank");
  const cities = (data ?? []).map(rowToCity);
  const filteredCities = applyFilters(cities, params);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#4A4A4A] dark:text-foreground mb-2">
              🏙️ 도시 랭킹
            </h1>
            <p className="text-[#6B6B6B]">
              실제 노마드 평가 기반 인기 도시를 탐색하세요
            </p>
          </div>

          <CityFilters
            currentQuery={params.q ?? ""}
            currentSort={params.sort ?? "rank"}
            currentTag={params.tag ?? ""}
          />

          {filteredCities.length === 0 ? (
            <div className="text-center py-20 text-[#6B6B6B]">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-medium mb-2">검색 결과가 없습니다</p>
              <p className="text-sm">다른 검색어나 필터를 시도해보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCities.map((city, idx) => (
                <CityCard key={city.id} city={city} rankIndex={idx} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
