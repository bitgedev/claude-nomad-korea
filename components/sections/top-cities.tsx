import { cities } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wifi, DollarSign, Building2 } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-sm ${i <= Math.round(rating) ? "text-yellow-400" : "text-muted-foreground/30"}`}
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
          className={`text-xs ${i <= quality ? "text-indigo-500" : "text-muted-foreground/30"}`}
        >
          ◆
        </span>
      ))}
    </div>
  );
}

function BarChart({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

const rankColors = ["bg-yellow-400 text-yellow-900", "bg-slate-300 text-slate-700", "bg-amber-600 text-amber-100"];
const badgeVariants: Record<string, string> = {
  "인기 1위": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "가성비 최고": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  "자연 최고": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
};

export function TopCities() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            🏆 TOP 도시 랭킹
          </h2>
          <p className="text-muted-foreground text-lg">
            실제 노마드 평가 기반 인기 도시 순위
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cities.map((city, idx) => (
            <div
              key={city.id}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow flex flex-col gap-4"
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
                    <h3 className="text-xl font-bold text-foreground">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">{city.nameEn}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeVariants[city.badge] ?? "bg-muted text-muted-foreground"}`}
                >
                  {city.badge}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{city.description}</p>

              {/* Bars */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground w-16">생활비</span>
                  <BarChart value={city.costOfLiving} color="bg-blue-400" />
                  <span className="text-xs text-muted-foreground w-6">{city.costOfLiving}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Wifi className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground w-16">인터넷</span>
                  <BarChart value={city.internetSpeed} color="bg-indigo-400" />
                  <span className="text-xs text-muted-foreground w-6">{city.internetSpeed}</span>
                </div>
              </div>

              {/* Network quality */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">네트워크</span>
                <NetworkDots quality={city.networkQuality} />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">코워킹</span>
                  <span className="font-medium text-foreground">{city.coworkingCount}개</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">추천지역</span>
                  <span className="font-medium text-foreground">{city.recommendedArea}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between pt-1 border-t border-border">
                <StarRating rating={city.rating} />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{city.rating}</span> ({city.reviewCount.toLocaleString()}개 리뷰)
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg" className="gap-1">
            전체 도시 보기 →
          </Button>
        </div>
      </div>
    </section>
  );
}
