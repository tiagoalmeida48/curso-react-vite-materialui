import { ListingTool } from '@/shared/components';
import { Environment } from '@/shared/environment';
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
import { useUserList } from './useUserList';

export const UserList = () => {
  const { state, actions } = useUserList();

  return (
    <LayoutBasePage
      title={state.titlePage}
      listingTool={
        <ListingTool
          showSearch
          buttonNewLabel="Novo"
          search={state.search}
          onClickButtonNew={actions.handleNew}
          changeSearch={actions.handleSearch}
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
            {state.isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {!state.isLoading &&
              state.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <IconButton size="small" onClick={() => actions.handleDelete(user.id)}>
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton size="small" onClick={() => actions.handleEdit(user.id)}>
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
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