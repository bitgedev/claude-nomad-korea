import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { MeetupCard } from "@/components/cards/meetup-card";
import { RsvpButton } from "./_components/rsvp-button";
import { createClient } from "@/lib/supabase/server";
import { rowToMeetup } from "@/lib/supabase/mappers";
import { Calendar, MapPin, User } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  네트워킹: "bg-[#1B9AAA]/10 text-[#1B9AAA]",
  스터디: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  워크숍: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  소셜: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MeetupDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: meetupRow }, { data: relatedRows }, { data: { user } }] = await Promise.all([
    supabase.from("meetups").select("*").eq("id", id).single(),
    supabase.from("meetups").select("*").neq("id", id),
    supabase.auth.getUser(),
  ]);

  if (!meetupRow) notFound();

  const meetup = rowToMeetup(meetupRow);
  const related = (relatedRows ?? [])
    .filter((m) => m.city === meetupRow.city)
    .slice(0, 3)
    .map(rowToMeetup);

  // Check if current user has RSVPed
  let hasRsvped = false;
  if (user) {
    const { data: rsvpRow } = await supabase
      .from("meetup_rsvps")
      .select("user_id")
      .eq("meetup_id", id)
      .eq("user_id", user.id)
      .maybeSingle();
    hasRsvped = !!rsvpRow;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "홈", href: "/" },
              { label: "밋업", href: "/meetups" },
              { label: meetup.title },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 본문 */}
          <div className="lg:col-span-2">
            {/* 헤더 */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge
                  variant="secondary"
                  className={`text-xs border-0 ${CATEGORY_COLORS[meetup.category] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {meetup.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-xs bg-[#1B9AAA]/10 text-[#1B9AAA] border-0"
                >
                  {meetup.city}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#4A4A4A] dark:text-foreground mb-4">
                {meetup.title}
              </h1>
              <div className="flex flex-col gap-2 text-sm text-[#6B6B6B]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#1B9AAA]" />
                  <span>{meetup.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#1B9AAA]" />
                  <span>{meetup.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#1B9AAA]" />
                  <span>{meetup.organizer} 주최</span>
                </div>
              </div>
            </div>

            {/* 상세 설명 */}
            <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-2xl p-6 mb-6">
              <h2 className="font-semibold text-[#4A4A4A] dark:text-foreground mb-3">밋업 소개</h2>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">{meetup.description}</p>
            </div>

            {/* 태그 */}
            {meetup.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {meetup.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-[#1B9AAA]/5 text-[#1B9AAA] rounded-full border border-[#1B9AAA]/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 사이드바: RSVP */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-2xl p-6 sticky top-24">
              <h2 className="font-semibold text-[#4A4A4A] dark:text-foreground mb-4">참가 신청</h2>
              <RsvpButton
                meetupId={id}
                initialRsvp={meetup.rsvp}
                maxAttendees={meetup.maxAttendees}
                initialHasRsvped={hasRsvped}
                isLoggedIn={!!user}
              />
            </div>
          </div>
        </div>

        {/* 관련 밋업 */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-[#4A4A4A] dark:text-foreground mb-4">
              {meetup.city} 다른 밋업
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((m) => (
                <MeetupCard key={m.id} meetup={m} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
