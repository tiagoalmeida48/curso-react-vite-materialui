import { createTheme } from '@mui/material';
import { cyan, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      light: yellow[500],
      dark: yellow[800],
      contrastText: '#fff'
    },
    secondary: {
      main: cyan[700],
      light: cyan[300],
      dark: cyan[400],
      contrastText: '#fff'
    },
    background: {
      paper: '#fff',
      default: '#f7f6f3'
    }
  }
});
