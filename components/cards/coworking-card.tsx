import { MapPin, Star, Wifi } from "lucide-react";
import type { CoworkingSpace } from "@/lib/mock-data";

type CoworkingCardProps = {
  space: CoworkingSpace;
};

export function CoworkingCard({ space }: CoworkingCardProps) {
  return (
    <div className="bg-white dark:bg-card border border-[#1B9AAA]/15 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-[0_4px_20px_rgba(27,154,170,0.1)] transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-[#4A4A4A] dark:text-foreground">
          {space.name}
        </h3>
        <span className="shrink-0 text-sm font-bold text-[#FF6B35]">
          {space.pricePerDay.toLocaleString()}원
          <span className="text-xs font-normal text-[#6B6B6B]">/일</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-[#6B6B6B]">
        <MapPin className="h-3.5 w-3.5 shrink-0" />
        <span>{space.address}</span>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1 text-[#FF6B35]">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="font-semibold text-[#4A4A4A] dark:text-foreground">
            {space.rating}
          </span>
          <span className="text-[#6B6B6B]">({space.reviewCount})</span>
        </div>
        {space.wifi && (
          <div className="flex items-center gap-1 text-[#1B9AAA]">
            <Wifi className="h-3.5 w-3.5" />
            <span className="text-xs">WiFi</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {space.amenities.map((amenity) => (
          <span
            key={amenity}
            className="text-xs px-2 py-0.5 rounded-full bg-[#EDF5EE] text-[#2D6A4F]"
          >
            {amenity}
          </span>
        ))}
      </div>
    </div>
  );
}
