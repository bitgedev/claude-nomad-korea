"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { useFavorites } from "@/providers/favorites-provider";
import { reviews, cities, coworkingSpaces } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CityCard } from "@/components/cards/city-card";
import { CoworkingCard } from "@/components/cards/coworking-card";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";

const CITIES = ["서울", "부산", "제주", "대구", "인천", "광주", "대전"];

type ProfileTab = "reviews" | "fav-cities" | "fav-coworking";

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { favorites } = useFavorites();
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [favoriteCity, setFavoriteCity] = useState("");
  const [activeTab, setActiveTab] = useState<ProfileTab>("reviews");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const myReviews = reviews.filter((r) => r.nickname === user.nickname);
  const favCities = cities.filter((c) => favorites.includes(c.id));
  const favCoworkings = coworkingSpaces.filter((s) => favorites.includes(s.id));

  function handleEdit() {
    setNickname(user!.nickname);
    setFavoriteCity(user!.favoriteCity ?? "");
    setEditing(true);
  }

  function handleSave() {
    updateUser({ nickname: nickname.trim() || user!.nickname, favoriteCity: favoriteCity || undefined });
    setEditing(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10 flex flex-col gap-8">
        {/* 프로필 카드 */}
        <section className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">내 프로필</h1>
            {!editing && (
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-[#1B9AAA] text-[#1B9AAA] hover:bg-[#1B9AAA]/10"
                onClick={handleEdit}
              >
                내 정보 수정
              </Button>
            )}
          </div>

          {editing ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">닉네임</label>
                <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">관심 도시</label>
                <select
                  value={favoriteCity}
                  onChange={(e) => setFavoriteCity(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                >
                  <option value="">선택 안함</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  className="bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white rounded-full"
                  onClick={handleSave}
                >
                  저장
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setEditing(false)}
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <dt className="text-muted-foreground">닉네임</dt>
              <dd className="font-medium text-foreground">{user.nickname}</dd>
              <dt className="text-muted-foreground">이메일</dt>
              <dd className="font-medium text-foreground">{user.email}</dd>
              <dt className="text-muted-foreground">가입일</dt>
              <dd className="font-medium text-foreground">
                {new Date(user.joinedAt).toLocaleDateString("ko-KR")}
              </dd>
              <dt className="text-muted-foreground">관심 도시</dt>
              <dd className="font-medium text-foreground">{user.favoriteCity ?? "—"}</dd>
            </dl>
          )}
        </section>

        {/* 탭 */}
        <section className="flex flex-col gap-4">
          <div className="flex gap-1 border-b border-border">
            {(
              [
                { id: "reviews", label: `내 리뷰 (${myReviews.length})` },
                { id: "fav-cities", label: `즐겨찾기 도시 (${favCities.length})` },
                { id: "fav-coworking", label: `즐겨찾기 코워킹 (${favCoworkings.length})` },
              ] as { id: ProfileTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#1B9AAA] text-[#1B9AAA]"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "reviews" && (
            myReviews.length === 0 ? (
              <EmptyState icon="📝" message="아직 작성한 리뷰가 없습니다." actionLabel="리뷰 쓰기" actionHref="/reviews" />
            ) : (
              <div className="flex flex-col gap-3">
                {myReviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border bg-card p-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{r.cityName}</span>
                      <span className="text-sm text-amber-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{r.content}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === "fav-cities" && (
            favCities.length === 0 ? (
              <EmptyState icon="🏙️" message="즐겨찾기한 도시가 없습니다." actionLabel="도시 탐색" actionHref="/cities" />
            ) : (
              <div className="flex flex-col gap-4">
                {favCities.map((city) => (
                  <CityCard key={city.id} city={city} />
                ))}
              </div>
            )
          )}

          {activeTab === "fav-coworking" && (
            favCoworkings.length === 0 ? (
              <EmptyState icon="💻" message="즐겨찾기한 코워킹 스페이스가 없습니다." actionLabel="코워킹 탐색" actionHref="/coworking" />
            ) : (
              <div className="flex flex-col gap-4">
                {favCoworkings.map((space) => (
                  <Link key={space.id} href={`/coworking/${space.id}`}>
                    <CoworkingCard space={space} />
                  </Link>
                ))}
              </div>
            )
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
