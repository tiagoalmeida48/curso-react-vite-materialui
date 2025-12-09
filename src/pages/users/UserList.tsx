import { ListingTool } from '@/shared/components';
import { Environment } from '@/shared/environment';
import { usersQuery, useUserDelete } from '@/shared/hooks';
import { useConfirmDialogStore } from '@/shared/hooks/useConfirmDialogStore';
import { useSnackbarStore } from '@/shared/hooks/useSnackbarStore';
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
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router';

export const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { confirm } = useConfirmDialogStore();

  const search = () => searchParams.get('search') || '';

  const page = () => Number(searchParams.get('page') || '1');

  const { data, isLoading, isFetching } = useQuery(usersQuery(page(), search()));

  const users = data?.data || [];
  const totalCount = data?.totalCount || 0;

  const deleteMutation = useUserDelete();

  const handleDelete = async (id: number) => {
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
  };

  return (
    <LayoutBasePage
      title="Listagem de Usuários"
      listingTool={
        <ListingTool
          showSearch
          buttonNewLabel="Novo"
          search={search()}
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
            {isLoading || isFetching ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
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
              ))
            )}
          </TableBody>
          {totalCount === 0 && !isLoading && !isFetching && <caption>{Environment.LIST_EMPTY}</caption>}
          <TableFooter>
            {(isLoading || totalCount > Environment.LIMIT_LINE) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page()}
                    count={Math.ceil(totalCount / Environment.LIMIT_LINE)}
                    onChange={(_, newPage) => setSearchParams({ search: search(), page: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
};
