import { vi } from "vitest";

export const useRouter = vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  pathname: "/",
  query: {},
  asPath: "/",
}));
