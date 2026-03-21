import { test, expect } from "@playwright/test";
import { CitiesPage } from "../pages/cities.page";
import { CityDetailPage } from "../pages/city-detail.page";

test.describe("Cities — 목록", () => {
  // 전체 7개 도시 카드 렌더링
  // 정렬 변경 시 순서 변화
  // 태그 필터 선택 시 해당 태그 도시만 표시
  // 검색 후 URL에 ?q= 파라미터 반영
  // 새로고침 후 필터 상태 유지
  // 결과 없을 때 빈 상태 UI 표시
});

test.describe("Cities — 상세", () => {
  // 도시 상세 페이지 렌더링
  // 탭 전환 (개요 / 코워킹 / 리뷰)
  // 코워킹 탭: 해당 도시 코워킹만 표시
  // 리뷰 탭: 해당 도시 리뷰만 표시
  // 존재하지 않는 도시 → 404
  // Breadcrumb "도시랭킹" 클릭 → /cities 이동
});
