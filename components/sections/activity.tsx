import { nomads, meetups } from "@/lib/mock-data";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Activity() {
  return (
    <section className="py-20 bg-[#EDF5EE] dark:bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] dark:text-foreground mb-3">
            실시간 활동
          </h2>
          <p className="text-[#6B6B6B] text-lg">
            지금 이 순간, 노마드들이 활동 중입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Nomads */}
          <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-3xl p-6 shadow-[0_4px_16px_rgba(27,154,170,0.07)]">
            <h3 className="text-lg font-semibold text-[#4A4A4A] dark:text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-[#1B9AAA]" />
              여행 중인 노마드
            </h3>
            <ul className="flex flex-col gap-3">
              {nomads.map((nomad) => (
                <li
                  key={nomad.id}
                  className="flex items-center justify-between py-2 border-b border-[#1B9AAA]/10 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        nomad.online ? "bg-[#4CAF50]" : "bg-[#6B6B6B]/30"
                      }`}
                    />
                    <span className="font-medium text-[#4A4A4A] dark:text-foreground text-sm">
                      {nomad.nickname}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[#6B6B6B]">
                    <MapPin className="h-3.5 w-3.5 text-[#1B9AAA]" />
                    {nomad.city}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Meetups */}
          <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-3xl p-6 shadow-[0_4px_16px_rgba(27,154,170,0.07)]">
            <h3 className="text-lg font-semibold text-[#4A4A4A] dark:text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#4CAF50]" />
              다가오는 밋업
            </h3>
            <ul className="flex flex-col gap-3">
              {meetups.map((meetup) => (
                <li
                  key={meetup.id}
                  className="flex flex-col gap-1 py-2 border-b border-[#1B9AAA]/10 last:border-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-[#4A4A4A] dark:text-foreground text-sm leading-snug">
                      {meetup.title}
                    </span>
                    <Badge
                      variant="secondary"
                      className="flex-shrink-0 text-xs bg-[#1B9AAA]/10 text-[#1B9AAA] border-0"
                    >
                      {meetup.city}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                    <span>{meetup.date}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      RSVP {meetup.rsvp}명
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
