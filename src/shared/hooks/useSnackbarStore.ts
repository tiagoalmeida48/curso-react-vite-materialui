import { create } from 'zustand';

interface ISnackbarStore {
  message: string;
  open: boolean;
  severity: 'success' | 'info' | 'warning' | 'error';
  showSnackbar: (message: string, severity?: 'success' | 'info' | 'warning' | 'error') => void;
  hideSnackbar: () => void;
}

export const useSnackbarStore = create<ISnackbarStore>((set) => ({
  message: '',
  open: false,
  severity: 'info',
  showSnackbar: (message, severity = 'info') => {
    set({ open: true, message, severity });
  },
  hideSnackbar: () => {
    set({ open: false });
  }
}));
