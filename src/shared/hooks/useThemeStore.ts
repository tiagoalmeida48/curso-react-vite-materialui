import { create } from 'zustand';

export interface IThemeStore {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

const LOCAL_STORAGE_THEME_KEY = 'theme';

export const useThemeStore = create<IThemeStore>((set) => {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  const initialTheme = storedTheme === 'dark' ? 'dark' : 'light';

  return {
    themeName: initialTheme,
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.themeName === 'light' ? 'dark' : 'light';
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        return { themeName: newTheme };
      })
  };
});
