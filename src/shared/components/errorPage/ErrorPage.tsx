import { Box, Button, Typography } from "@mui/material";

export const ErrorPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Typography variant="h4" color="error">Ops! Algo deu errado.</Typography>
    <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
  </Box>
);