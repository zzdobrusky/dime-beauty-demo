import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Bundle from './Components/Bundle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#222',
    },
    secondary: {
      main: '#FFE4C4'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Bundle />
    </ThemeProvider>
    
  );
}

export default App;
