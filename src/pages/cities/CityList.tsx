import { ListingTool } from '@/shared/components';
import { useConfirmDialog, useSnackbar } from '@/shared/contexts';
import { Environment } from '@/shared/environment';
import { useCities, useCityDelete } from '@/shared/hooks';
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

export const CityList: React.FC = memo(() => {
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

  const { data, isLoading, isError, error } = useCities(page, search);
  const cities = data?.data || [];
  const totalCount = data?.totalCount || 0;

  const deleteMutation = useCityDelete();

  if (isError && error) {
    console.error('Erro ao carregar cidades:', error);
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
      title="Listagem de Cidades"
      listingTool={
        <ListingTool
          showSearch
          buttonNewLabel="Nova"
          search={search}
          onClickButtonNew={() => navigate('/cidades/detalhe/nova')}
          changeSearch={(value) => setSearchParams({ search: value, page: '1' }, { replace: true })}
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
            {cities.map((city) => (
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
