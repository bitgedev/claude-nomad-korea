import React from "react";
import { renderHook, act } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "@/providers/favorites-provider";

const STORAGE_KEY = "nomad_korea_favorites";

// FavoritesProvider로 감싼 wrapper
function wrapper({ children }: { children: React.ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}

describe("FavoritesProvider / useFavorites", () => {
  // 1. 초기 상태: favorites 빈 배열
  it("초기 상태에서 favorites는 빈 배열이다", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current.favorites).toEqual([]);
  });

  // 2. toggle(id): 없는 id 추가됨
  it("toggle(id) — 없는 id를 호출하면 favorites에 추가된다", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggle("city-seoul");
    });

    expect(result.current.favorites).toContain("city-seoul");
    expect(result.current.favorites).toHaveLength(1);
  });

  // 3. toggle(id): 있는 id 제거됨
  it("toggle(id) — 이미 있는 id를 호출하면 favorites에서 제거된다", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggle("city-busan");
    });
    act(() => {
      result.current.toggle("city-busan");
    });

    expect(result.current.favorites).not.toContain("city-busan");
    expect(result.current.favorites).toHaveLength(0);
  });

  // 4. isFavorite(id): 추가된 id → true
  it("isFavorite(id) — 추가된 id에 대해 true를 반환한다", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggle("city-jeju");
    });

    expect(result.current.isFavorite("city-jeju")).toBe(true);
  });

  // 5. isFavorite(id): 없는 id → false
  it("isFavorite(id) — 추가되지 않은 id에 대해 false를 반환한다", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.isFavorite("city-daegu")).toBe(false);
  });

  // 6. toggle 후 localStorage에 JSON 저장됨
  it("toggle 후 localStorage에 JSON 형태로 저장된다", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggle("city-incheon");
    });

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toEqual(["city-incheon"]);
  });

  // 7. 초기화 시 localStorage에서 값 복원
  it("localStorage에 저장된 값이 있으면 초기화 시 복원된다", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(["city-gwangju", "city-suwon"]));

    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual(["city-gwangju", "city-suwon"]);
  });

  // 8. localStorage 값이 JSON 파싱 불가 → 빈 배열로 fallback
  it("localStorage 값이 JSON 파싱 불가일 때 빈 배열로 fallback된다", () => {
    localStorage.setItem(STORAGE_KEY, "invalid-json-%%%");

    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual([]);
  });

  // 9. useFavorites() Provider 외부에서 호출 시 에러 throw
  it("useFavorites()를 FavoritesProvider 외부에서 호출하면 에러를 throw한다", () => {
    // renderHook은 기본적으로 wrapper 없이 렌더링
    expect(() => {
      renderHook(() => useFavorites());
    }).toThrow("useFavorites must be used within FavoritesProvider");
  });
});
