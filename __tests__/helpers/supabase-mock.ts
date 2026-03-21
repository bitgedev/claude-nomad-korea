import { vi, type Mock } from "vitest";

// -------------------------------------------------------------------
// 타입 정의
// -------------------------------------------------------------------

type SupabaseResponse<T = unknown> = {
  data: T;
  error: null | { message: string };
};

type AuthUser = {
  id: string;
  email: string;
  created_at: string;
  user_metadata: Record<string, unknown>;
};

type Session = {
  user: AuthUser;
  access_token: string;
};

// -------------------------------------------------------------------
// 기본 mock 데이터
// -------------------------------------------------------------------

export const mockSupabaseUser: AuthUser = {
  id: "mock-user-id-123",
  email: "mock@example.com",
  created_at: "2024-01-01T00:00:00Z",
  user_metadata: { nickname: "mock유저" },
};

export const mockSession: Session = {
  user: mockSupabaseUser,
  access_token: "mock-access-token",
};

// -------------------------------------------------------------------
// Query Builder mock (체이닝 지원)
// -------------------------------------------------------------------

export type MockQueryBuilder = {
  select: Mock;
  eq: Mock;
  single: Mock;
  insert: Mock;
  upsert: Mock;
  update: Mock;
  delete: Mock;
  _response: SupabaseResponse;
};

export function createMockQueryBuilder(
  response: SupabaseResponse = { data: null, error: null }
): MockQueryBuilder {
  const builder: MockQueryBuilder = {
    _response: response,
    select: vi.fn(),
    eq: vi.fn(),
    single: vi.fn(),
    insert: vi.fn(),
    upsert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  // 체이닝: 각 메서드가 builder 자신을 반환하고 마지막은 Promise resolve
  const chainReturn = () => Promise.resolve(builder._response);

  builder.select.mockReturnValue(builder);
  builder.eq.mockReturnValue(builder);
  builder.single.mockImplementation(chainReturn);
  builder.insert.mockReturnValue(builder);
  builder.upsert.mockImplementation(chainReturn);
  builder.update.mockReturnValue(builder);
  builder.delete.mockReturnValue(builder);

  // insert().select().single() 체인을 위해 insert도 builder 반환
  // delete().eq().eq() 마지막 eq()는 Promise resolve
  // 실제 사용 시 마지막 호출에서 Promise를 반환하도록 오버라이드

  return builder;
}

// -------------------------------------------------------------------
// Auth mock
// -------------------------------------------------------------------

export type MockAuth = {
  getUser: Mock;
  signInWithPassword: Mock;
  signUp: Mock;
  signOut: Mock;
  getSession: Mock;
  onAuthStateChange: Mock;
};

export function createMockAuth(overrides: Partial<MockAuth> = {}): MockAuth {
  return {
    getUser: vi.fn().mockResolvedValue({
      data: { user: mockSupabaseUser },
      error: null,
    }),
    signInWithPassword: vi.fn().mockResolvedValue({
      data: { user: mockSupabaseUser, session: mockSession },
      error: null,
    }),
    signUp: vi.fn().mockResolvedValue({
      data: { user: mockSupabaseUser, session: mockSession },
      error: null,
    }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
    getSession: vi.fn().mockResolvedValue({
      data: { session: mockSession },
      error: null,
    }),
    onAuthStateChange: vi.fn().mockReturnValue({
      data: {
        subscription: { unsubscribe: vi.fn() },
      },
    }),
    ...overrides,
  };
}

// -------------------------------------------------------------------
// Supabase 클라이언트 전체 mock
// -------------------------------------------------------------------

export type MockSupabaseClient = {
  auth: MockAuth;
  from: Mock;
  _queryBuilder: MockQueryBuilder;
};

export function createMockSupabaseClient(
  options: {
    authOverrides?: Partial<MockAuth>;
    queryResponse?: SupabaseResponse;
  } = {}
): MockSupabaseClient {
  const auth = createMockAuth(options.authOverrides);
  const queryBuilder = createMockQueryBuilder(options.queryResponse);

  const fromMock = vi.fn().mockReturnValue(queryBuilder);

  return {
    auth,
    from: fromMock,
    _queryBuilder: queryBuilder,
  };
}

// -------------------------------------------------------------------
// vi.mock 팩토리 — 파일 최상단에서 사용
//
// 사용 예시:
//
//   vi.mock("@/lib/supabase/client", () => ({
//     createClient: vi.fn(() => mockClient),
//   }));
//
// 또는 각 테스트에서:
//
//   import { createClient } from "@/lib/supabase/client";
//   const mockCreateClient = vi.mocked(createClient);
//   mockCreateClient.mockReturnValue(mockClient as ReturnType<typeof createClient>);
// -------------------------------------------------------------------

/**
 * @/lib/supabase/client mock 팩토리
 * vitest 파일 최상단 vi.mock 콜백에서 사용
 */
export function createSupabaseMockModule(
  options: {
    authOverrides?: Partial<MockAuth>;
    queryResponse?: SupabaseResponse;
  } = {}
) {
  const mockClient = createMockSupabaseClient(options);
  return {
    createClient: vi.fn(() => mockClient),
    _mockClient: mockClient,
  };
}

// -------------------------------------------------------------------
// 헬퍼: 특정 테이블 응답 설정
// -------------------------------------------------------------------

/**
 * queryBuilder의 응답 데이터를 테스트 중에 변경
 *
 * 사용 예시:
 *   setQueryResponse(mockClient._queryBuilder, { data: { nickname: "홍길동" }, error: null });
 */
export function setQueryResponse(
  queryBuilder: MockQueryBuilder,
  response: SupabaseResponse
) {
  queryBuilder._response = response;
  queryBuilder.single.mockImplementation(() =>
    Promise.resolve(queryBuilder._response)
  );
  queryBuilder.upsert.mockImplementation(() =>
    Promise.resolve(queryBuilder._response)
  );
}

/**
 * auth 메서드가 에러를 반환하도록 설정
 *
 * 사용 예시:
 *   setAuthError(mockClient.auth.signInWithPassword, "Invalid credentials");
 */
export function setAuthError(mockFn: Mock, message: string) {
  mockFn.mockResolvedValue({
    data: { user: null, session: null },
    error: { message },
  });
}
