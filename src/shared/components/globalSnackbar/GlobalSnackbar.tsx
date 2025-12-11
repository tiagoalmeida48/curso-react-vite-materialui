import { Alert, Snackbar } from '@mui/material';
import { useSnackbarStore } from '@/shared/hooks';

export const GlobalSnackbar = () => {
  const { open, message, severity, hideSnackbar } = useSnackbarStore();

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    hideSnackbar();
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
