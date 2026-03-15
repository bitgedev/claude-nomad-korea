"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-6 z-50 p-3 rounded-full bg-[#1B9AAA] text-white shadow-lg hover:bg-[#1B9AAA]/90 transition-colors"
      aria-label="맨 위로 이동"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
