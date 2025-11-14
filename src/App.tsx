import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { MenuLateral } from './shared/components';

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateral />
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  );
};
