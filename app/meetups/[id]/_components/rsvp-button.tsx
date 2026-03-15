"use client";

import { useState } from "react";
import { Users } from "lucide-react";

interface RsvpButtonProps {
  initialRsvp: number;
  maxAttendees: number;
}

export function RsvpButton({ initialRsvp, maxAttendees }: RsvpButtonProps) {
  const [rsvp, setRsvp] = useState(initialRsvp);
  const [joined, setJoined] = useState(false);

  const isFull = !joined && rsvp >= maxAttendees;

  function handleToggle() {
    if (isFull) return;
    if (joined) {
      setRsvp((prev) => prev - 1);
    } else {
      setRsvp((prev) => prev + 1);
    }
    setJoined((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 진행 바 */}
      <div>
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="flex items-center gap-1.5 text-[#6B6B6B]">
            <Users className="h-4 w-4 text-[#1B9AAA]" />
            참가자
          </span>
          <span className="font-semibold text-[#4A4A4A] dark:text-foreground">
            {rsvp} / {maxAttendees}명
          </span>
        </div>
        <div className="w-full h-2 bg-[#1B9AAA]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1B9AAA] rounded-full transition-all duration-300"
            style={{ width: `${Math.min((rsvp / maxAttendees) * 100, 100)}%` }}
          />
        </div>
        {isFull && (
          <p className="text-xs text-red-500 mt-1">정원이 마감되었습니다</p>
        )}
      </div>

      {/* RSVP 버튼 */}
      <button
        onClick={handleToggle}
        disabled={isFull}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
          isFull
            ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-muted dark:text-muted-foreground"
            : joined
            ? "bg-white border-2 border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/5"
            : "bg-[#1B9AAA] text-white hover:bg-[#1B9AAA]/90"
        }`}
      >
        {isFull ? "정원 마감" : joined ? "참가 취소하기" : "참가 신청하기"}
      </button>

      {joined && (
        <p className="text-center text-xs text-[#4CAF50] font-medium">
          ✓ 참가 신청이 완료되었습니다
        </p>
      )}
    </div>
  );
}
