import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { type ReactNode } from 'react';
import { useThemeStore, type IThemeStore } from '@/shared/hooks/useThemeStore';
import { DarkTheme, LightTheme } from '@/shared/themes';

interface AppThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const themeName = useThemeStore((state: IThemeStore) => state.themeName);

  const theme = themeName === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
        {children}
      </Box>
    </ThemeProvider>
  );
};
