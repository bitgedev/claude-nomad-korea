import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 코워킹 목록 페이지 (/coworking)
 * 코워킹 상세 페이지 (/coworking/[id])
 */
export class CoworkingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/coworking");
  }

  async gotoDetail(id: string) {
    await this.page.goto(`/coworking/${id}`);
  }

  // --- 필터 ---
  async selectCity(city: string) {
    await this.page.getByRole("combobox", { name: /도시/ }).selectOption(city);
  }

  async selectAmenity(amenity: string) {
    await this.page.getByRole("checkbox", { name: amenity }).click();
  }

  // --- 카드 목록 ---
  get coworkingCards() {
    return this.page.getByTestId("coworking-card");
  }

  get emptyState() {
    return this.page.getByText(/결과가 없습니다/);
  }

  async clickCoworking(name: string) {
    await this.page.getByRole("link", { name }).first().click();
  }

  // --- 즐겨찾기 ---
  favoriteButton(cardName: string) {
    return this.page
      .getByTestId("coworking-card")
      .filter({ hasText: cardName })
      .getByRole("button", { name: /즐겨찾기|하트/ });
  }

  // --- 상세 페이지 ---
  get bookingButton() {
    return this.page.getByRole("button", { name: "예약 문의" });
  }

  get mapPlaceholder() {
    return this.page.getByText(/지도 기능 준비 중/);
  }
}
