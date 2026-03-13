import { reviews } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-base ${i <= rating ? "text-yellow-400" : "text-muted-foreground/30"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            최신 리뷰
          </h2>
          <p className="text-muted-foreground text-lg">
            실제 노마드들의 생생한 후기
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground">{review.nickname}</span>
                  <StarRating rating={review.rating} />
                </div>
                <Badge variant="outline" className="text-xs">
                  {review.cityName}
                </Badge>
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {review.content}
              </p>

              {/* Footer */}
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">{review.date}</p>
                <div className="flex flex-wrap gap-1.5">
                  {review.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
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
