import { notFound } from "next/navigation";
import { MapPin, Star, Wifi, Check, Clock } from "lucide-react";
import { coworkingSpaces, reviews } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ReviewCard } from "@/components/cards/review-card";
import { BookingButton } from "./_components/booking-button";

export default async function CoworkingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const space = coworkingSpaces.find((s) => s.id === id);
  if (!space) notFound();

  const spaceReviews = reviews.filter((r) => r.coworkingId === space.id);

  const weeklyPrice = Math.round(space.pricePerDay * 5.5);
  const monthlyPrice = Math.round(space.pricePerDay * 20);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb
            items={[
              { label: "홈", href: "/" },
              { label: "코워킹", href: "/coworking" },
              { label: space.name },
            ]}
          />

          <div className="mt-6 flex flex-col lg:flex-row gap-8">
            {/* 메인 콘텐츠 */}
            <div className="flex-1 flex flex-col gap-8">
              {/* 헤더 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#EDF5EE] text-[#2D6A4F] font-medium">
                    {space.city}
                  </span>
                  {space.wifi && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#E8F8FA] text-[#1B9AAA] font-medium flex items-center gap-1">
                      <Wifi className="h-3 w-3" /> WiFi
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-foreground mb-2">
                  {space.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {space.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    09:00 ~ 22:00
                  </span>
                  <span className="flex items-center gap-1 text-[#FF6B35]">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold text-[#4A4A4A] dark:text-foreground">
                      {space.rating}
                    </span>
                    <span>({space.reviewCount})</span>
                  </span>
                </div>
              </div>

              {/* 이미지 갤러리 플레이스홀더 */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 rounded-xl bg-gray-200 dark:bg-gray-700 aspect-[4/3] flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                  이미지 준비 중
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl bg-gray-200 dark:bg-gray-700 flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs">
                    이미지
                  </div>
                  <div className="rounded-xl bg-gray-200 dark:bg-gray-700 flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs">
                    이미지
                  </div>
                </div>
              </div>

              {/* 편의시설 체크리스트 */}
              <div>
                <h2 className="text-lg font-semibold text-[#4A4A4A] dark:text-foreground mb-3">
                  편의시설
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {space.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm text-[#4A4A4A] dark:text-foreground">
                      <Check className="h-4 w-4 text-[#2D6A4F]" />
                      {amenity}
                    </div>
                  ))}
                  {space.wifi && (
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A] dark:text-foreground">
                      <Check className="h-4 w-4 text-[#2D6A4F]" />
                      고속 WiFi
                    </div>
                  )}
                </div>
              </div>

              {/* 리뷰 섹션 */}
              {spaceReviews.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-[#4A4A4A] dark:text-foreground mb-4">
                    리뷰 ({spaceReviews.length})
                  </h2>
                  <div className="flex flex-col gap-4">
                    {spaceReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 사이드바 - 가격표 + 예약 */}
            <div className="lg:w-72 shrink-0">
              <div className="sticky top-24 rounded-2xl border border-[#1B9AAA]/15 bg-white dark:bg-card p-6 flex flex-col gap-5">
                <h2 className="text-base font-semibold text-[#4A4A4A] dark:text-foreground">
                  요금 안내
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-[#6B6B6B]">일일 이용</span>
                    <span className="font-semibold text-[#4A4A4A] dark:text-foreground">
                      {space.pricePerDay.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-[#6B6B6B]">주간 이용 (5.5일)</span>
                    <span className="font-semibold text-[#4A4A4A] dark:text-foreground">
                      {weeklyPrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-[#6B6B6B]">월간 이용 (20일)</span>
                    <span className="font-semibold text-[#FF6B35]">
                      {monthlyPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
                <BookingButton />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
