// components/ThemeProvider.js
'use client';
import { useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {/* <button onClick={toggleTheme} className="p-2 text-white bg-blue-500 rounded-md">
        Toggle Dark Mode
      </button> */}
      {children}
    </MUIThemeProvider>
  );
}
