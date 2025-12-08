import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

interface ConfirmDialogContextData {
  confirm: (title: string, message: string) => Promise<boolean>;
}

interface ConfirmDialogProviderProps {
  children: ReactNode;
}

const ConfirmDialogContext = createContext({} as ConfirmDialogContextData);

export const useConfirmDialog = () => useContext(ConfirmDialogContext);

export const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((dialogTitle: string, dialogMessage: string): Promise<boolean> => {
    setTitle(dialogTitle);
    setMessage(dialogMessage);
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolverRef.current) {
      resolverRef.current(true);
      resolverRef.current = null;
    }
    setOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    if (resolverRef.current) {
      resolverRef.current(false);
      resolverRef.current = null;
    }
    setOpen(false);
  }, []);

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
};
