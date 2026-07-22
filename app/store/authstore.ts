"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (token: string, username: string, role: string) => void;

  logout: () => void;

  setLoading: (loading: boolean) => void;

  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,

      user: null,

      isAuthenticated: false,

      loading: false,

      login: (token, username, role) =>
        set({
          token,
          user: {
            username,
            role,
          },
          isAuthenticated: true,
          loading: false,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          loading: false,
        }),

      setLoading: (loading) =>
        set({
          loading,
        }),

      updateUser: (user) =>
        set({
          user,
        }),
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);