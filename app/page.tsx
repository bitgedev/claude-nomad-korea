import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { TopCities } from "@/components/sections/top-cities";
import { Features } from "@/components/sections/features";
import { Activity } from "@/components/sections/activity";
import { Reviews } from "@/components/sections/reviews";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <TopCities />
        <Features />
        <Activity />
        <Reviews />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
