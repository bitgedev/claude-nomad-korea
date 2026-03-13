import { MapPin, Star, Calendar, Users } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "23",
    label: "등록 도시",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    icon: Star,
    value: "1,240",
    label: "누적 평가",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/50",
  },
  {
    icon: Calendar,
    value: "18",
    label: "이달 밋업",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/50",
  },
  {
    icon: Users,
    value: "3,800",
    label: "월 활성 유저",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/50",
  },
];

export function StatsBar() {
  return (
    <section className="bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
