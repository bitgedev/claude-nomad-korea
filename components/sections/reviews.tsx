import Link from "next/link";
import { reviews } from "@/lib/mock-data";
import { ReviewCard } from "@/components/cards/review-card";

export function Reviews() {
  return (
    <section className="py-20 bg-[#FAF7F2] dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] dark:text-foreground mb-3">
            최신 리뷰
          </h2>
          <p className="text-[#6B6B6B] text-lg">실제 노마드들의 생생한 후기</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[#1B9AAA] font-medium hover:underline"
          >
            전체 리뷰 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
