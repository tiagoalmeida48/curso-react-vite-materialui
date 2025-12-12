import { useGetAllCity, useGetAllUser } from '@/shared/hooks';
import { LayoutBasePage } from '@/shared/layouts';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Dashboard = () => {
  const { data: users } = useSuspenseQuery(useGetAllUser());
  const { data: cities } = useSuspenseQuery(useGetAllCity());
  const totalCountCities = cities?.totalCount || 0;
  const totalCountUsers = users?.totalCount || 0;

  return (
    <LayoutBasePage title="Página Inicial" listingTool="">
      <Box width="100%" display="flex" flexDirection="column">
        <Grid container margin={1} marginY={10} display="flex" flexDirection="column">
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
