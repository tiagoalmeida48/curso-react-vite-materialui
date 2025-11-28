import { useNavigate, useSearchParams } from 'react-router';
import { ListingTool } from '@/shared/components';
import { LayoutBasePage } from '@/shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import { CitiesService } from '@/shared/services/api/cities/CitiesService';
import { useDebounce } from '@/shared/hooks';
import type { ICity } from '@/shared/interfaces';
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
import { Environment } from '@/shared/environment';

export const CityList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(page, search).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setCities(result.data);
          setTotalCount(result.totalCount);
        }
      });
    });
  }, [page]);

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este registro?')) {
      CitiesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setCities((prevCities) => [...prevCities.filter((city) => city.id !== id)]);
          alert('Registro excluído com sucesso!');  
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
};
