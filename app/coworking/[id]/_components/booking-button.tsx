"use client";

export function BookingButton() {
  return (
    <button
      onClick={() => alert("준비 중입니다.")}
      className="w-full py-3 rounded-xl bg-[#FF6B35] text-white font-semibold hover:bg-[#FF6B35]/90 transition-colors"
    >
      예약 문의
    </button>
  );
}
