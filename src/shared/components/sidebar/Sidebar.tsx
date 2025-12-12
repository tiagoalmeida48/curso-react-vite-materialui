import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { type PropsWithChildren } from 'react';
import Perfil from '../../../assets/Perfil Tiago.png';
import { ListItemLink } from './listItemLink/ListItemLink';
import { useSidebar } from './useSidebar';

export const Sidebar = ({ children }: PropsWithChildren) => {
  const { state, actions } = useSidebar();

  return (
    <>
      <Drawer open={state.isDrawerOpen} onClose={actions.toggleDrawerOpen} variant={state.smDown ? 'temporary' : 'permanent'}>
        <Box width={state.theme.spacing(28)} display="flex" flexDirection="column" height="100%">
          <Box display="flex" alignItems="center" justifyContent="center" height={state.theme.spacing(21)} width="100%">
            <Avatar src={Perfil} sx={{ width: state.theme.spacing(12), height: state.theme.spacing(12) }} />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {state.drawerOptions.map((option) => (
                <ListItemLink
                  key={option.label}
                  icon={option.icon}
                  label={option.label}
                  to={option.path}
                  onClick={state.smDown ? actions.toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={actions.toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar Tema" />
              </ListItemButton>
              <ListItemButton onClick={actions.logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={state.smDown ? 0 : state.theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
