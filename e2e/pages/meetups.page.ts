import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 밋업 목록 페이지 (/meetups)
 */
export class MeetupsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/meetups");
  }

  // --- 필터 ---
  async selectCityTab(city: string) {
    await this.page.getByRole("tab", { name: city }).click();
  }

  async selectCategory(category: string) {
    await this.page.getByRole("button", { name: category }).click();
  }

  // --- 카드 목록 ---
  get meetupCards() {
    return this.page.getByTestId("meetup-card");
  }

  get emptyState() {
    return this.page.getByText(/결과가 없습니다/);
  }

  async clickMeetup(title: string) {
    await this.page.getByRole("link", { name: title }).first().click();
  }
}
