import { ListingTool } from '@/shared/components';
import { Environment } from '@/shared/environment';
import { useConfirmDialogStore, useDeleteCity, useGetAllCity, useSnackbarStore } from '@/shared/hooks';
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
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const CityList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { confirm } = useConfirmDialogStore();

  const [isPending, startTransition] = useTransition();

  const search = () => searchParams.get('search') || '';
  const page = () => Number(searchParams.get('page') || '1');

  const { data, isFetching } = useSuspenseQuery(useGetAllCity(page(), search()));
  const cities = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const deleteMutation = useDeleteCity();

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
      title="Listagem de Cidades"
      listingTool={
        <ListingTool
          showSearch
          buttonNewLabel="Nova"
          search={search()}
          onClickButtonNew={() => navigate('/cidades/detalhe/nova')}
          changeSearch={(value) => startTransition(() => setSearchParams({ search: value, page: '1' }, { replace: true }))}
        />
      }>
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(isFetching || isPending) && (
              <TableRow>
                <TableCell colSpan={2}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {!(isFetching || isPending) &&
              cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleDelete(city.id)}>
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton size="small" onClick={() => navigate(`/cidades/detalhe/${city.id}`)}>
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{city.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          {totalCount === 0 && !(isFetching || isPending) && <caption>{Environment.LIST_EMPTY}</caption>}
          <TableFooter>
            {totalCount > Environment.LIMIT_LINE && (
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
