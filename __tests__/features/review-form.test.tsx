import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { ReviewForm } from "@/components/review-form";
import {
  createMockSupabaseClient,
  setQueryResponse,
} from "../helpers/supabase-mock";
import type { Review } from "@/lib/mock-data";

const mockClient = createMockSupabaseClient();

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => mockClient),
}));

// rowToReview가 실제 mapper를 호출하므로 실제 구현 사용
// (테스트에서 savedRow를 직접 설정하여 onSubmit 검증)

const defaultProps = {
  open: true,
  onOpenChange: vi.fn(),
  onSubmit: vi.fn(),
};

// 유효한 폼 데이터를 채우는 헬퍼
async function fillValidForm() {
  // 도시 선택
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "서울" },
  });

  // 별점 5점 클릭 (★ 버튼들 중 5번째)
  const stars = screen.getAllByText("★");
  // InteractiveStars는 버튼 5개를 렌더링
  const starButtons = stars
    .map((s) => s.closest("button"))
    .filter((b): b is HTMLButtonElement => b !== null);
  fireEvent.click(starButtons[4]); // 5번째 별

  // 내용 50자 이상 입력
  fireEvent.change(screen.getByPlaceholderText(/도시에서의 경험을 자유롭게/), {
    target: {
      value: "서울은 정말 훌륭한 디지털 노마드 도시입니다. 인터넷이 빠르고 카페가 많아서 일하기 좋은 환경이 갖춰져 있습니다.",
    },
  });
}

describe("ReviewForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // 기본 성공 응답 설정
    const savedRow = {
      id: "user-123",
      city_name: "서울",
      nickname: "테스트",
      rating: 5,
      content: "테스트 내용",
      hashtags: [],
      date: "2024",
      coworking_id: null,
      user_id: null,
      created_at: null,
    };

    mockClient._queryBuilder._response = { data: savedRow, error: null };
    mockClient._queryBuilder.select.mockReturnValue(mockClient._queryBuilder);
    mockClient._queryBuilder.insert.mockReturnValue(mockClient._queryBuilder);
    mockClient._queryBuilder.single.mockResolvedValue({ data: savedRow, error: null });
  });

  it("open=false이면 폼을 렌더링하지 않는다", () => {
    render(
      <ReviewForm
        open={false}
        onOpenChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );
    expect(screen.queryByText("리뷰 쓰기")).not.toBeInTheDocument();
  });

  it("open=true이면 폼을 렌더링한다", () => {
    render(<ReviewForm {...defaultProps} />);
    expect(screen.getByText("리뷰 쓰기")).toBeInTheDocument();
  });

  it("도시 미선택 제출 시 '도시를 선택해 주세요.' 에러를 표시한다", async () => {
    render(<ReviewForm {...defaultProps} />);
    fireEvent.click(screen.getByText("리뷰 등록"));
    await waitFor(() => {
      expect(screen.getByText("도시를 선택해 주세요.")).toBeInTheDocument();
    });
  });

  it("별점 0 제출 시 '별점을 선택해 주세요.' 에러를 표시한다", async () => {
    render(<ReviewForm {...defaultProps} />);
    // 도시만 선택하고 별점 없이 제출
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "서울" },
    });
    fireEvent.click(screen.getByText("리뷰 등록"));
    await waitFor(() => {
      expect(screen.getByText("별점을 선택해 주세요.")).toBeInTheDocument();
    });
  });

  it("내용 50자 미만 제출 시 '내용을 50자 이상 입력해 주세요.' 에러를 표시한다", async () => {
    render(<ReviewForm {...defaultProps} />);
    // 도시 선택
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "서울" },
    });
    // 별점 클릭
    const stars = screen.getAllByText("★");
    const starButtons = stars
      .map((s) => s.closest("button"))
      .filter((b): b is HTMLButtonElement => b !== null);
    fireEvent.click(starButtons[0]);
    // 짧은 내용 입력
    fireEvent.change(screen.getByPlaceholderText(/도시에서의 경험을 자유롭게/), {
      target: { value: "짧은 내용" },
    });
    fireEvent.click(screen.getByText("리뷰 등록"));
    await waitFor(() => {
      expect(screen.getByText("내용을 50자 이상 입력해 주세요.")).toBeInTheDocument();
    });
  });

  it("모두 유효하면 에러가 없고 supabase.from('reviews').insert를 호출한다", async () => {
    render(<ReviewForm {...defaultProps} />);
    await fillValidForm();
    fireEvent.click(screen.getByText("리뷰 등록"));

    await waitFor(() => {
      expect(mockClient.from).toHaveBeenCalledWith("reviews");
      expect(mockClient._queryBuilder.insert).toHaveBeenCalled();
    });
    expect(screen.queryByText("도시를 선택해 주세요.")).not.toBeInTheDocument();
    expect(screen.queryByText("별점을 선택해 주세요.")).not.toBeInTheDocument();
    expect(screen.queryByText("내용을 50자 이상 입력해 주세요.")).not.toBeInTheDocument();
  });

  it("해시태그 '카페,와이파이' 입력 시 ['#카페', '#와이파이']로 파싱하여 insert에 전달한다", async () => {
    render(<ReviewForm {...defaultProps} />);
    await fillValidForm();
    fireEvent.change(screen.getByPlaceholderText("카페투어, 인터넷빠름, 가성비"), {
      target: { value: "카페,와이파이" },
    });
    fireEvent.click(screen.getByText("리뷰 등록"));

    await waitFor(() => {
      expect(mockClient._queryBuilder.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          hashtags: ["#카페", "#와이파이"],
        })
      );
    });
  });

  it("해시태그 '#카페' 입력 시 ['#카페']로 파싱하여 중복 # 없이 전달한다", async () => {
    render(<ReviewForm {...defaultProps} />);
    await fillValidForm();
    fireEvent.change(screen.getByPlaceholderText("카페투어, 인터넷빠름, 가성비"), {
      target: { value: "#카페" },
    });
    fireEvent.click(screen.getByText("리뷰 등록"));

    await waitFor(() => {
      expect(mockClient._queryBuilder.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          hashtags: ["#카페"],
        })
      );
    });
  });

  it("제출 성공 시 onSubmit(review)을 호출한다", async () => {
    const onSubmit = vi.fn();
    render(<ReviewForm {...defaultProps} onSubmit={onSubmit} />);
    await fillValidForm();
    fireEvent.click(screen.getByText("리뷰 등록"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "user-123",
        cityName: "서울",
      })
    );
  });

  it("닫기(✕) 클릭 시 onOpenChange(false)를 호출한다", () => {
    const onOpenChange = vi.fn();
    render(<ReviewForm {...defaultProps} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByText("✕"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("닫기 후 도시와 내용 필드가 초기화된다", async () => {
    const { rerender } = render(<ReviewForm {...defaultProps} open={true} />);

    // 값 입력
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "서울" },
    });
    fireEvent.change(screen.getByPlaceholderText(/도시에서의 경험을 자유롭게/), {
      target: { value: "테스트 내용입니다." },
    });

    // 닫기
    fireEvent.click(screen.getByText("✕"));

    // 다시 열기
    rerender(<ReviewForm {...defaultProps} open={true} />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("");

    const textarea = screen.getByPlaceholderText(/도시에서의 경험을 자유롭게/) as HTMLTextAreaElement;
    expect(textarea.value).toBe("");
  });

  it("오버레이 클릭 시 onOpenChange(false)를 호출한다", () => {
    const onOpenChange = vi.fn();
    render(<ReviewForm {...defaultProps} onOpenChange={onOpenChange} />);

    // 오버레이는 fixed inset-0 div (overlayRef)
    // getByRole로 찾을 수 없으므로 data-testid 대신 직접 overlay 요소를 쿼리
    const overlay = document.querySelector(".fixed.inset-0") as HTMLElement;
    expect(overlay).toBeTruthy();

    // e.target === overlayRef.current 조건을 만족시키기 위해
    // overlay 자신에게 click 이벤트 발생
    fireEvent.click(overlay, { target: overlay });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
