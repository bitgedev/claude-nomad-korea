import { test, expect } from "@playwright/test";
import { AuthPage } from "../pages/auth.page";

test.describe("Auth — 로그인", () => {
  // 로그인 페이지 렌더링
  // 유효한 계정으로 로그인 → 홈 이동, Navbar 닉네임 표시
  // 새로고침 후 로그인 상태 유지 (localStorage)
  // 잘못된 비밀번호 → 에러 메시지
  // 소셜 로그인 버튼 클릭 → "준비 중" 토스트
});

test.describe("Auth — 회원가입", () => {
  // 회원가입 페이지 렌더링
  // 정상 가입 → 자동 로그인 후 홈 이동
  // 비밀번호 불일치 → 에러 메시지
  // 이미 사용 중인 닉네임 → 에러 메시지
});

test.describe("Auth — 로그아웃", () => {
  // 로그아웃 클릭 → Navbar 로그인 전 상태 복원
});
