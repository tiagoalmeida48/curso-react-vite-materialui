import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { type PropsWithChildren } from 'react';
import { useLogin } from './useLogin';

export const Login = ({ children }: PropsWithChildren) => {
  const { state, actions } = useLogin();

  if (state.isAuthenticated) return <>{children}</>;
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '250px', gap: 2 }}>
            <Typography variant="h4" align="center">
              Login
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              disabled={state.isLoading}
              error={!!state.errors.email}
              helperText={state.errors.email?.message}
              {...actions.register('email')}
            />

            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              type="password"
              disabled={state.isLoading}
              error={!!state.errors.password}
              helperText={state.errors.password?.message}
              {...actions.register('password')}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              variant="contained"
              onClick={actions.handleSubmit(actions.onSubmit)}
              disabled={state.isLoading}
              endIcon={state.isLoading && <CircularProgress variant="indeterminate" size={20} color="inherit" />}>
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
