import { RoutesPage } from '@/shared/environment';
import { useConfirmDialogStore, useDeleteUser, useGetAllUser, useSnackbarStore } from '@/shared/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const useUserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { confirm } = useConfirmDialogStore();

  const [isPending, startTransition] = useTransition();

  const search = searchParams.get('search') || '';
  const page = Number(searchParams.get('page') || '1');

  const { data, isFetching } = useSuspenseQuery(useGetAllUser(page, search));

  const users = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const deleteMutation = useDeleteUser();

  const titlePage = 'Listagem de Usuários';

  const isLoading = isPending || isFetching;

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

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchParams({ search: value, page: '1' }, { replace: true });
    });
  };

  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      setSearchParams({ search, page: newPage.toString() }, { replace: true });
    });
  };

  const handleNew = () => navigate(`${RoutesPage.USERS_DETAIL}/novo`);

  const handleEdit = (id: number) => navigate(`${RoutesPage.USERS_DETAIL}/${id}`);

  return {
    state: {
      users,
      totalCount,
      isLoading,
      titlePage,
      search,
      page
    },
    actions: {
      handleDelete,
      handleSearch,
      handleNew,
      handleEdit,
      handlePageChange
    }
  };
};
