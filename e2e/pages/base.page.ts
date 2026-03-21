import { Page } from "@playwright/test";

/**
 * 모든 Page Object가 상속하는 베이스 클래스.
 * Navbar/Footer 등 전 페이지 공통 액션을 제공한다.
 */
export class BasePage {
  constructor(protected page: Page) {}

  // --- Navbar 이동 ---
  async goToHome() {
    await this.page.getByRole("link", { name: "Nomad Korea" }).first().click();
  }

  async goToCities() {
    await this.page.getByRole("link", { name: "도시랭킹" }).click();
  }

  async goToMeetups() {
    await this.page.getByRole("link", { name: "밋업" }).click();
  }

  async goToCoworking() {
    await this.page.getByRole("link", { name: "코워킹" }).click();
  }

  async goToCommunity() {
    await this.page.getByRole("link", { name: "커뮤니티" }).click();
  }

  // --- 인증 ---
  async logout() {
    await this.page.getByRole("button", { name: "로그아웃" }).click();
  }

  async openProfileDropdown() {
    await this.page.getByRole("button", { name: /프로필|아바타/ }).click();
  }

  // --- 상태 확인 ---
  isLoggedIn() {
    return this.page.getByRole("button", { name: "로그아웃" }).isVisible();
  }
}
