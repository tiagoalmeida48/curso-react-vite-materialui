import { DetailTool } from '@/shared/components';
import { LayoutBasePage } from '@/shared/layouts';
import { CitiesService } from '@/shared/services/api/cities/CitiesService';
import { UsersService } from '@/shared/services/api/users/UsersService';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const Dashboard = () => {
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [totalCountCities, setTotalCountCities] = useState(0);
  const [totalCountUsers, setTotalCountUsers] = useState(0);

  useEffect(() => {
    setIsLoadingCities(true);
    setIsLoadingUsers(true);

    CitiesService.getAll(1).then((result) => {
      setIsLoadingCities(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountCities(result.totalCount);
      }
    });

    UsersService.getAll(1).then((result) => {
      setIsLoadingUsers(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountUsers(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBasePage title="Página Inicial" listingTool={
      <DetailTool
        showButtonNew={false}
        showButtonSaveAndBack={false}
        showButtonDelete={false}
        showButtonSave={false}
        showButtonBack={false}
      />
    }>
      <Box width='100%' display='flex' flexDirection='column'>
        <Grid container margin={2} display='flex' flexDirection='column'>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align='center'>Total de Usuários</Typography>
                  <Box padding={6} display='flex' alignItems='center' justifyContent='center'>
                    {!isLoadingUsers && <Typography variant="h1">{totalCountUsers}</Typography>}
                    {isLoadingUsers && <Typography variant="h4">Carregando...</Typography>}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align='center'>Total de Cidades</Typography>
                  <Box padding={6} display='flex' alignItems='center' justifyContent='center'>
                    {!isLoadingCities && <Typography variant="h1">{totalCountCities}</Typography>}
                    {isLoadingCities && <Typography variant="h4">Carregando...</Typography>}
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
