import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Home", () => {
  // Hero 검색 → /cities?q= 이동
  // 검색 드롭다운 제안 표시
  // TopCities 카드 클릭 → /cities/[id] 이동
  // "전체 도시 보기" 버튼 → /cities 이동
  // "전체 리뷰 보기" 버튼 → /reviews 이동
  // Activity 섹션 밋업 아이템 클릭 → /meetups/[id] 이동
});
