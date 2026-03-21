import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MeetupFilters } from "./_components/meetup-filters";
import { createClient } from "@/lib/supabase/server";
import { rowToMeetup } from "@/lib/supabase/mappers";

export default async function MeetupsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("meetups").select("*").order("id");
  const meetups = (data ?? []).map(rowToMeetup);
  const highlightMeetups = meetups.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4A4A4A] dark:text-foreground mb-2">밋업</h1>
          <p className="text-[#6B6B6B]">노마드들의 오프라인 모임을 찾아보세요</p>
        </div>
        <Suspense fallback={<div className="text-[#6B6B6B]">불러오는 중...</div>}>
          <MeetupFilters meetups={meetups} highlightMeetups={highlightMeetups} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
