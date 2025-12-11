import { MainTheme } from '@/shared/themes';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { GlobalConfirmDialog, GlobalSnackbar } from './shared/components';
import { Login } from './shared/components/login/Login';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 0,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: true
    }
  }
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={MainTheme}>
        <CssBaseline />
        <Box width="100vw" height="100vh" bgcolor="background.default" color="text.primary">
          <Login>
            <RouterProvider router={router} />
            <GlobalSnackbar />
            <GlobalConfirmDialog />
          </Login>
          <ReactQueryDevtools initialIsOpen={false} />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
