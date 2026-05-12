import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1B9AAA] via-[#2D9E7A] to-[#2D6A4F] relative overflow-hidden">
      {/* Decorative organic shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#FF6B35]/20 blur-2xl"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            지금 바로 가입하고
            <br />
            나만의 노마드 여정을 기록해보세요
          </h2>
          <p className="text-white/80 text-lg">무료로 시작하세요.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-[#1B9AAA] hover:bg-white/90 font-semibold px-8 h-12 text-base rounded-full"
          >
            무료 가입하기 →
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base rounded-full"
          >
            더 알아보기
          </Button>
        </div>
        <p className="text-white/70 text-sm">
          이미 <span className="font-semibold text-white">3,800+</span>명의
          노마드가 함께하고 있어요
        </p>
      </div>
    </section>
  );
}
