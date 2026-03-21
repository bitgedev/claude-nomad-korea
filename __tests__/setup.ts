import "@testing-library/jest-dom";
import { vi, beforeEach } from "vitest";

// localStorage mock 초기화 (jsdom 기본 제공이지만 테스트 간 격리)
beforeEach(() => {
  localStorage.clear();
});

// next/navigation 전역 mock
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  useParams: vi.fn(() => ({})),
  redirect: vi.fn(),
  notFound: vi.fn(),
  permanentRedirect: vi.fn(),
}));
