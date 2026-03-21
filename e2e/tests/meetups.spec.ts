import { test, expect } from "@playwright/test";
import { MeetupsPage } from "../pages/meetups.page";
import { MeetupDetailPage } from "../pages/meetup-detail.page";

test.describe("Meetups — 목록", () => {
  // 밋업 카드 목록 렌더링
  // 도시 탭 필터
  // 카테고리 필터
  // 필터 결과 없을 때 빈 상태 UI
});

test.describe("Meetups — 상세", () => {
  // 밋업 상세 페이지 렌더링
  // RSVP 버튼 클릭 → 카운트 +1, 버튼 상태 변경
  // RSVP 재클릭 → 카운트 -1, 원래 상태 복원
  // 최대 인원 도달 시 RSVP 버튼 비활성화
  // 존재하지 않는 밋업 → 404
  // 관련 밋업 섹션 표시
});
