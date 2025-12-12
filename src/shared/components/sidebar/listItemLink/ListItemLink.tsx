import { Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useListItemLink, type IListItemLinkProps } from './useListItemLink';

export const ListItemLink = ({ icon, label, to, onClick }: IListItemLinkProps) => {
  const { match, handleClick } = useListItemLink({ to, onClick });

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
