import Link from "next/link";
import { cities } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { CityCard } from "@/components/cards/city-card";

export function TopCities() {
  return (
    <section className="py-20 bg-[#EDF5EE] dark:bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] dark:text-foreground mb-3">
            🏆 TOP 도시 랭킹
          </h2>
          <p className="text-[#6B6B6B] text-lg">
            실제 노마드 평가 기반 인기 도시 순위
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cities.map((city, idx) => (
            <CityCard key={city.id} city={city} rankIndex={idx} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="gap-1 rounded-full border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/10 hover:text-[#1B9AAA]"
            nativeButton={false}
            render={<Link href="/cities" />}
          >
            전체 도시 보기 →
          </Button>
        </div>
      </div>
    </section>
  );
}
