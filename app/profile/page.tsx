"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { reviews } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const CITIES = ["서울", "부산", "제주", "대구", "인천", "광주", "대전"];

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [favoriteCity, setFavoriteCity] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const myReviews = reviews.filter((r) => r.nickname === user.nickname);

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

        {/* 내가 작성한 리뷰 */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground">
            내가 작성한 리뷰 <span className="text-[#1B9AAA]">({myReviews.length})</span>
          </h2>
          {myReviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">아직 작성한 리뷰가 없습니다.</p>
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
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
