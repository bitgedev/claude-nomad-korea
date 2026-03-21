import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CityTabs } from "./_components/city-tabs";
import { Wifi, DollarSign, Building2, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { rowToCity, rowToReview, rowToCoworkingSpace } from "@/lib/supabase/mappers";

const badgeVariants: Record<string, string> = {
  "인기 1위": "bg-[#1B9AAA]/10 text-[#1B9AAA] border border-[#1B9AAA]/20",
  "가성비 최고": "bg-[#4CAF50]/10 text-[#2D6A4F] border border-[#4CAF50]/20",
  "자연 최고": "bg-[#4CAF50]/15 text-[#2D6A4F] border border-[#4CAF50]/25",
};

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: cityRow }, { data: reviewRows }, { data: coworkingRows }] = await Promise.all([
    supabase.from("cities").select("*").eq("id", id).single(),
    supabase.from("reviews").select("*").eq("city_name", id),
    supabase.from("coworking_spaces").select("*"),
  ]);

  if (!cityRow) notFound();

  const city = rowToCity(cityRow);

  // reviews are filtered by city_name which stores the Korean name
  // re-fetch with correct city name
  const { data: cityReviewRows } = await supabase
    .from("reviews")
    .select("*")
    .eq("city_name", city.name);

  const cityReviews = (cityReviewRows ?? []).map(rowToReview);
  const cityCoworkingSpaces = (coworkingRows ?? [])
    .filter((s) => s.city === city.name)
    .map(rowToCoworkingSpace);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "홈", href: "/" },
                { label: "도시랭킹", href: "/cities" },
                { label: city.name },
              ]}
            />
          </div>

          {/* Hero */}
          <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-3xl p-8 mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-[#4A4A4A] dark:text-foreground">
                    {city.name}
                  </h1>
                  <span className="text-2xl font-light text-[#6B6B6B]">
                    {city.nameEn}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      badgeVariants[city.badge] ?? "bg-[#FAF7F2] text-[#6B6B6B]"
                    }`}
                  >
                    {city.badge}
                  </span>
                  {city.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-muted text-[#6B6B6B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-5 w-5 text-[#FF6B35] fill-current" />
                <span className="text-2xl font-bold text-[#4A4A4A] dark:text-foreground">
                  {city.rating}
                </span>
                <span className="text-[#6B6B6B] text-sm">
                  ({city.reviewCount.toLocaleString()}개 리뷰)
                </span>
              </div>
            </div>

            <p className="text-[#6B6B6B] mb-6">{city.description}</p>

            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-1 bg-[#FAF7F2] dark:bg-muted/40 rounded-xl p-4">
                <DollarSign className="h-5 w-5 text-[#FF6B35]" />
                <span className="text-xl font-bold text-[#4A4A4A] dark:text-foreground">
                  {city.costOfLiving}
                </span>
                <span className="text-xs text-[#6B6B6B]">생활비 지수</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-[#FAF7F2] dark:bg-muted/40 rounded-xl p-4">
                <Wifi className="h-5 w-5 text-[#1B9AAA]" />
                <span className="text-xl font-bold text-[#4A4A4A] dark:text-foreground">
                  {city.internetSpeed}
                </span>
                <span className="text-xs text-[#6B6B6B]">인터넷 속도</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-[#FAF7F2] dark:bg-muted/40 rounded-xl p-4">
                <Building2 className="h-5 w-5 text-[#4CAF50]" />
                <span className="text-xl font-bold text-[#4A4A4A] dark:text-foreground">
                  {city.coworkingCount}
                </span>
                <span className="text-xs text-[#6B6B6B]">코워킹 스페이스</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <CityTabs
            city={city}
            coworkingSpaces={cityCoworkingSpaces}
            reviews={cityReviews}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
