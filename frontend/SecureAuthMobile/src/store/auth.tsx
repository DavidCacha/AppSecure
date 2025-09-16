import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";
import { api } from "../api/client";

type User = { id: string; email: string; name: string };

type State = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

const secureStorage = {
  getItem: EncryptedStorage.getItem,
  setItem: EncryptedStorage.setItem,
  removeItem: EncryptedStorage.removeItem,
};

export const useAuthStore = create<State>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        set({ token, user, isAuthenticated: true });
      },

      setUser: (user) =>
        set((s) => ({ ...s, user, isAuthenticated: !!(s.token && user) })),

      logout: async () => {
        delete api.defaults.headers.common.Authorization;
        await EncryptedStorage.removeItem("auth");
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => secureStorage as any),
      partialize: (s) => ({
        token: s.token,
        user: s.user,
        isAuthenticated: s.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        try {
          const token = state?.token ?? useAuthStore.getState().token;
          if (token) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
          }
        } catch {
        }
      },
    }
  )
);
