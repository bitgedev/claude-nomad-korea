import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * 로그인 (/login), 회원가입 (/signup) 페이지
 */
export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoLogin() {
    await this.page.goto("/login");
  }

  async gotoSignup() {
    await this.page.goto("/signup");
  }

  // --- 로그인 폼 ---
  get emailInput() {
    return this.page.getByRole("textbox", { name: /이메일/ });
  }

  get passwordInput() {
    return this.page.getByLabel(/비밀번호/);
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "로그인" });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // --- 회원가입 폼 ---
  get nicknameInput() {
    return this.page.getByRole("textbox", { name: /닉네임/ });
  }

  get passwordConfirmInput() {
    return this.page.getByLabel(/비밀번호 확인/);
  }

  get signupButton() {
    return this.page.getByRole("button", { name: "가입하기" });
  }

  async signup(email: string, password: string, nickname: string) {
    await this.emailInput.fill(email);
    await this.nicknameInput.fill(nickname);
    await this.passwordInput.fill(password);
    await this.passwordConfirmInput.fill(password);
    await this.signupButton.click();
  }

  // --- 에러 메시지 ---
  get errorMessage() {
    return this.page.getByRole("alert");
  }
}
