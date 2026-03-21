import { test, expect } from "@playwright/test";

const CITY_NAMES = ["서울", "부산", "제주", "대구", "인천", "광주", "대전"];

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("로고가 존재한다", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /NOMAD KOREA/ }).first()
    ).toBeVisible();
  });

  test("도시 카드들이 존재한다", async ({ page }) => {
    // TOP 도시 랭킹 섹션의 /cities/{id} 링크 카드 7개
    const cityCardLinks = page.locator('a[href^="/cities/"]');
    await expect(cityCardLinks).toHaveCount(7);
  });

  test("처음 접속하면 필터가 적용되어 있지 않다", async ({ page }) => {
    // URL에 query params 없음 → 필터 미적용 상태
    expect(new URL(page.url()).search).toBe("");

    // 히어로 필터 배지: 기본값 "전체" 가 활성(filled) 상태
    const allFilter = page.getByText("전체").first();
    await expect(allFilter).toBeVisible();

    // 특정 지역 필터(수도권, 남부, 제주)는 활성 스타일이 아닌 outline 상태
    // → bg-[#1B9AAA] 없이 border-only 클래스 보유
    const regionFilter = page.getByText("수도권");
    await expect(regionFilter).not.toHaveClass(/bg-\[#1B9AAA\] text-white/);
  });

  test("필터 미적용 시 mock 데이터의 도시 7개가 모두 표시된다", async ({
    page,
  }) => {
    for (const name of CITY_NAMES) {
      await expect(
        page.getByRole("heading", { name, level: 3 }).first()
      ).toBeVisible();
    }
  });
});
