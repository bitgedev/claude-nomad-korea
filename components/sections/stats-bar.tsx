import { MapPin, Star, Calendar, Users } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "23",
    label: "등록 도시",
    color: "text-[#1B9AAA]",
    bg: "bg-[#1B9AAA]/10",
  },
  {
    icon: Star,
    value: "1,240",
    label: "누적 평가",
    color: "text-[#FF6B35]",
    bg: "bg-[#FF6B35]/10",
  },
  {
    icon: Calendar,
    value: "18",
    label: "이달 밋업",
    color: "text-[#4CAF50]",
    bg: "bg-[#4CAF50]/10",
  },
  {
    icon: Users,
    value: "3,800",
    label: "월 활성 유저",
    color: "text-[#1B9AAA]",
    bg: "bg-[#1B9AAA]/10",
  },
];

export function StatsBar() {
  return (
    <section className="bg-white dark:bg-card border-y border-[#1B9AAA]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 p-4 rounded-3xl hover:bg-[#FAF7F2] dark:hover:bg-muted/30 transition-colors"
            >
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-center">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-[#6B6B6B] mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
