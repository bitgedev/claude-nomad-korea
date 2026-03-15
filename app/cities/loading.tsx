export default function CitiesLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 bg-white dark:bg-card border-b border-border" />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* 헤더 스켈레톤 */}
        <div className="mb-8 flex flex-col gap-2">
          <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 w-64 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>

        {/* 필터 스켈레톤 */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="h-10 w-full rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ))}
          </div>
        </div>

        {/* 카드 그리드 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-5 w-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="h-3.5 w-12 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  </div>
                </div>
                <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
              <div className="h-4 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="flex flex-col gap-2">
                <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
              <div className="h-3 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
