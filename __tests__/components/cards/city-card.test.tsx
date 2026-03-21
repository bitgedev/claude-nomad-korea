import React from "react";
import { describe, it, expect, vi } from "vitest";
import { CityCard } from "@/components/cards/city-card";
import {
  renderWithProviders,
  screen,
  fireEvent,
} from "../../helpers/render-with-providers";
import type { City } from "@/lib/mock-data";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const baseCity: City = {
  id: "city-seoul",
  rank: 1,
  name: "서울",
  nameEn: "Seoul",
  badge: "인기 1위",
  costOfLiving: 70,
  internetSpeed: 90,
  networkQuality: 5,
  coworkingCount: 42,
  recommendedArea: "강남구",
  rating: 4.5,
  reviewCount: 1234,
  description: "대한민국의 수도이자 디지털 노마드의 성지",
  tags: ["도시", "카페", "빠른인터넷"],
};

describe("CityCard", () => {
  it("city.name과 city.nameEn을 렌더링한다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    expect(screen.getByText("서울")).toBeInTheDocument();
    expect(screen.getByText("Seoul")).toBeInTheDocument();
  });

  it("city.rank 숫자를 표시한다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("city.badge 텍스트를 표시한다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    expect(screen.getByText("인기 1위")).toBeInTheDocument();
  });

  it("city.costOfLiving과 city.internetSpeed 수치를 표시한다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    // 바 차트 옆 숫자로 표시됨
    const costEl = screen.getAllByText("70");
    expect(costEl.length).toBeGreaterThan(0);
    const internetEl = screen.getAllByText("90");
    expect(internetEl.length).toBeGreaterThan(0);
  });

  it("city.coworkingCount를 '개' 와 함께 표시한다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    expect(screen.getByText("42개")).toBeInTheDocument();
  });

  it("city.recommendedArea를 표시한다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    expect(screen.getByText("강남구")).toBeInTheDocument();
  });

  it("city.rating과 city.reviewCount를 표시한다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    // rating 숫자
    expect(screen.getByText("4.5")).toBeInTheDocument();
    // reviewCount는 toLocaleString 적용 (1234 → "1,234개 리뷰")
    expect(screen.getByText(/1,234개 리뷰/)).toBeInTheDocument();
  });

  it("찜 버튼 클릭 시 isFavorite 상태가 토글된다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    const btn = screen.getByRole("button", { name: "즐겨찾기 추가" });
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: "즐겨찾기 제거" })).toBeInTheDocument();
  });

  it("찜 상태일 때 Heart 버튼 aria-label이 '즐겨찾기 제거'이다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    const btn = screen.getByRole("button", { name: "즐겨찾기 추가" });
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: "즐겨찾기 제거" })).toBeInTheDocument();
  });

  it("찜 해제 상태일 때 Heart 버튼 aria-label이 '즐겨찾기 추가'이다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    expect(screen.getByRole("button", { name: "즐겨찾기 추가" })).toBeInTheDocument();
  });

  it("찜 버튼 클릭 시 이벤트가 상위(Link)로 전파되지 않는다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    const btn = screen.getByRole("button", { name: "즐겨찾기 추가" });
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    const stopPropagationSpy = vi.spyOn(clickEvent, "stopPropagation");
    btn.dispatchEvent(clickEvent);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it("카드 링크 href가 '/cities/${city.id}'로 설정된다", () => {
    renderWithProviders(<CityCard city={baseCity} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/cities/city-seoul");
  });
});
