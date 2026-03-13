import { MapPin, Star, Users, Building2 } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "도시 탐색",
    description:
      "한국 전역 23개 도시의 생활비, 인터넷 속도, 코워킹 환경을 한눈에 비교하세요. 필터와 랭킹으로 나에게 맞는 최적의 거점 도시를 빠르게 찾을 수 있습니다.",
    link: "#",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    icon: Star,
    title: "사용자 평가",
    description:
      "실제 체류 경험을 가진 노마드들의 솔직한 리뷰와 별점을 확인하세요. 인터넷 속도부터 카페 분위기까지, 다른 플랫폼에서 볼 수 없는 생생한 정보가 가득합니다.",
    link: "#",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/50",
  },
  {
    icon: Users,
    title: "밋업 & 커뮤니티",
    description:
      "각 도시의 노마드 밋업, 네트워킹 이벤트, 스터디 모임에 참여하세요. 함께하는 노마드를 만나고, 경험과 정보를 나누며 더 풍요로운 노마드 라이프를 즐기세요.",
    link: "#",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/50",
  },
  {
    icon: Building2,
    title: "코워킹 디렉토리",
    description:
      "전국 코워킹 스페이스를 가격, 위치, 시설 기준으로 검색하세요. 일일권부터 월정액까지, 내 작업 스타일에 맞는 최적의 코워킹 공간을 찾아드립니다.",
    link: "#",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/50",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Nomad Korea가 제공하는 것
          </h2>
          <p className="text-muted-foreground text-lg">
            디지털 노마드에게 필요한 모든 정보를 한 곳에서
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <a
                href={feature.link}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-auto"
              >
                더 보기 →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
