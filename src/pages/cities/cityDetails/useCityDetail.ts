import { RoutesPage } from '@/shared/environment';
import { useConfirmDialogStore, useCreateOrUpdateCity, useDeleteCity, useGetByIdCity, useSnackbarStore } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useOptimistic } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { citySchema, type CityFormData } from '../schemas';

export const useCityDetail = () => {
  const { id } = useParams();
  const isNew = id === 'nova';

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { confirm } = useConfirmDialogStore();

  const { data: cityData, isLoading } = useGetByIdCity(Number(id));
  const city = cityData instanceof Error ? undefined : cityData;

  const { mutateAsync } = useCreateOrUpdateCity();
  const deleteMutation = useDeleteCity();

  const [optimisticName, setOptimisticName] = useOptimistic(city?.data?.name || 'Nova', (_state, newName: string) => newName);

  const pageTitle = isNew ? 'Nova cidade' : `Detalhes da cidade: ${optimisticName}`;

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
    defaultValues: { name: '' },
    values: city?.data
  });

  const onSubmit = (data: CityFormData) => {
    startTransition(async () => {
      setOptimisticName(data.name);
      await mutateAsync({ id: isNew ? undefined : Number(id), ...data });
      navigate(RoutesPage.CITIES);
    });
  };

  const handleDelete = async () => {
    const confirmed = await confirm('Confirmar exclusão', 'Deseja realmente excluir este registro?');
    if (confirmed) {
      deleteMutation.mutate(Number(id), {
        onSuccess: () => {
          showSnackbar('Registro excluído com sucesso!', 'success');
          navigate(RoutesPage.CITIES);
        },
        onError: (error) => {
          showSnackbar(error.message, 'error');
        }
      });
    }
  };

  const handleBack = () => navigate(RoutesPage.CITIES);

  const handleNew = () => navigate(`${RoutesPage.CITIES_DETAIL}/nova`);

  return {
    state: {
      id,
      isLoading,
      control,
      errors,
      pageTitle
    },
    actions: {
      handleSubmit,
      onSubmit,
      handleDelete,
      handleBack,
      handleNew
    }
  };
};
