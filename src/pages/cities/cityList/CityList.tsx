import { ListingTool } from '@/shared/components';
import { Environment } from '@/shared/environment';
import { useCityList } from './useCityList';
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

export const CityList = () => {
  const { state, actions } = useCityList();

  return (
    <LayoutBasePage
      title={state.titlePage}
      listingTool={
        <ListingTool
          showSearch
          buttonNewLabel="Nova"
          search={state.search}
          onClickButtonNew={actions.handleNew}
          changeSearch={(value) => actions.handleSearch(value)}
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
            {state.isLoading && (
              <TableRow>
                <TableCell colSpan={2}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {!state.isLoading &&
              state.cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell>
                    <IconButton size="small" onClick={() => actions.handleDelete(city.id)}>
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton size="small" onClick={() => actions.handleEdit(city.id)}>
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{city.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          {state.totalCount === 0 && !state.isLoading && <caption>{Environment.LIST_EMPTY}</caption>}
          <TableFooter>
            {state.totalCount > Environment.LIMIT_LINE && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={state.page}
                    count={Math.ceil(state.totalCount / Environment.LIMIT_LINE)}
                    onChange={(_, newPage) => actions.handlePageChange(newPage)}
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
