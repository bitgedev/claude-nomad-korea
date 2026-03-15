"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Review } from "@/lib/mock-data";

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

type ReviewCardProps = {
  review: Review;
  helpfulCount?: number;
  onHelpfulToggle?: (id: string, liked: boolean) => void;
};

export function ReviewCard({ review, helpfulCount = 0, onHelpfulToggle }: ReviewCardProps) {
  const [liked, setLiked] = useState(false);

  function handleHelpful() {
    const next = !liked;
    setLiked(next);
    onHelpfulToggle?.(review.id, next);
  }

  return (
    <div className="bg-white dark:bg-card border border-[#1B9AAA]/10 rounded-3xl p-6 flex flex-col gap-4 hover:shadow-[0_6px_24px_rgba(27,154,170,0.10)] transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-[#4A4A4A] dark:text-foreground">
            {review.nickname}
          </span>
          <StarRating rating={review.rating} />
        </div>
        <Badge variant="outline" className="text-xs border-[#1B9AAA]/30 text-[#1B9AAA]">
          {review.cityName}
        </Badge>
      </div>

      {/* Content */}
      <p className="text-sm text-[#6B6B6B] leading-relaxed flex-1">{review.content}</p>

      {/* Footer */}
      <div className="flex flex-col gap-2 pt-2 border-t border-[#1B9AAA]/10">
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#6B6B6B]">{review.date}</p>
          <button
            onClick={handleHelpful}
            className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full border transition-colors ${
              liked
                ? "border-[#FF6B35]/40 text-[#FF6B35] bg-[#FF6B35]/5"
                : "border-[#4A4A4A]/20 text-[#6B6B6B] hover:border-[#FF6B35]/40 hover:text-[#FF6B35]"
            }`}
          >
            👍 도움이 됐어요 {helpfulCount > 0 && <span>{helpfulCount}</span>}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {review.hashtags.map((tag) => (
            <span key={tag} className="text-xs text-[#1B9AAA] hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
