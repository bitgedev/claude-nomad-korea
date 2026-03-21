import React from "react";
import { describe, it, expect, vi } from "vitest";
import { CoworkingCard } from "@/components/cards/coworking-card";
import {
  renderWithProviders,
  screen,
  fireEvent,
} from "../../helpers/render-with-providers";
import type { CoworkingSpace } from "@/lib/mock-data";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const baseSpace: CoworkingSpace = {
  id: "cowork-1",
  name: "패스트파이브 강남점",
  city: "서울",
  address: "서울 강남구 테헤란로 101",
  pricePerDay: 25000,
  wifi: true,
  amenities: ["프린터", "회의실", "카페"],
  rating: 4.3,
  reviewCount: 87,
};

describe("CoworkingCard", () => {
  it("space.name과 space.address를 렌더링한다", () => {
    renderWithProviders(<CoworkingCard space={baseSpace} />);
    expect(screen.getByText("패스트파이브 강남점")).toBeInTheDocument();
    expect(screen.getByText("서울 강남구 테헤란로 101")).toBeInTheDocument();
  });

  it("space.pricePerDay를 금액 포맷(toLocaleString + '원/일')으로 표시한다", () => {
    renderWithProviders(<CoworkingCard space={baseSpace} />);
    // pricePerDay: 25000 → "25,000원" + "/일"
    expect(screen.getByText("25,000원")).toBeInTheDocument();
    expect(screen.getByText("/일")).toBeInTheDocument();
  });

  it("space.rating과 space.reviewCount를 표시한다", () => {
    renderWithProviders(<CoworkingCard space={baseSpace} />);
    expect(screen.getByText("4.3")).toBeInTheDocument();
    expect(screen.getByText("(87)")).toBeInTheDocument();
  });

  it("space.wifi = true 이면 'WiFi' 텍스트를 표시한다", () => {
    renderWithProviders(<CoworkingCard space={baseSpace} />);
    expect(screen.getByText("WiFi")).toBeInTheDocument();
  });

  it("space.wifi = false 이면 'WiFi' 텍스트를 표시하지 않는다", () => {
    renderWithProviders(<CoworkingCard space={{ ...baseSpace, wifi: false }} />);
    expect(screen.queryByText("WiFi")).not.toBeInTheDocument();
  });

  it("space.amenities의 각 항목을 렌더링한다", () => {
    renderWithProviders(<CoworkingCard space={baseSpace} />);
    expect(screen.getByText("프린터")).toBeInTheDocument();
    expect(screen.getByText("회의실")).toBeInTheDocument();
    expect(screen.getByText("카페")).toBeInTheDocument();
  });

  it("찜 버튼 클릭 시 toggle(space.id)가 호출된다 (isFavorite 상태 변경)", () => {
    renderWithProviders(<CoworkingCard space={baseSpace} />);
    const btn = screen.getByRole("button", { name: "즐겨찾기 추가" });
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: "즐겨찾기 제거" })).toBeInTheDocument();
  });

  it("찜 상태일 때 aria-label이 '즐겨찾기 제거'이고, 해제 상태일 때 '즐겨찾기 추가'이다", () => {
    renderWithProviders(<CoworkingCard space={baseSpace} />);

    // 초기: 즐겨찾기 추가
    expect(screen.getByRole("button", { name: "즐겨찾기 추가" })).toBeInTheDocument();

    // 클릭 후: 즐겨찾기 제거
    fireEvent.click(screen.getByRole("button", { name: "즐겨찾기 추가" }));
    expect(screen.getByRole("button", { name: "즐겨찾기 제거" })).toBeInTheDocument();

    // 다시 클릭: 즐겨찾기 추가로 복원
    fireEvent.click(screen.getByRole("button", { name: "즐겨찾기 제거" }));
    expect(screen.getByRole("button", { name: "즐겨찾기 추가" })).toBeInTheDocument();
  });
});
