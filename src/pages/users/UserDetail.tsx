import { DetailTool } from '@/shared/components';
import { useConfirmDialog, useSnackbar } from '@/shared/contexts';
import { useUserById, useUserDelete, useUserMutation } from '@/shared/hooks/useUsers';
import { LayoutBasePage } from '@/shared/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import { startTransition, useOptimistic } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { AutoCompleteCity } from './components/AutoCompleteCity';
import { userSchema, type UserFormData } from './schemas';

export const UserDetail = () => {
  const { id } = useParams();
  const isNew = id === 'novo';

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { confirm } = useConfirmDialog();

  const { data: userData, isLoading } = useUserById(Number(id));
  const user = userData instanceof Error ? undefined : userData;

  const { mutateAsync } = useUserMutation();
  const deleteMutation = useUserDelete();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', cityId: undefined },
    values: user
  });

  const [optimisticName, setOptimisticName] = useOptimistic(user?.name || 'Novo', (_state, newName: string) => newName);

  const onSubmit = (data: UserFormData) => {
    startTransition(async () => {
      setOptimisticName(data.name);
      await mutateAsync({ id: isNew ? undefined : Number(id), ...data });
      navigate('/usuarios');
    });
  };

  const handleDelete = async () => {
    const confirmed = await confirm('Confirmar exclusão', 'Deseja realmente excluir este registro?');
    if (confirmed) {
      deleteMutation.mutate(Number(id), {
        onSuccess: () => {
          showSnackbar('Registro excluído com sucesso!', 'success');
          navigate('/usuarios');
        },
        onError: (error) => {
          showSnackbar(error.message, 'error');
        }
      });
    }
  };

  return (
    <LayoutBasePage
      title={id !== 'novo' ? `Detalhes de usuário: ${optimisticName}` : 'Novo usuário'}
      listingTool={
        <DetailTool
          textButtonNew="Novo"
          showButtonSaveAndBack
          showButtonNew={id !== 'novo'}
          showButtonDelete={id !== 'novo'}
          onClickButtonSave={() => handleSubmit(onSubmit)()}
          onClickButtonSaveAndBack={() => handleSubmit(onSubmit)()}
          onClickButtonDelete={handleDelete}
          onClickButtonNew={() => navigate('/usuarios/detalhe/novo')}
          onClickButtonBack={() => navigate('/usuarios')}
        />
      }>
      <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
        <Grid container direction="column" padding={2} spacing={2}>
          {isLoading && (
            <Grid>
              <LinearProgress variant="indeterminate" />
            </Grid>
          )}

          <Grid>
            <Typography variant="h6">Geral</Typography>
          </Grid>

          <Grid container direction="row" spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Nome" disabled={isLoading} error={!!errors.name} helperText={errors.name?.message} />
                )}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Email" disabled={isLoading} error={!!errors.email} helperText={errors.email?.message} />
                )}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Controller
                name="cityId"
                control={control}
                render={({ field }) => (
                  <AutoCompleteCity isExternalLoading={isLoading} value={field.value} onChange={field.onChange} error={errors.cityId?.message} />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
