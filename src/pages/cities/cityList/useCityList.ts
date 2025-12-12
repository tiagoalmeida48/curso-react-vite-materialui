import { RoutesPage } from '@/shared/environment';
import { useConfirmDialogStore, useDeleteCity, useGetAllCity, useSnackbarStore } from '@/shared/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const useCityList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { confirm } = useConfirmDialogStore();

  const [isPending, startTransition] = useTransition();

  const search = searchParams.get('search') || '';
  const page = Number(searchParams.get('page') || '1');

  const { data, isFetching } = useSuspenseQuery(useGetAllCity(page, search));
  const cities = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const isLoading = isPending || isFetching;

  const titlePage = 'Listagem de Cidades';

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

  const handleSearch = (value: string) => {
    startTransition(() => setSearchParams({ search: value, page: '1' }, { replace: true }));
  };

  const handlePageChange = (newPage: number) => {
    startTransition(() => setSearchParams({ search, page: newPage.toString() }, { replace: true }));
  };

  const handleNew = () => navigate(`${RoutesPage.CITIES_DETAIL}/nova`);

  const handleEdit = (id: number) => navigate(`${RoutesPage.CITIES_DETAIL}/${id}`);

  return {
    state: {
      cities,
      totalCount,
      isLoading,
      titlePage,
      page,
      search
    },
    actions: {
      handleDelete,
      handleSearch,
      handlePageChange,
      handleNew,
      handleEdit
    }
  };
};
