import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Perfil from '../../../assets/Perfil Tiago.png';
import { type ReactNode } from 'react';
import { Home } from '@mui/icons-material';
import { useDrawerContext } from '../../contexts';

interface IMenuLateralProps {
  children: ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { drawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer open={drawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}>
        <Box
          width={theme.spacing(28)}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={theme.spacing(28)}
            width="100%"
          >
            <Avatar
              src={Perfil}
              sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Página Inicial" />
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
