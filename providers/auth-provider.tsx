"use client";

import React, { createContext, useContext, useState } from "react";

export type MockUser = {
  id: string;
  email: string;
  nickname: string;
  joinedAt: string;
  favoriteCity?: string;
};

type AuthContextType = {
  user: MockUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<Pick<MockUser, "nickname" | "favoriteCity">>) => void;
};

const STORAGE_KEY = "nomad_korea_user";
const MOCK_TAKEN_NICKNAMES = ["admin", "nomad", "테스터", "관리자"];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as MockUser) : null;
    } catch {
      return null;
    }
  });

  const persist = (u: MockUser | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };

  const login = async (email: string, password: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("올바른 이메일 형식이 아닙니다.");
    }
    if (password.length < 6) {
      throw new Error("비밀번호는 6자 이상이어야 합니다.");
    }
    const newUser: MockUser = {
      id: `user_${Date.now()}`,
      email,
      nickname: email.split("@")[0],
      joinedAt: new Date().toISOString(),
    };
    persist(newUser);
  };

  const signup = async (email: string, password: string, nickname: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("올바른 이메일 형식이 아닙니다.");
    }
    if (password.length < 6) {
      throw new Error("비밀번호는 6자 이상이어야 합니다.");
    }
    if (MOCK_TAKEN_NICKNAMES.includes(nickname)) {
      throw new Error("이미 사용 중인 닉네임입니다.");
    }
    if (nickname.trim().length < 2) {
      throw new Error("닉네임은 2자 이상이어야 합니다.");
    }
    const newUser: MockUser = {
      id: `user_${Date.now()}`,
      email,
      nickname,
      joinedAt: new Date().toISOString(),
    };
    persist(newUser);
  };

  const logout = () => persist(null);

  const updateUser = (updates: Partial<Pick<MockUser, "nickname" | "favoriteCity">>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    persist(updated);
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
