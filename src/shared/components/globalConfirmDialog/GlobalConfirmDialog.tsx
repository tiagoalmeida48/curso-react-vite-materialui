import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useConfirmDialogStore } from '@/shared/hooks';

export const GlobalConfirmDialog = () => {
  const { open, title, description, onConfirm, onCancel, isLoading } = useConfirmDialogStore();

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus disabled={isLoading}>
          {isLoading ? 'Confirmando...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
