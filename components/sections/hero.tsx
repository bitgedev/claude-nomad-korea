import { SearchInput } from "./search-input";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#E8F7F8] to-[#F0FAF5] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-24 md:py-32">
      {/* Decorative background blobs — ocean wave feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#1B9AAA]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#4CAF50]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#FF6B35]/5 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="inline-flex items-center gap-2 self-center rounded-full bg-[#1B9AAA]/10 border border-[#1B9AAA]/20 px-4 py-1.5 text-sm font-medium text-[#1B9AAA]">
            🌊 한국 디지털 노마드 정보 플랫폼 #1
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#4A4A4A] dark:text-foreground leading-tight">
            한국 최고의{" "}
            <span className="bg-gradient-to-r from-[#1B9AAA] to-[#2D6A4F] bg-clip-text text-transparent">
              디지털 노마드 도시
            </span>
            를<br className="hidden sm:block" /> 찾아보세요
          </h1>
          <p className="text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            실제 노마드들의 생생한 리뷰와 데이터로 최적의 한국 거점 도시를 발견하세요.
            코워킹 스페이스, 밋업, 생활비 정보를 한 곳에서.
          </p>
        </div>

        <SearchInput />

        <p className="text-sm text-[#6B6B6B]">
          현재{" "}
          <span className="font-semibold text-[#1B9AAA]">3,800+</span>명의 노마드가
          활동 중
        </p>
      </div>
    </section>
  );
}
