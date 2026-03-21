import { test, expect } from "../fixtures";
import { ProfilePage } from "../pages/profile.page";

test.describe("Profile — 인증 가드", () => {
  // 비로그인 상태에서 /profile 접근 → /login 리다이렉트
});

test.describe("Profile — 로그인 후", () => {
  // 프로필 정보(닉네임, 이메일) 표시
  // 닉네임 수정 후 저장 → 반영 확인
  // "내 리뷰" 탭 — 작성한 리뷰 목록 표시
  // "즐겨찾기" 탭 — 즐겨찾기 항목 표시
});
