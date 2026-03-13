import { SearchInput } from "./search-input";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 py-24 md:py-32">
      {/* Decorative background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="inline-flex items-center gap-2 self-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300">
            🚀 한국 디지털 노마드 정보 플랫폼 #1
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            한국 최고의{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              디지털 노마드 도시
            </span>
            를<br className="hidden sm:block" /> 찾아보세요
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            실제 노마드들의 생생한 리뷰와 데이터로 최적의 한국 거점 도시를 발견하세요.
            코워킹 스페이스, 밋업, 생활비 정보를 한 곳에서.
          </p>
        </div>

        <SearchInput />

        <p className="text-sm text-muted-foreground">
          현재{" "}
          <span className="font-semibold text-foreground">3,800+</span>명의 노마드가
          활동 중
        </p>
      </div>
    </section>
  );
}
