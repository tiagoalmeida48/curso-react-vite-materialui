import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { type ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { LightTheme, DarkTheme } from '../themes';
import { Box } from '@mui/material';

interface ThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext({} as ThemeContextData);

const LOCAL_STORAGE_THEME_KEY = 'theme';

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, themeName === 'light' ? 'dark' : 'light');
    setThemeName((oldThemeName) => oldThemeName === 'light' ? 'dark' : 'light');
  }, [themeName]);

  useEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (theme) {
      setThemeName(theme as 'light' | 'dark');
    }
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') {
      return LightTheme;
    }
    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
