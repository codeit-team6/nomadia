import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '../types/auth.types';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;
  logout: () => void;
  // setTokens를 통해 토큰만 교체 가능
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      accessToken: null,
      refreshToken: null,

      login: ({ user, accessToken, refreshToken }) =>
        set({
          isLoggedIn: true,
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
      setTokens: ({ accessToken, refreshToken }) =>
        set({
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
