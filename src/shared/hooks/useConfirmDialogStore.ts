import { create } from 'zustand';

interface IConfirmDialogStore {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  confirm: (title: string, description: string) => Promise<boolean>;
  resolvePromise: ((value: boolean) => void) | null;
}

export const useConfirmDialogStore = create<IConfirmDialogStore>((set, get) => ({
  open: false,
  title: '',
  description: '',
  onConfirm: () => {},
  onCancel: () => {},
  isLoading: false,
  resolvePromise: null,

  confirm: (title, description) => {
    return new Promise((resolve) => {
      set({
        open: true,
        title,
        description,
        resolvePromise: resolve,
        onConfirm: () => {
          const { resolvePromise } = get();
          if (resolvePromise) resolvePromise(true);
          set({ open: false, resolvePromise: null });
        },
        onCancel: () => {
          const { resolvePromise } = get();
          if (resolvePromise) resolvePromise(false);
          set({ open: false, resolvePromise: null });
        }
      });
    });
  }
}));
