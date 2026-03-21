import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 도시 목록 페이지 (/cities)
 */
export class CitiesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(params?: { q?: string; sort?: string; tag?: string }) {
    const url = new URL("/cities", "http://localhost:3000");
    if (params?.q) url.searchParams.set("q", params.q);
    if (params?.sort) url.searchParams.set("sort", params.sort);
    if (params?.tag) url.searchParams.set("tag", params.tag);
    await this.page.goto(url.pathname + url.search);
  }

  // --- 필터 / 검색 ---
  get searchInput() {
    return this.page.getByRole("searchbox");
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }

  async selectSort(option: string) {
    await this.page.getByRole("combobox", { name: /정렬/ }).selectOption(option);
  }

  async selectTag(tag: string) {
    await this.page.getByRole("button", { name: tag }).click();
  }

  // --- 카드 목록 ---
  get cityCards() {
    return this.page.getByTestId("city-card");
  }

  get emptyState() {
    return this.page.getByText("검색 결과가 없습니다");
  }

  async clickCity(cityName: string) {
    await this.page.getByRole("link", { name: cityName }).first().click();
  }
}
