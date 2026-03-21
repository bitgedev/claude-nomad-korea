import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 도시 상세 페이지 (/cities/[id])
 */
export class CityDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(cityId: string) {
    await this.page.goto(`/cities/${cityId}`);
  }

  // --- 탭 ---
  async clickTab(tabName: "개요" | "코워킹" | "리뷰") {
    await this.page.getByRole("tab", { name: tabName }).click();
  }

  // --- Breadcrumb ---
  get breadcrumb() {
    return this.page.getByRole("navigation", { name: "breadcrumb" });
  }

  async clickBreadcrumb(label: string) {
    await this.breadcrumb.getByRole("link", { name: label }).click();
  }

  // --- 코워킹 탭 ---
  get coworkingCards() {
    return this.page.getByTestId("coworking-card");
  }

  // --- 리뷰 탭 ---
  get reviewCards() {
    return this.page.getByTestId("review-card");
  }

  // --- 즐겨찾기 ---
  get favoriteButton() {
    return this.page.getByRole("button", { name: /즐겨찾기|하트/ });
  }
}
