import { createContext, useCallback, useContext, useState } from "react";
import { type ReactNode } from "react";

interface IDrawerContextData {
  drawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

interface IDrawerProviderProps {
  children: ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ drawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
