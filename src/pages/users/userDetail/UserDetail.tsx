import { DetailTool } from '@/shared/components';
import { LayoutBasePage } from '@/shared/layouts';
import { Box, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AutoCompleteCity } from '../components/autoCompleteCity/AutoCompleteCity';
import { useUserDetail } from './useUserDetail';

export const UserDetail = () => {
  const { state, actions } = useUserDetail();

  return (
    <LayoutBasePage
      title={state.pageTitle}
      listingTool={
        <DetailTool
          textButtonNew="Novo"
          showButtonSaveAndBack
          showButtonNew={state.id !== 'novo'}
          showButtonDelete={state.id !== 'novo'}
          onClickButtonSave={actions.handleSubmit(actions.onSubmit)}
          onClickButtonSaveAndBack={actions.handleSubmit(actions.onSubmit)}
          onClickButtonDelete={actions.handleDelete}
          onClickButtonNew={actions.handleNew}
          onClickButtonBack={actions.handleBack}
        />
      }>
      <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
        <Grid container direction="column" padding={2} spacing={2}>
          {state.isLoading && (
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
                control={state.control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Nome" disabled={state.isLoading} error={!!state.errors.name} helperText={state.errors.name?.message} />
                )}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Controller
                name="email"
                control={state.control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Email" disabled={state.isLoading} error={!!state.errors.email} helperText={state.errors.email?.message} />
                )}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Controller
                name="cityId"
                control={state.control}
                render={({ field }) => (
                  <AutoCompleteCity isExternalLoading={state.isLoading} value={field.value} onChange={field.onChange} error={state.errors.cityId?.message} />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
