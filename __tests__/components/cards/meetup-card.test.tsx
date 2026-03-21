import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MeetupCard } from "@/components/cards/meetup-card";
import type { Meetup } from "@/lib/mock-data";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const baseMeetup: Meetup = {
  id: "meetup-1",
  title: "서울 디지털 노마드 네트워킹",
  date: "2025-04-10",
  city: "서울",
  rsvp: 12,
  description: "네트워킹 행사입니다.",
  category: "네트워킹",
  maxAttendees: 30,
  organizer: "홍길동",
  tags: ["네트워킹", "서울"],
};

describe("MeetupCard", () => {
  it("meetup.title을 렌더링한다", () => {
    render(<MeetupCard meetup={baseMeetup} />);
    expect(screen.getByText("서울 디지털 노마드 네트워킹")).toBeInTheDocument();
  });

  it("meetup.category 배지를 표시한다", () => {
    render(<MeetupCard meetup={baseMeetup} />);
    expect(screen.getByText("네트워킹")).toBeInTheDocument();
  });

  it("meetup.city 배지를 표시한다", () => {
    render(<MeetupCard meetup={baseMeetup} />);
    expect(screen.getByText("서울")).toBeInTheDocument();
  });

  it("meetup.date와 meetup.organizer를 표시한다", () => {
    render(<MeetupCard meetup={baseMeetup} />);
    expect(screen.getByText("2025-04-10")).toBeInTheDocument();
    expect(screen.getByText("홍길동")).toBeInTheDocument();
  });

  it("rsvp / maxAttendees 인원을 표시한다", () => {
    render(<MeetupCard meetup={baseMeetup} />);
    expect(screen.getByText("RSVP 12명 / 30명")).toBeInTheDocument();
  });

  it("'네트워킹' 카테고리 배지에 올바른 색상 클래스가 적용된다", () => {
    render(<MeetupCard meetup={{ ...baseMeetup, category: "네트워킹" }} />);
    const badge = screen.getByText("네트워킹");
    expect(badge).toHaveClass("bg-[#1B9AAA]/10");
    expect(badge).toHaveClass("text-[#1B9AAA]");
  });

  it("'스터디' 카테고리 배지에 올바른 색상 클래스가 적용된다", () => {
    render(<MeetupCard meetup={{ ...baseMeetup, category: "스터디" }} />);
    const badge = screen.getByText("스터디");
    expect(badge).toHaveClass("bg-purple-100");
    expect(badge).toHaveClass("text-purple-700");
  });

  it("'워크숍' 카테고리 배지에 올바른 색상 클래스가 적용된다", () => {
    render(<MeetupCard meetup={{ ...baseMeetup, category: "워크숍" }} />);
    const badge = screen.getByText("워크숍");
    expect(badge).toHaveClass("bg-orange-100");
    expect(badge).toHaveClass("text-orange-700");
  });

  it("'소셜' 카테고리 배지에 올바른 색상 클래스가 적용된다", () => {
    render(<MeetupCard meetup={{ ...baseMeetup, category: "소셜" }} />);
    const badge = screen.getByText("소셜");
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-700");
  });

  it("정의되지 않은 카테고리에는 fallback 색상 클래스가 적용된다", () => {
    const unknownMeetup = {
      ...baseMeetup,
      category: "기타" as Meetup["category"],
    };
    render(<MeetupCard meetup={unknownMeetup} />);
    const badge = screen.getByText("기타");
    expect(badge).toHaveClass("bg-gray-100");
    expect(badge).toHaveClass("text-gray-600");
  });

  it("링크 href가 `/meetups/${meetup.id}` 로 설정된다", () => {
    render(<MeetupCard meetup={baseMeetup} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/meetups/meetup-1");
  });
});
