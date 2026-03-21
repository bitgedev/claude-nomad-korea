import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 프로필 페이지 (/profile)
 */
export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/profile");
  }

  // --- 프로필 정보 ---
  get nickname() {
    return this.page.getByTestId("profile-nickname");
  }

  get email() {
    return this.page.getByTestId("profile-email");
  }

  // --- 정보 수정 ---
  get editButton() {
    return this.page.getByRole("button", { name: "내 정보 수정" });
  }

  async openEditForm() {
    await this.editButton.click();
  }

  get nicknameInput() {
    return this.page.getByRole("textbox", { name: /닉네임/ });
  }

  get saveButton() {
    return this.page.getByRole("button", { name: "저장" });
  }

  // --- 탭 ---
  async clickTab(tabName: "내 리뷰" | "즐겨찾기") {
    await this.page.getByRole("tab", { name: tabName }).click();
  }

  // --- 즐겨찾기 탭 ---
  get favoriteItems() {
    return this.page.getByTestId("favorite-item");
  }
}
