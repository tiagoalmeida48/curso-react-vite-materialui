import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { Sidebar } from './shared/components';
import { DrawerProvider } from './shared/contexts';
import { AuthProvider } from './shared/contexts';
import './shared/forms/TranslateYup';
import { Login } from './shared/components/login/Login';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <Sidebar>
                <AppRoutes />
              </Sidebar>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
