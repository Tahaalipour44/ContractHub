// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import theme from './theme/theme';
import { Box } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          style={{
            borderRadius: '12px',
            border: '1px solid rgba(0, 255, 136, 0.3)',
          }}
        >
          <AuthProvider>
            <Box sx={{ 
              minHeight: '100vh',
              background: 'radial-gradient(circle at 50% 50%, #1a2a2a 0%, #0a0f0f 100%)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'repeating-linear-gradient(45deg, rgba(0, 255, 136, 0.03) 0px, rgba(0, 255, 136, 0.03) 2px, transparent 2px, transparent 8px)',
                pointerEvents: 'none',
              }
            }}>
              <AppRoutes />
            </Box>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;