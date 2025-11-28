import { useState, type ReactNode } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Box, Card, CardContent, CardActions, Button, Typography, TextField, CircularProgress } from "@mui/material";
import * as yup from 'yup';

interface ILoginProps {
  children: ReactNode;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (isAuthenticated) return (
    <>{children}</>
  );

  const handleSubmit = async () => {
    setLoading(true);
    loginSchema.validate({ email, password }, { abortEarly: false }).then((dataValidated) => {
      login(dataValidated.email, dataValidated.password).then(() => {
        setLoading(false);
        setEmail('');
        setPassword('');
      });
    }).catch((errors: yup.ValidationError) => {
      setLoading(false);
      errors.inner.forEach((error) => {
        if (error.path === 'email') {
          setEmailError(error.message);
        } else if (error.path === 'password') {
          setPasswordError(error.message);
        }
      });
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '250px', gap: 2 }}>
            <Typography variant="h4" align="center">Login</Typography>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              disabled={loading}
              onKeyDown={() => setEmailError('')}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              disabled={loading}
              onKeyDown={() => setPasswordError('')}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button 
              variant="contained" 
              onClick={handleSubmit} 
              disabled={loading}
              endIcon={loading && <CircularProgress variant="indeterminate" size={20} color="inherit" />}
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};