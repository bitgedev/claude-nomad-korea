export default function MeetupsLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 bg-white dark:bg-card border-b border-border" />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* 헤더 스켈레톤 */}
        <div className="mb-8 flex flex-col gap-2">
          <div className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 w-60 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>

        {/* 필터 탭 스켈레톤 */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ))}
        </div>

        {/* 하이라이트 섹션 스켈레톤 */}
        <div className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-3">
          <div className="h-5 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-20 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ))}
          </div>
        </div>

        {/* 카드 리스트 스켈레톤 */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="h-5 w-56 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
              <div className="flex gap-3">
                <div className="h-4 w-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-4 w-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-4 w-20 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
