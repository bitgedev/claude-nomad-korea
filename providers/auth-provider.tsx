"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AuthUser = {
  id: string;
  email: string;
  nickname: string;
  joinedAt: string;
  favoriteCity?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<Pick<AuthUser, "nickname" | "favoriteCity">>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function toAuthUser(supabaseUser: User, profile: { nickname: string; favorite_city: string | null; created_at: string | null }): AuthUser {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? "",
    nickname: profile.nickname,
    joinedAt: profile.created_at ?? supabaseUser.created_at,
    favoriteCity: profile.favorite_city ?? undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // 초기 세션 확인
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await loadProfile(session.user);
      }
    });

    // 세션 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProfile(supabaseUser: User) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("nickname, favorite_city, created_at")
      .eq("id", supabaseUser.id)
      .single();

    if (profile) {
      setUser(toAuthUser(supabaseUser, profile));
    }
  }

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };

  const signup = async (email: string, password: string, nickname: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    });
    if (error) throw new Error(error.message);

    // trigger가 profiles를 자동 생성하지만, 닉네임이 올바르게 저장됐는지 확인 후 필요 시 upsert
    if (data.user) {
      await supabase
        .from("profiles")
        .upsert({ id: data.user.id, nickname }, { onConflict: "id" });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = async (updates: Partial<Pick<AuthUser, "nickname" | "favoriteCity">>) => {
    if (!user) return;
    const patch: Record<string, string> = {};
    if (updates.nickname) patch.nickname = updates.nickname;
    if (updates.favoriteCity !== undefined) patch.favorite_city = updates.favoriteCity ?? "";

    const { error } = await supabase
      .from("profiles")
      .update(patch)
      .eq("id", user.id);

    if (!error) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
