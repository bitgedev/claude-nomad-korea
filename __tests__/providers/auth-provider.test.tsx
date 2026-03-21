import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/providers/auth-provider";
import {
  createMockSupabaseClient,
  setAuthError,
  mockSupabaseUser,
  mockSession,
  setQueryResponse,
  type MockSupabaseClient,
} from "../helpers/supabase-mock";

// -------------------------------------------------------------------
// Supabase client mock 설정
// vi.mock은 호이스팅되므로 mockClient를 파일 스코프에서 생성하고
// vi.mock 팩토리에서 이 참조를 사용한다
// -------------------------------------------------------------------

// vi.mock 팩토리보다 먼저 평가되도록 파일 스코프 최상단에 선언
const mockClient: MockSupabaseClient = createMockSupabaseClient();

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => mockClient),
}));

// -------------------------------------------------------------------
// 헬퍼: AuthProvider로 감싼 wrapper
// -------------------------------------------------------------------

function wrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

// -------------------------------------------------------------------
// 체이닝 mock 재초기화 헬퍼
// vi.clearAllMocks()가 모든 mock 구현을 지우므로 매 테스트 전에 재설정 필요
// -------------------------------------------------------------------

function resetQueryBuilderChain() {
  const qb = mockClient._queryBuilder;
  const chainReturn = () => Promise.resolve(qb._response);

  qb.select.mockReturnValue(qb);
  qb.eq.mockReturnValue(qb);            // 기본: builder 반환 (select.eq.single 체인용)
  qb.single.mockImplementation(chainReturn);
  qb.insert.mockResolvedValue({ data: null, error: null });
  qb.upsert.mockImplementation(chainReturn);
  qb.update.mockReturnValue(qb);
  qb.delete.mockReturnValue(qb);
  mockClient.from.mockReturnValue(qb);
}

// -------------------------------------------------------------------
// 세션 있는 상태로 mock 설정하는 헬퍼
// -------------------------------------------------------------------

function setupLoggedInState() {
  mockClient.auth.getSession.mockResolvedValue({
    data: { session: mockSession },
    error: null,
  });
  mockClient.auth.onAuthStateChange.mockImplementation((callback) => {
    callback("SIGNED_IN", mockSession);
    return { data: { subscription: { unsubscribe: vi.fn() } } };
  });
}

// -------------------------------------------------------------------
// 테스트 전 공통 초기화
// -------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();

  // 체이닝 mock 재설정 (clearAllMocks가 구현을 지웠으므로)
  resetQueryBuilderChain();

  // 기본: 세션 없음 (비로그인 상태)
  mockClient.auth.getSession.mockResolvedValue({
    data: { session: null },
    error: null,
  });

  // 기본: onAuthStateChange — 세션 없이 콜백 즉시 호출
  mockClient.auth.onAuthStateChange.mockImplementation((callback) => {
    callback("SIGNED_OUT", null);
    return { data: { subscription: { unsubscribe: vi.fn() } } };
  });

  // 기본: profiles 프로필 응답
  setQueryResponse(mockClient._queryBuilder, {
    data: {
      nickname: "테스트유저",
      favorite_city: null,
      created_at: "2024-01-01T00:00:00Z",
    },
    error: null,
  });

  // signInWithPassword 기본: 성공
  mockClient.auth.signInWithPassword.mockResolvedValue({
    data: { user: mockSupabaseUser, session: mockSession },
    error: null,
  });

  // signUp 기본: 성공
  mockClient.auth.signUp.mockResolvedValue({
    data: { user: mockSupabaseUser, session: mockSession },
    error: null,
  });

  // signOut 기본: 성공
  mockClient.auth.signOut.mockResolvedValue({ error: null });
});

// -------------------------------------------------------------------
// 테스트 케이스
// -------------------------------------------------------------------

describe("AuthProvider / useAuth", () => {
  // 1. 초기 상태: user null
  it("초기 상태에서 user는 null이다", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });
  });

  // 2. login() 성공 → supabase.auth.signInWithPassword 호출됨
  it("login() 성공 시 signInWithPassword가 올바른 인자로 호출된다", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login("test@example.com", "password123");
    });

    expect(mockClient.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  // 3. login() 실패 → 에러 throw
  it("login() 실패 시 에러를 throw한다", async () => {
    setAuthError(mockClient.auth.signInWithPassword, "Invalid login credentials");

    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      act(async () => {
        await result.current.login("wrong@example.com", "wrongpass");
      })
    ).rejects.toThrow("Invalid login credentials");
  });

  // 4. signup() 성공 → signUp + profiles upsert 호출됨
  it("signup() 성공 시 signUp과 profiles upsert가 호출된다", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signup("new@example.com", "pass1234", "새유저");
    });

    expect(mockClient.auth.signUp).toHaveBeenCalledWith({
      email: "new@example.com",
      password: "pass1234",
      options: { data: { nickname: "새유저" } },
    });

    expect(mockClient.from).toHaveBeenCalledWith("profiles");
    expect(mockClient._queryBuilder.upsert).toHaveBeenCalledWith(
      { id: mockSupabaseUser.id, nickname: "새유저" },
      { onConflict: "id" }
    );
  });

  // 5. signup() 실패 → 에러 throw
  it("signup() 실패 시 에러를 throw한다", async () => {
    setAuthError(mockClient.auth.signUp, "Email already registered");

    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      act(async () => {
        await result.current.signup("dup@example.com", "pass1234", "중복유저");
      })
    ).rejects.toThrow("Email already registered");
  });

  // 6. logout() → signOut 호출 + user null 설정
  it("logout() 호출 시 signOut이 호출되고 user가 null로 설정된다", async () => {
    setupLoggedInState();

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(mockClient.auth.signOut).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
  });

  // 7. loadProfile: 프로필 존재 → user 상태 설정
  it("프로필이 존재하면 user 상태가 올바르게 설정된다", async () => {
    setupLoggedInState();

    setQueryResponse(mockClient._queryBuilder, {
      data: {
        nickname: "테스트유저",
        favorite_city: "서울",
        created_at: "2024-01-01T00:00:00Z",
      },
      error: null,
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    expect(result.current.user).toMatchObject({
      id: mockSupabaseUser.id,
      email: mockSupabaseUser.email,
      nickname: "테스트유저",
      favoriteCity: "서울",
    });
  });

  // 8. loadProfile: 프로필 없음 → 자동 INSERT 후 user 설정
  it("프로필이 없으면 INSERT 후 user가 설정된다", async () => {
    setupLoggedInState();

    // 프로필 조회 시 null 반환 (406)
    setQueryResponse(mockClient._queryBuilder, {
      data: null,
      error: { message: "No rows" },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    // profiles insert 호출 확인
    expect(mockClient._queryBuilder.insert).toHaveBeenCalledWith(
      expect.objectContaining({ id: mockSupabaseUser.id })
    );

    // user_metadata.nickname으로 닉네임 설정
    expect(result.current.user?.nickname).toBe("mock유저");
  });

  // 9. updateUser(): nickname 변경 → DB update + 상태 반영
  it("updateUser({ nickname }) 호출 시 DB update가 호출되고 상태가 반영된다", async () => {
    setupLoggedInState();

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    // update().eq() 체인: eq가 Promise resolve 반환하도록 재설정
    mockClient._queryBuilder.update.mockReturnValue(mockClient._queryBuilder);
    mockClient._queryBuilder.eq.mockResolvedValue({ data: null, error: null });

    await act(async () => {
      await result.current.updateUser({ nickname: "새닉네임" });
    });

    expect(mockClient._queryBuilder.update).toHaveBeenCalledWith(
      expect.objectContaining({ nickname: "새닉네임" })
    );
    expect(result.current.user?.nickname).toBe("새닉네임");
  });

  // 10. updateUser(): favoriteCity 변경 → DB update + 상태 반영
  it("updateUser({ favoriteCity }) 호출 시 DB update가 호출되고 상태가 반영된다", async () => {
    setupLoggedInState();

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    mockClient._queryBuilder.update.mockReturnValue(mockClient._queryBuilder);
    mockClient._queryBuilder.eq.mockResolvedValue({ data: null, error: null });

    await act(async () => {
      await result.current.updateUser({ favoriteCity: "부산" });
    });

    expect(mockClient._queryBuilder.update).toHaveBeenCalledWith(
      expect.objectContaining({ favorite_city: "부산" })
    );
    expect(result.current.user?.favoriteCity).toBe("부산");
  });

  // 11. useAuth() Provider 외부에서 호출 시 에러 throw
  it("useAuth()를 AuthProvider 외부에서 호출하면 에러를 throw한다", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within AuthProvider");
  });
});
