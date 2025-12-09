import { useAuthStore } from '@/shared/hooks/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormData } from './schemas';

interface ILoginProps {
  children: ReactNode;
}

export const Login = ({ children }: ILoginProps) => {
  const { isAuthenticated, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  if (isAuthenticated) return <>{children}</>;

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } finally {
      setIsLoading(false);
    }
  };

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
              disabled={isLoading}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />

            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              type="password"
              disabled={isLoading}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              endIcon={isLoading && <CircularProgress variant="indeterminate" size={20} color="inherit" />}>
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
