"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { posts as mockPosts } from "@/lib/mock-data";
import type { Post, PostCategory } from "@/lib/mock-data";
import { MessageCircle, ThumbsUp, PenLine } from "lucide-react";

const CATEGORIES: PostCategory[] = ["자유", "질문", "정보공유", "후기"];
const ALL_TAB = "전체";

const CATEGORY_COLOR: Record<PostCategory, string> = {
  자유: "bg-[#4A4A4A]/10 text-[#4A4A4A]",
  질문: "bg-[#FF6B35]/10 text-[#FF6B35]",
  정보공유: "bg-[#1B9AAA]/10 text-[#1B9AAA]",
  후기: "bg-emerald-50 text-emerald-600",
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | typeof ALL_TAB>(
    ALL_TAB
  );

  function handleLike(id: string) {
    const isLiked = likedIds.has(id);
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (isLiked) next.delete(id);
      else next.add(id);
      return next;
    });
    setPosts((p) =>
      p.map((post) =>
        post.id === id ? { ...post, likes: post.likes + (isLiked ? -1 : 1) } : post
      )
    );
  }

  const filtered =
    selectedCategory === ALL_TAB
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-background">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#4A4A4A] dark:text-foreground">커뮤니티</h1>
            <p className="text-[#6B6B6B] mt-1">노마드들의 이야기를 나눠보세요</p>
          </div>
          <button
            onClick={() => alert("로그인 후 글을 작성할 수 있습니다.")}
            className="shrink-0 flex items-center gap-1.5 bg-[#1B9AAA] hover:bg-[#1B9AAA]/90 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors"
          >
            <PenLine className="w-4 h-4" />
            글 쓰기
          </button>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-2 flex-wrap mb-6">
          {[ALL_TAB, ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as PostCategory | typeof ALL_TAB)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === cat
                  ? "bg-[#1B9AAA] text-white border-[#1B9AAA]"
                  : "border-[#1B9AAA]/30 text-[#6B6B6B] hover:border-[#1B9AAA] hover:text-[#1B9AAA]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="flex flex-col gap-3">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-card border border-[#1B9AAA]/10 rounded-2xl p-5 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => alert("게시글 상세 페이지는 준비 중입니다.")}
            >
              {/* 카테고리 배지 + 제목 */}
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLOR[post.category]}`}
                >
                  {post.category}
                </span>
                <h2 className="text-[#4A4A4A] dark:text-foreground font-semibold text-sm sm:text-base line-clamp-1">
                  {post.title}
                </h2>
              </div>
              {/* 본문 미리보기 */}
              <p className="text-[#6B6B6B] text-sm line-clamp-2 mb-3">{post.content}</p>
              {/* 하단 footer: 메타 정보 + 액션 버튼 */}
              <div
                className="flex items-center justify-between border-t border-[#1B9AAA]/10 pt-3 mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 메타 정보 */}
                <div className="flex items-center gap-3 text-xs text-[#6B6B6B]">
                  <span className="font-medium text-[#4A4A4A] dark:text-foreground">
                    {post.author}
                  </span>
                  <span className="text-[#1B9AAA]">{post.city}</span>
                  <span>{post.date}</span>
                </div>
                {/* 액션 버튼 */}
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      likedIds.has(post.id) ? "text-[#FF6B35]" : "text-[#6B6B6B] hover:text-[#FF6B35]"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <div className="flex items-center gap-1 text-[#6B6B6B]">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#6B6B6B]">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">게시글이 없습니다</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
