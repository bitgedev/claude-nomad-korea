import { test, expect } from "@playwright/test";
import { CoworkingPage } from "../pages/coworking.page";

test.describe("Coworking — 목록", () => {
  // 전체 코워킹 카드 렌더링
  // 도시 필터
  // 편의시설 필터
  // 지도 플레이스홀더 표시
  // 즐겨찾기 토글 → localStorage 저장
  // 새로고침 후 즐겨찾기 상태 유지
});

test.describe("Coworking — 상세", () => {
  // 상세 페이지 렌더링 (이름, 주소, 가격표)
  // 편의시설 체크리스트 표시
  // "예약 문의" 버튼 클릭 → 토스트 알림
  // 존재하지 않는 코워킹 → 404
});
