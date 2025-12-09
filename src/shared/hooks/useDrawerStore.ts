import { create } from 'zustand';

interface DrawerOption {
  icon: string;
  path: string;
  label: string;
}

interface IDrawerStore {
  isDrawerOpen: boolean;
  drawerOptions: DrawerOption[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: DrawerOption[]) => void;
}

export const useDrawerStore = create<IDrawerStore>((set) => ({
  isDrawerOpen: false,
  drawerOptions: [],
  toggleDrawerOpen: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setDrawerOptions: (newDrawerOptions) => set({ drawerOptions: newDrawerOptions })
}));
