import { test as base, Page } from "@playwright/test";
import { AuthPage } from "../pages/auth.page";

/** 테스트 계정 — Mock 인증 기반이므로 실제 DB 불필요 */
export const TEST_USER = {
  email: "test@test.com",
  password: "password123",
  nickname: "테스트유저",
};

type AuthFixtures = {
  /** 로그인된 상태의 page */
  loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await authPage.gotoLogin();
    await authPage.login(TEST_USER.email, TEST_USER.password);
    // 홈으로 리다이렉트될 때까지 대기
    await page.waitForURL("/");
    await use(page);
  },
});

export { expect } from "@playwright/test";
