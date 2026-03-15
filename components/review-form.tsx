"use client";

import { useRef, useState } from "react";
import { cities } from "@/lib/mock-data";
import type { Review } from "@/lib/mock-data";

type ReviewFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (review: Review) => void;
};

const CITY_NAMES = cities.map((c) => c.name);

// 모듈 레벨 카운터 — 렌더 외부에서 고유 값 생성
let _nicknameSeq = 1000;
function nextNickname() {
  _nicknameSeq += 1;
  return `익명_${_nicknameSeq}`;
}

let _reviewSeq = 0;
function nextReviewId() {
  _reviewSeq += 1;
  return `user-${_reviewSeq}`;
}

function InteractiveStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className={`text-2xl transition-colors ${
            i <= (hovered || value) ? "text-[#FF6B35]" : "text-[#4A4A4A]/20"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function ReviewForm({ open, onOpenChange, onSubmit }: ReviewFormProps) {
  const [nickname, setNickname] = useState(() => nextNickname());
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  function validate() {
    const next: Record<string, string> = {};
    if (!city) next.city = "도시를 선택해 주세요.";
    if (!rating) next.rating = "별점을 선택해 주세요.";
    if (content.trim().length < 50) next.content = "내용을 50자 이상 입력해 주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const review: Review = {
      id: nextReviewId(),
      cityName: city,
      nickname: nickname.trim() || nickname,
      rating,
      date: new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      content: content.trim(),
      hashtags: hashtags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => (t.startsWith("#") ? t : `#${t}`)),
    };

    onSubmit(review);
    handleClose();
  }

  function handleClose() {
    onOpenChange(false);
    setCity("");
    setRating(0);
    setContent("");
    setHashtags("");
    setErrors({});
  }

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div className="bg-white dark:bg-card w-full max-w-lg rounded-3xl p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#4A4A4A] dark:text-foreground">리뷰 쓰기</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-[#6B6B6B] hover:text-[#4A4A4A] text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-[#6B6B6B] bg-[#FAF7F2] dark:bg-muted rounded-xl px-3 py-2">
          임시 저장 (새로고침 시 초기화됩니다)
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 닉네임 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#4A4A4A] dark:text-foreground">
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="border border-[#1B9AAA]/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B9AAA] dark:bg-background"
            />
          </div>

          {/* 도시 선택 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#4A4A4A] dark:text-foreground">도시</label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setErrors((prev) => ({ ...prev, city: "" }));
              }}
              className="border border-[#1B9AAA]/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B9AAA] dark:bg-background"
            >
              <option value="">도시를 선택하세요</option>
              {CITY_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
          </div>

          {/* 별점 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#4A4A4A] dark:text-foreground">별점</label>
            <InteractiveStars
              value={rating}
              onChange={(v) => {
                setRating(v);
                setErrors((prev) => ({ ...prev, rating: "" }));
              }}
            />
            {errors.rating && <p className="text-xs text-red-500">{errors.rating}</p>}
          </div>

          {/* 내용 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#4A4A4A] dark:text-foreground">
              내용{" "}
              <span className="text-[#6B6B6B] font-normal">
                ({content.trim().length}/50자 이상)
              </span>
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (e.target.value.trim().length >= 50) {
                  setErrors((prev) => ({ ...prev, content: "" }));
                }
              }}
              rows={4}
              className="border border-[#1B9AAA]/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B9AAA] resize-none dark:bg-background"
              placeholder="도시에서의 경험을 자유롭게 작성해 주세요. (50자 이상)"
            />
            {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
          </div>

          {/* 해시태그 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#4A4A4A] dark:text-foreground">
              해시태그{" "}
              <span className="text-[#6B6B6B] font-normal">(콤마로 구분)</span>
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="카페투어, 인터넷빠름, 가성비"
              className="border border-[#1B9AAA]/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B9AAA] dark:bg-background"
            />
          </div>

          <button
            type="submit"
            className="mt-1 bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white font-semibold rounded-xl py-2.5 transition-colors"
          >
            리뷰 등록
          </button>
        </form>
      </div>
    </div>
  );
}
