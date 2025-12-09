import { DetailTool } from '@/shared/components';
import { citiesQuery, usersQuery } from '@/shared/hooks';
import { LayoutBasePage } from '@/shared/layouts';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Dashboard = () => {
  const { data: users } = useSuspenseQuery(usersQuery());
  const { data: cities } = useSuspenseQuery(citiesQuery());
  const totalCountCities = cities?.totalCount || 0;
  const totalCountUsers = users?.totalCount || 0;

  return (
    <LayoutBasePage
      title="Página Inicial"
      listingTool={
        <DetailTool showButtonNew={false} showButtonSaveAndBack={false} showButtonDelete={false} showButtonSave={false} showButtonBack={false} />
      }>
      <Box width="100%" display="flex" flexDirection="column">
        <Grid container margin={2} display="flex" flexDirection="column">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Usuários
                  </Typography>
                  <Box padding={6} display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h1">{totalCountUsers}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Cidades
                  </Typography>
                  <Box padding={6} display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h1">{totalCountCities}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
