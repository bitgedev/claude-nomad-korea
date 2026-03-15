import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import type { Meetup } from "@/lib/mock-data";

const CATEGORY_COLORS: Record<string, string> = {
  네트워킹: "bg-[#1B9AAA]/10 text-[#1B9AAA]",
  스터디: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  워크숍: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  소셜: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
};

interface MeetupCardProps {
  meetup: Meetup;
}

export function MeetupCard({ meetup }: MeetupCardProps) {
  return (
    <Link href={`/meetups/${meetup.id}`}>
      <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-2xl p-5 shadow-[0_2px_8px_rgba(27,154,170,0.06)] hover:shadow-[0_4px_16px_rgba(27,154,170,0.12)] hover:border-[#1B9AAA]/30 transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge
            variant="secondary"
            className={`text-xs border-0 flex-shrink-0 ${CATEGORY_COLORS[meetup.category] ?? "bg-gray-100 text-gray-600"}`}
          >
            {meetup.category}
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-[#1B9AAA]/10 text-[#1B9AAA] border-0 flex-shrink-0"
          >
            {meetup.city}
          </Badge>
        </div>

        <h3 className="font-semibold text-[#4A4A4A] dark:text-foreground text-sm leading-snug mb-3 line-clamp-2">
          {meetup.title}
        </h3>

        <div className="flex flex-col gap-1.5 text-xs text-[#6B6B6B]">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#1B9AAA] flex-shrink-0" />
            <span>{meetup.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#1B9AAA] flex-shrink-0" />
            <span>{meetup.organizer}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-[#1B9AAA] flex-shrink-0" />
            <span>
              RSVP {meetup.rsvp}명 / {meetup.maxAttendees}명
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
