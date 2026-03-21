import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 홈페이지 (/) — Hero 검색, TopCities, Reviews, Activity 섹션
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/");
  }

  // --- Hero 검색 ---
  get searchInput() {
    return this.page.getByRole("searchbox");
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }

  async fillSearch(query: string) {
    await this.searchInput.fill(query);
  }

  get searchSuggestions() {
    return this.page.getByRole("listbox");
  }

  // --- TopCities 섹션 ---
  get cityCards() {
    return this.page.getByTestId("city-card");
  }

  async clickCityCard(cityName: string) {
    await this.page.getByRole("link", { name: cityName }).first().click();
  }

  get viewAllCitiesButton() {
    return this.page.getByRole("link", { name: /전체 도시 보기/ });
  }

  // --- Reviews 섹션 ---
  get viewAllReviewsButton() {
    return this.page.getByRole("link", { name: /전체 리뷰 보기/ });
  }
}
