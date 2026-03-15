import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CoworkingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <h1 className="text-3xl font-bold text-[#4A4A4A] mb-4">코워킹</h1>
        <p className="text-[#6B6B6B]">준비 중입니다.</p>
      </main>
      <Footer />
    </div>
  );
}
