import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes';
import { Sidebar } from './shared/components';
import { Login } from './shared/components/login/Login';
import { AuthProvider, ConfirmDialogProvider, DrawerProvider, SnackbarProvider } from './shared/contexts';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import './shared/forms/TranslateYup';
import { queryClient } from './shared/services/queryClient';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppThemeProvider>
          <SnackbarProvider>
            <ConfirmDialogProvider>
              <Login>
                <DrawerProvider>
                  <BrowserRouter>
                    <Sidebar>
                      <AppRoutes />
                    </Sidebar>
                  </BrowserRouter>
                </DrawerProvider>
              </Login>
            </ConfirmDialogProvider>
          </SnackbarProvider>
        </AppThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
