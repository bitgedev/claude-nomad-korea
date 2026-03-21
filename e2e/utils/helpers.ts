import { Page } from "@playwright/test";

/**
 * 현재 URL의 쿼리 파라미터 값을 반환한다.
 */
export function getSearchParam(page: Page, key: string): string | null {
  const url = new URL(page.url());
  return url.searchParams.get(key);
}

/**
 * localStorage에서 값을 읽는다.
 */
export async function getLocalStorage(page: Page, key: string): Promise<string | null> {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * localStorage에 값을 설정한다.
 */
export async function setLocalStorage(page: Page, key: string, value: string): Promise<void> {
  await page.evaluate(([k, v]) => localStorage.setItem(k, v), [key, value]);
}

/**
 * localStorage를 초기화한다.
 */
export async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
}
