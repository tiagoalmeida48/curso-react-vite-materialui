import { DetailTool } from '@/shared/components';
import { useGetByIdCity, useDeleteCity, useCreateOrUpdateCity, useConfirmDialogStore, useSnackbarStore } from '@/shared/hooks';
import { LayoutBasePage } from '@/shared/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import { startTransition, useOptimistic } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { citySchema, type CityFormData } from './schemas';

export const CityDetail = () => {
  const { id } = useParams();
  const isNew = id === 'nova';

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { confirm } = useConfirmDialogStore();

  const { data: cityData, isLoading } = useGetByIdCity(Number(id));
  const city = cityData instanceof Error ? undefined : cityData;

  const { mutateAsync } = useCreateOrUpdateCity();
  const deleteMutation = useDeleteCity();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
    defaultValues: { name: '' },
    values: city?.data
  });

  const [optimisticName, setOptimisticName] = useOptimistic(city?.data?.name || 'Nova', (_state, newName: string) => newName);

  const onSubmit = (data: CityFormData) => {
    startTransition(async () => {
      setOptimisticName(data.name);
      await mutateAsync({ id: isNew ? undefined : Number(id), ...data });
      navigate('/cidades');
    });
  };

  const handleDelete = async () => {
    const confirmed = await confirm('Confirmar exclusão', 'Deseja realmente excluir este registro?');
    if (confirmed) {
      deleteMutation.mutate(Number(id), {
        onSuccess: () => {
          showSnackbar('Registro excluído com sucesso!', 'success');
          navigate('/cidades');
        },
        onError: (error) => {
          showSnackbar(error.message, 'error');
        }
      });
    }
  };

  return (
    <LayoutBasePage
      title={id !== 'nova' ? `Detalhes da cidade: ${optimisticName}` : 'Nova cidade'}
      listingTool={
        <DetailTool
          textButtonNew="Nova"
          showButtonSaveAndBack
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}
          onClickButtonSave={() => handleSubmit(onSubmit)()}
          onClickButtonSaveAndBack={() => handleSubmit(onSubmit)()}
          onClickButtonDelete={handleDelete}
          onClickButtonNew={() => navigate('/cidades/detalhe/nova')}
          onClickButtonBack={() => navigate('/cidades')}
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
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
