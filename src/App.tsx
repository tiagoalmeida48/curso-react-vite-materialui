import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { GlobalConfirmDialog, GlobalSnackbar } from './shared/components';
import { Login } from './shared/components/login/Login';
import { AppThemeProvider } from './shared/providers/appThemeProvider/AppThemeProvider';
import { queryClient } from './shared/services/queryClient';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <Login>
          <RouterProvider router={router} />
          <GlobalSnackbar />
          <GlobalConfirmDialog />
        </Login>
      </AppThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
