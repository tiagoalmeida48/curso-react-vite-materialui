import { useAuthStore } from '@/shared/hooks/useAuthStore';
import { useDrawerStore } from '@/shared/hooks/useDrawerStore';
import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { type ReactNode } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router';
import Perfil from '../../../assets/Perfil Tiago.png';
import { useThemeStore, type IThemeStore } from '@/shared/hooks/useThemeStore';

interface SidebarProps {
  children: ReactNode;
}

interface ListItemLinkProps {
  icon: string;
  label: string;
  to: string;
  onClick: (() => void) | undefined;
}

export const ListItemLink = ({ icon, label, to, onClick }: ListItemLinkProps) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const Sidebar = ({ children }: SidebarProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
  const toggleDrawerOpen = useDrawerStore((state) => state.toggleDrawerOpen);
  const drawerOptions = useDrawerStore((state) => state.drawerOptions);
  const toggleTheme = useThemeStore((state: IThemeStore) => state.toggleTheme);

  const { logout } = useAuthStore();

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}>
        <Box width={theme.spacing(28)} display="flex" flexDirection="column" height="100%">
          <Box display="flex" alignItems="center" justifyContent="center" height={theme.spacing(28)} width="100%">
            <Avatar src={Perfil} sx={{ width: theme.spacing(12), height: theme.spacing(12) }} />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((option) => (
                <ListItemLink
                  key={option.label}
                  icon={option.icon}
                  label={option.label}
                  to={option.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar Tema" />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
