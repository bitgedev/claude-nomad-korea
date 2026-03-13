import { reviews } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-base ${i <= rating ? "text-[#FF6B35]" : "text-[#4A4A4A]/20"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="py-20 bg-[#FAF7F2] dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] dark:text-foreground mb-3">
            최신 리뷰
          </h2>
          <p className="text-[#6B6B6B] text-lg">
            실제 노마드들의 생생한 후기
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-card border border-[#1B9AAA]/10 rounded-3xl p-6 flex flex-col gap-4 hover:shadow-[0_6px_24px_rgba(27,154,170,0.10)] transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[#4A4A4A] dark:text-foreground">{review.nickname}</span>
                  <StarRating rating={review.rating} />
                </div>
                <Badge
                  variant="outline"
                  className="text-xs border-[#1B9AAA]/30 text-[#1B9AAA]"
                >
                  {review.cityName}
                </Badge>
              </div>

              {/* Content */}
              <p className="text-sm text-[#6B6B6B] leading-relaxed flex-1">
                {review.content}
              </p>

              {/* Footer */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#1B9AAA]/10">
                <p className="text-xs text-[#6B6B6B]">{review.date}</p>
                <div className="flex flex-wrap gap-1.5">
                  {review.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#1B9AAA] hover:underline cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
