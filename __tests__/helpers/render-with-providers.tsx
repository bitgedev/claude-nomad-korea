import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { FavoritesProvider } from "@/providers/favorites-provider";
import { AuthContext } from "@/providers/auth-provider";
import type { AuthUser } from "@/providers/auth-provider";
import { vi } from "vitest";

// -------------------------------------------------------------------
// Mock user fixture
// -------------------------------------------------------------------

export const mockUser: AuthUser = {
  id: "test-user-id-123",
  email: "test@example.com",
  nickname: "테스트유저",
  joinedAt: "2024-01-01T00:00:00Z",
  favoriteCity: undefined,
};

// -------------------------------------------------------------------
// Default AuthContext mock value
// -------------------------------------------------------------------

type MockAuthContextValue = {
  user: AuthUser | null;
  login: ReturnType<typeof vi.fn>;
  signup: ReturnType<typeof vi.fn>;
  logout: ReturnType<typeof vi.fn>;
  updateUser: ReturnType<typeof vi.fn>;
};

export function createMockAuthContext(
  overrides: Partial<MockAuthContextValue> = {}
): MockAuthContextValue {
  return {
    user: null,
    login: vi.fn().mockResolvedValue(undefined),
    signup: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn().mockResolvedValue(undefined),
    updateUser: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

// -------------------------------------------------------------------
// Custom render — FavoritesProvider만 감싼 기본 render
// -------------------------------------------------------------------

type CustomRenderOptions = RenderOptions & {
  authValue?: Partial<MockAuthContextValue>;
};

function AllProviders({
  children,
  authValue,
}: {
  children: React.ReactNode;
  authValue?: Partial<MockAuthContextValue>;
}) {
  const auth = createMockAuthContext(authValue);

  return (
    <AuthContext.Provider value={auth}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </AuthContext.Provider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  { authValue, ...renderOptions }: CustomRenderOptions = {}
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders authValue={authValue}>{children}</AllProviders>
    ),
    ...renderOptions,
  });
}

// -------------------------------------------------------------------
// renderWithAuth — 인증된 사용자로 렌더링하는 헬퍼
// -------------------------------------------------------------------

export function renderWithAuth(
  ui: React.ReactElement,
  {
    user = mockUser,
    authOverrides = {},
    ...renderOptions
  }: Omit<CustomRenderOptions, "authValue"> & {
    user?: AuthUser | null;
    authOverrides?: Partial<Omit<MockAuthContextValue, "user">>;
  } = {}
) {
  return renderWithProviders(ui, {
    authValue: { user, ...authOverrides },
    ...renderOptions,
  });
}

// re-export testing-library utilities for convenience
export { screen, fireEvent, waitFor, act } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
