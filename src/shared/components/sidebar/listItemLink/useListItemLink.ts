import { useMatch, useNavigate, useResolvedPath } from 'react-router';

export interface IListItemLinkProps {
  icon: string;
  label: string;
  to: string;
  onClick: (() => void) | undefined;
}

export const useListItemLink = ({ to, onClick }: Pick<IListItemLinkProps, 'to' | 'onClick'>) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return {
    match,
    handleClick
  };
};
