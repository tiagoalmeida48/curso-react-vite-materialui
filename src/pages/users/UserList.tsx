import { ListingTool } from '@/shared/components';
import { useConfirmDialog, useSnackbar } from '@/shared/contexts';
import { Environment } from '@/shared/environment';
import { useUserDelete, useUsers } from '@/shared/hooks';
import { LayoutBasePage } from '@/shared/layouts';
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const UserList: React.FC = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { confirm } = useConfirmDialog();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  const { data, isLoading, isError, error } = useUsers(page, search);
  const users = data?.data || [];
  const totalCount = data?.totalCount || 0;

  const deleteMutation = useUserDelete();

  if (isError && error) {
    console.error('Erro ao carregar usuários:', error);
  }

  const handleDelete = useCallback(
    async (id: number) => {
      const confirmed = await confirm('Confirmar exclusão', 'Deseja realmente excluir este registro?');
      if (confirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            showSnackbar('Registro excluído com sucesso!', 'success');
          },
          onError: (error) => {
            showSnackbar(error.message, 'error');
          }
        });
      }
    },
    [confirm, deleteMutation, showSnackbar]
  );

  return (
    <LayoutBasePage
      title="Listagem de Usuários"
      listingTool={
        <ListingTool
          showSearch
          buttonNewLabel="Novo"
          search={search}
          onClickButtonNew={() => navigate('/usuarios/detalhe/novo')}
          changeSearch={(value) => setSearchParams({ search: value, page: '1' }, { replace: true })}
        />
      }>
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(user.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/usuarios/detalhe/${user.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && <caption>{Environment.LIST_EMPTY}</caption>}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && totalCount > Environment.LIMIT_LINE && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.LIMIT_LINE)}
                    onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
});
