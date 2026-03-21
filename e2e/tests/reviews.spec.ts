import { test, expect } from "@playwright/test";
import { ReviewsPage } from "../pages/reviews.page";

test.describe("Reviews — 목록", () => {
  // 전체 리뷰 목록 렌더링
  // 도시 탭 필터
  // 별점 필터
  // 정렬 변경
  // "도움이 됐어요" 버튼 토글
});

test.describe("Reviews — 리뷰 작성", () => {
  // "리뷰 쓰기" 버튼 클릭 → 모달 열림
  // 도시 미선택 제출 → 에러 메시지
  // 내용 50자 미만 제출 → 에러 메시지
  // 별점 미선택 제출 → 에러 메시지
  // 정상 제출 → 모달 닫힘, 새 리뷰 목록 상단에 추가
  // 별점 호버 하이라이트
});
