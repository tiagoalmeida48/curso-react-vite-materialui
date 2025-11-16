import { createContext, useCallback, useContext, useState } from 'react';
import { type ReactNode } from 'react';

interface DrawerContextData {
  drawerOpen: boolean;
  drawerOptions: DrawerOption[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: DrawerOption[]) => void;
}

interface DrawerProviderProps {
  children: ReactNode;
}

interface DrawerOption {
  label: string;
  icon: string;
  path: string;
}

const DrawerContext = createContext({} as DrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [drawerOptions, setDrawerOptions] = useState<DrawerOption[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: DrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ drawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};
