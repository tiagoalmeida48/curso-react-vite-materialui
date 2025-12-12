import { RoutesPage } from '@/shared/environment';
import { useConfirmDialogStore, useCreateOrUpdateUser, useDeleteUser, useGetByIdUser, useSnackbarStore } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useOptimistic } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { userSchema, type UserFormData } from '../schemas';

export const useUserDetail = () => {
  const { id } = useParams();
  const isNew = id === 'novo';

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { confirm } = useConfirmDialogStore();

  const { data: userData, isLoading } = useGetByIdUser(Number(id));
  const user = userData instanceof Error ? undefined : userData;

  const { mutateAsync } = useCreateOrUpdateUser();
  const deleteMutation = useDeleteUser();

  const [optimisticName, setOptimisticName] = useOptimistic(user?.data.name || 'Novo', (_state, newName: string) => newName);

  const pageTitle = id !== 'novo' ? `Detalhes de usuário: ${optimisticName}` : 'Novo usuário';

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', cityId: undefined },
    values: user?.data
  });

  const onSubmit = (data: UserFormData) => {
    startTransition(async () => {
      setOptimisticName(data.name);
      await mutateAsync({ id: isNew ? undefined : Number(id), ...data });
      navigate(RoutesPage.USERS);
    });
  };

  const handleDelete = async () => {
    const confirmed = await confirm('Confirmar exclusão', 'Deseja realmente excluir este registro?');
    if (confirmed) {
      deleteMutation.mutate(Number(id), {
        onSuccess: () => {
          showSnackbar('Registro excluído com sucesso!', 'success');
          navigate(RoutesPage.USERS);
        },
        onError: (error) => {
          showSnackbar(error.message, 'error');
        }
      });
    }
  };

  const handleBack = () => navigate(RoutesPage.USERS);

  const handleNew = () => navigate(`${RoutesPage.USERS_DETAIL}/novo`);

  return {
    state: {
      id,
      control,
      errors,
      isLoading,
      pageTitle
    },
    actions: {
      onSubmit,
      handleSubmit,
      handleDelete,
      handleBack,
      handleNew
    }
  };
};
