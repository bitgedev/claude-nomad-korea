import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewCard } from "@/components/cards/review-card";
import type { Review } from "@/lib/mock-data";

const baseReview: Review = {
  id: "review-1",
  cityName: "부산",
  nickname: "바다노마드",
  rating: 4,
  date: "2025-03-15",
  content: "부산은 코워킹 환경이 정말 좋았어요.",
  hashtags: ["#부산", "#코워킹", "#바다뷰"],
};

describe("ReviewCard", () => {
  it("nickname, cityName, content, date를 렌더링한다", () => {
    render(<ReviewCard review={baseReview} />);
    expect(screen.getByText("바다노마드")).toBeInTheDocument();
    expect(screen.getByText("부산")).toBeInTheDocument();
    expect(screen.getByText("부산은 코워킹 환경이 정말 좋았어요.")).toBeInTheDocument();
    expect(screen.getByText("2025-03-15")).toBeInTheDocument();
  });

  it("rating 만큼 별이 filled 색상(text-[#FF6B35])이고 나머지는 unfilled 색상(text-[#4A4A4A]/20)이다", () => {
    render(<ReviewCard review={baseReview} />);
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);

    // rating=4 이므로 앞 4개는 filled, 마지막 1개는 unfilled
    const filledStars = stars.filter((s) => s.className.includes("text-[#FF6B35]"));
    const unfilledStars = stars.filter((s) => s.className.includes("text-[#4A4A4A]/20"));
    expect(filledStars).toHaveLength(4);
    expect(unfilledStars).toHaveLength(1);
  });

  it("rating=1 이면 별 1개만 filled이고 나머지 4개는 unfilled이다", () => {
    render(<ReviewCard review={{ ...baseReview, rating: 1 }} />);
    const stars = screen.getAllByText("★");
    const filledStars = stars.filter((s) => s.className.includes("text-[#FF6B35]"));
    const unfilledStars = stars.filter((s) => s.className.includes("text-[#4A4A4A]/20"));
    expect(filledStars).toHaveLength(1);
    expect(unfilledStars).toHaveLength(4);
  });

  it("review.hashtags 각 항목을 렌더링한다", () => {
    render(<ReviewCard review={baseReview} />);
    expect(screen.getByText("#부산")).toBeInTheDocument();
    expect(screen.getByText("#코워킹")).toBeInTheDocument();
    expect(screen.getByText("#바다뷰")).toBeInTheDocument();
  });

  it("helpfulCount > 0이면 숫자를 표시한다", () => {
    render(<ReviewCard review={baseReview} helpfulCount={7} />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("helpfulCount = 0이면 숫자를 표시하지 않는다", () => {
    render(<ReviewCard review={baseReview} helpfulCount={0} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("'도움이 됐어요' 버튼 클릭 시 liked 상태가 토글되어 버튼 클래스가 변경된다", () => {
    render(<ReviewCard review={baseReview} />);
    const button = screen.getByRole("button", { name: /도움이 됐어요/ });

    // 초기 상태: unliked 클래스
    expect(button).toHaveClass("border-[#4A4A4A]/20");
    expect(button).toHaveClass("text-[#6B6B6B]");

    fireEvent.click(button);

    // liked 상태: liked 클래스
    expect(button).toHaveClass("border-[#FF6B35]/40");
    expect(button).toHaveClass("text-[#FF6B35]");
  });

  it("'도움이 됐어요' 클릭 시 onHelpfulToggle(review.id, true)가 호출된다", () => {
    const onHelpfulToggle = vi.fn();
    render(<ReviewCard review={baseReview} onHelpfulToggle={onHelpfulToggle} />);
    const button = screen.getByRole("button", { name: /도움이 됐어요/ });

    fireEvent.click(button);

    expect(onHelpfulToggle).toHaveBeenCalledTimes(1);
    expect(onHelpfulToggle).toHaveBeenCalledWith("review-1", true);
  });

  it("두 번 클릭 시 onHelpfulToggle(review.id, false)가 호출된다", () => {
    const onHelpfulToggle = vi.fn();
    render(<ReviewCard review={baseReview} onHelpfulToggle={onHelpfulToggle} />);
    const button = screen.getByRole("button", { name: /도움이 됐어요/ });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(onHelpfulToggle).toHaveBeenCalledTimes(2);
    expect(onHelpfulToggle).toHaveBeenNthCalledWith(1, "review-1", true);
    expect(onHelpfulToggle).toHaveBeenNthCalledWith(2, "review-1", false);
  });

  it("onHelpfulToggle prop이 없어도 클릭 시 에러가 발생하지 않는다", () => {
    render(<ReviewCard review={baseReview} />);
    const button = screen.getByRole("button", { name: /도움이 됐어요/ });
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
