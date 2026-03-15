import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] px-4">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="flex items-baseline gap-2">
          <span className="text-8xl font-black text-[#1B9AAA]">4</span>
          <span className="text-7xl">🌿</span>
          <span className="text-8xl font-black text-[#1B9AAA]">4</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-[#4A4A4A]">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-[#6B6B6B] text-sm">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>

        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-[#1B9AAA] text-white font-semibold hover:bg-[#1B9AAA]/90 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
