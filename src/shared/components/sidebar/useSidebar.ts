import { useAuthStore } from "@/shared/hooks";
import { useColorScheme } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { useDrawerStore } from "@/shared/hooks";

export const useSidebar = () => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
  const toggleDrawerOpen = useDrawerStore((state) => state.toggleDrawerOpen);
  const drawerOptions = useDrawerStore((state) => state.drawerOptions);

  const toggleTheme = () => setMode(mode === 'light' ? 'dark' : 'light');

  const { logout } = useAuthStore();

  return {
    state: {
      theme,
      smDown,
      isDrawerOpen,
      drawerOptions
    },
    actions: {
      toggleDrawerOpen,
      toggleTheme,
      logout
    }
  };
};
