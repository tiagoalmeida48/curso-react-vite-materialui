import { create } from 'zustand';
import { authService } from '@/shared/services';

interface IAuthStore {
  token: string | undefined;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

const LOCAL_STORAGE_TOKEN_KEY = 'token';

export const useAuthStore = create<IAuthStore>((set) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const initialToken = storedToken ? JSON.parse(storedToken) : undefined;

  return {
    token: initialToken,
    isAuthenticated: !!initialToken,

    login: async (email, password) => {
      const response = await authService.auth(email, password);

      if (response instanceof Error) {
        return response.message;
      }

      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(response));
      set({ token: response.data, isAuthenticated: true });
    },

    logout: () => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      set({ token: undefined, isAuthenticated: false });
    }
  };
});
