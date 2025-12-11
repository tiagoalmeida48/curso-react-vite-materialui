import { cyan, yellow } from '@mui/material/colors';
import { extendTheme } from '@mui/material/styles';

export const MainTheme = extendTheme({
  colorSchemeSelector: 'class',
  colorSchemes: {
    light: {
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
    },
    dark: {
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
          paper: '#303134',
          default: '#202124'
        }
      }
    }
  },
  typography: {
    allVariants: {
      color: 'var(--mui-palette-text-primary)'
    }
  }
});
