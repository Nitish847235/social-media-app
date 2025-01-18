// theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#f4f4f4',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});
