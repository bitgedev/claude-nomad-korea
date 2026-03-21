import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { RsvpButton } from "@/app/meetups/[id]/_components/rsvp-button";
import {
  createMockSupabaseClient,
} from "../helpers/supabase-mock";

const mockClient = createMockSupabaseClient();

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => mockClient),
}));

// setup.ts에서 next/navigation이 이미 mock됨
// 각 테스트에서 mockPush를 공유하기 위해 beforeEach에서 설정
let mockPush: ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockPush = vi.fn();
  vi.mocked(useRouter).mockReturnValue({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  } as any);

  // 기본 query builder 응답 초기화
  mockClient._queryBuilder._response = { data: null, error: null };

  // delete().eq().eq() 마지막 체인이 Promise를 반환하도록 설정
  mockClient._queryBuilder.eq.mockReturnValue(mockClient._queryBuilder);
  mockClient._queryBuilder.delete.mockReturnValue(mockClient._queryBuilder);
  mockClient._queryBuilder.insert.mockReturnValue(mockClient._queryBuilder);
  mockClient._queryBuilder.update.mockReturnValue(mockClient._queryBuilder);

  // eq의 마지막 호출이 Promise를 반환 (delete chain용)
  mockClient._queryBuilder.eq.mockImplementation(() => {
    return Promise.resolve({ data: null, error: null });
  });
  mockClient._queryBuilder.update.mockImplementation(() => ({
    eq: vi.fn().mockResolvedValue({ data: null, error: null }),
  }));
  mockClient._queryBuilder.insert.mockResolvedValue({ data: null, error: null });
  mockClient._queryBuilder.delete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      eq: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  });
});

const defaultProps = {
  meetupId: "meetup-1",
  initialRsvp: 10,
  maxAttendees: 30,
  initialHasRsvped: false,
  isLoggedIn: true,
};

describe("RsvpButton", () => {
  it("rsvp / maxAttendees 인원을 표시한다", () => {
    render(<RsvpButton {...defaultProps} initialRsvp={10} maxAttendees={30} />);
    expect(screen.getByText("10 / 30명")).toBeInTheDocument();
  });

  it("isLoggedIn=false이면 버튼 텍스트가 '로그인 후 참가 신청'이다", () => {
    render(<RsvpButton {...defaultProps} isLoggedIn={false} />);
    expect(screen.getByRole("button", { name: "로그인 후 참가 신청" })).toBeInTheDocument();
  });

  it("isLoggedIn=true, initialHasRsvped=false이면 버튼 텍스트가 '참가 신청하기'이다", () => {
    render(<RsvpButton {...defaultProps} isLoggedIn={true} initialHasRsvped={false} />);
    expect(screen.getByRole("button", { name: "참가 신청하기" })).toBeInTheDocument();
  });

  it("initialHasRsvped=true이면 버튼 텍스트가 '참가 취소하기'이다", () => {
    render(<RsvpButton {...defaultProps} initialHasRsvped={true} />);
    expect(screen.getByRole("button", { name: "참가 취소하기" })).toBeInTheDocument();
  });

  it("rsvp >= maxAttendees이고 joined=false이면 '정원 마감' 텍스트와 버튼이 disabled된다", () => {
    render(
      <RsvpButton
        {...defaultProps}
        initialRsvp={30}
        maxAttendees={30}
        initialHasRsvped={false}
      />
    );
    const btn = screen.getByRole("button", { name: "정원 마감" });
    expect(btn).toBeDisabled();
    expect(screen.getByText(/정원이 마감되었습니다/)).toBeInTheDocument();
  });

  it("initialHasRsvped=true이면 '✓ 참가 신청이 완료되었습니다' 메시지를 표시한다", () => {
    render(<RsvpButton {...defaultProps} initialHasRsvped={true} />);
    expect(screen.getByText("✓ 참가 신청이 완료되었습니다")).toBeInTheDocument();
  });

  it("비로그인 상태에서 버튼 클릭 시 router.push('/login')을 호출한다", async () => {
    render(<RsvpButton {...defaultProps} isLoggedIn={false} />);
    fireEvent.click(screen.getByRole("button", { name: "로그인 후 참가 신청" }));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("참가 신청 클릭 시 meetup_rsvps INSERT와 meetups UPDATE를 호출한다", async () => {
    render(<RsvpButton {...defaultProps} initialHasRsvped={false} isLoggedIn={true} />);
    fireEvent.click(screen.getByRole("button", { name: "참가 신청하기" }));

    await waitFor(() => {
      expect(mockClient.from).toHaveBeenCalledWith("meetup_rsvps");
      expect(mockClient.from).toHaveBeenCalledWith("meetups");
    });
    expect(mockClient._queryBuilder.insert).toHaveBeenCalled();
  });

  it("참가 신청 성공 시 rsvp가 +1되고 버튼 텍스트가 '참가 취소하기'로 변경된다", async () => {
    render(
      <RsvpButton
        {...defaultProps}
        initialRsvp={10}
        maxAttendees={30}
        initialHasRsvped={false}
        isLoggedIn={true}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "참가 신청하기" }));

    await waitFor(() => {
      expect(screen.getByText("11 / 30명")).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "참가 취소하기" })).toBeInTheDocument();
  });

  it("참가 취소 클릭 시 meetup_rsvps DELETE와 meetups UPDATE를 호출한다", async () => {
    render(<RsvpButton {...defaultProps} initialHasRsvped={true} isLoggedIn={true} />);
    fireEvent.click(screen.getByRole("button", { name: "참가 취소하기" }));

    await waitFor(() => {
      expect(mockClient.from).toHaveBeenCalledWith("meetup_rsvps");
      expect(mockClient.from).toHaveBeenCalledWith("meetups");
    });
    expect(mockClient._queryBuilder.delete).toHaveBeenCalled();
  });

  it("참가 취소 성공 시 rsvp가 -1되고 버튼 텍스트가 '참가 신청하기'로 변경된다", async () => {
    render(
      <RsvpButton
        {...defaultProps}
        initialRsvp={10}
        maxAttendees={30}
        initialHasRsvped={true}
        isLoggedIn={true}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "참가 취소하기" }));

    await waitFor(() => {
      expect(screen.getByText("9 / 30명")).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "참가 신청하기" })).toBeInTheDocument();
  });

  it("처리 중일 때 버튼 텍스트가 '처리 중...'이다", async () => {
    // auth.getUser가 resolve되기 전까지 loading 상태 확인을 위해 지연 시뮬레이션
    let resolveGetUser: (value: any) => void;
    const getUserPromise = new Promise((resolve) => {
      resolveGetUser = resolve;
    });
    mockClient.auth.getUser.mockReturnValueOnce(getUserPromise);

    render(<RsvpButton {...defaultProps} initialHasRsvped={false} isLoggedIn={true} />);
    fireEvent.click(screen.getByRole("button", { name: "참가 신청하기" }));

    // 비동기 처리 시작 직후 loading 상태
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "처리 중..." })).toBeInTheDocument();
    });

    // promise resolve
    resolveGetUser!({ data: { user: { id: "mock-user-id-123" } }, error: null });
  });
});
