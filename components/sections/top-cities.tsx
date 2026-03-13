import { cities } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Wifi, DollarSign, Building2 } from "lucide-react";

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
            <div
              key={city.id}
              className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-3xl p-6 hover:shadow-[0_8px_30px_rgba(27,154,170,0.12)] transition-shadow flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${rankColors[idx]}`}
                  >
                    {city.rank}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[#4A4A4A] dark:text-foreground">{city.name}</h3>
                    <p className="text-sm text-[#6B6B6B]">{city.nameEn}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeVariants[city.badge] ?? "bg-[#FAF7F2] text-[#6B6B6B]"}`}
                >
                  {city.badge}
                </span>
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
                  <span className="font-medium text-[#4A4A4A] dark:text-foreground">{city.coworkingCount}개</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#6B6B6B]">추천지역</span>
                  <span className="font-medium text-[#4A4A4A] dark:text-foreground">{city.recommendedArea}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between pt-1 border-t border-[#1B9AAA]/10">
                <StarRating rating={city.rating} />
                <span className="text-sm text-[#6B6B6B]">
                  <span className="font-semibold text-[#4A4A4A] dark:text-foreground">{city.rating}</span> ({city.reviewCount.toLocaleString()}개 리뷰)
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="gap-1 rounded-full border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/10 hover:text-[#1B9AAA]"
          >
            전체 도시 보기 →
          </Button>
        </div>
      </div>
    </section>
  );
}
