import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 리뷰 목록 페이지 (/reviews)
 */
export class ReviewsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/reviews");
  }

  // --- 필터 ---
  async selectCityTab(city: string) {
    await this.page.getByRole("tab", { name: city }).click();
  }

  async selectRating(stars: 1 | 2 | 3 | 4 | 5) {
    await this.page.getByRole("button", { name: `${stars}점` }).click();
  }

  async selectSort(option: string) {
    await this.page.getByRole("combobox", { name: /정렬/ }).selectOption(option);
  }

  // --- 카드 목록 ---
  get reviewCards() {
    return this.page.getByTestId("review-card");
  }

  // --- 리뷰 작성 모달 ---
  get writeReviewButton() {
    return this.page.getByRole("button", { name: "리뷰 쓰기" });
  }

  async openReviewForm() {
    await this.writeReviewButton.click();
  }

  // 모달 내 폼 필드
  get citySelect() {
    return this.page.getByRole("combobox", { name: /도시/ });
  }

  get nicknameInput() {
    return this.page.getByRole("textbox", { name: /닉네임/ });
  }

  get contentTextarea() {
    return this.page.getByRole("textbox", { name: /내용/ });
  }

  async clickStar(index: 1 | 2 | 3 | 4 | 5) {
    await this.page.getByTestId(`star-${index}`).click();
  }

  get submitButton() {
    return this.page.getByRole("button", { name: "제출" });
  }

  get formErrorMessages() {
    return this.page.getByRole("alert");
  }
}
