// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88', // سبز نئون
      light: '#4dffaa',
      dark: '#00cc6a',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ff3e3e', // قرمز
      light: '#ff6b6b',
      dark: '#cc2e2e',
    },
    background: {
      default: '#0a0f0f',
      paper: '#141a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    success: {
      main: '#00ff88',
    },
    error: {
      main: '#ff3e3e',
    },
    warning: {
      main: '#ffb74d',
    },
    info: {
      main: '#4d9fff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #fff 0%, #00ff88 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#00ff88 #0a0f0f',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0a0f0f',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#00ff88',
            borderRadius: '4px',
            '&:hover': {
              background: '#4dffaa',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(0, 255, 136, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #00ff88 0%, #00cc6a 100%)',
          color: '#000000',
          fontWeight: 700,
          '&:hover': {
            background: 'linear-gradient(45deg, #4dffaa 0%, #00ff88 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #ff3e3e 0%, #cc2e2e 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(45deg, #ff6b6b 0%, #ff3e3e 100%)',
          },
        },
        outlinedPrimary: {
          borderColor: '#00ff88',
          color: '#00ff88',
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#4dffaa',
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#141a1a',
          border: '1px solid rgba(0, 255, 136, 0.1)',
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        },
        elevation3: {
          boxShadow: '0 8px 40px rgba(0, 255, 136, 0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(0, 255, 136, 0.2)',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 136, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ff88',
              boxShadow: '0 0 10px rgba(0, 255, 136, 0.3)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 500,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#00ff88',
          },
          '& .MuiFormHelperText-root': {
            color: 'rgba(255, 255, 255, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'linear-gradient(135deg, #141a1a 0%, #1a2222 100%)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 255, 136, 0.2)',
            borderColor: '#00ff88',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
          padding: '16px',
        },
        head: {
          fontWeight: 700,
          backgroundColor: '#0a0f0f',
          color: '#00ff88',
          fontSize: '0.95rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 136, 0.05)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        colorSuccess: {
          backgroundColor: 'rgba(0, 255, 136, 0.2)',
          color: '#00ff88',
        },
        colorError: {
          backgroundColor: 'rgba(255, 62, 62, 0.2)',
          color: '#ff3e3e',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid rgba(0, 255, 136, 0.2)',
          backdropFilter: 'blur(10px)',
        },
        standardSuccess: {
          backgroundColor: 'rgba(0, 255, 136, 0.1)',
          color: '#00ff88',
        },
        standardError: {
          backgroundColor: 'rgba(255, 62, 62, 0.1)',
          color: '#ff3e3e',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 15, 15, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141a1a',
          borderRight: '1px solid rgba(0, 255, 136, 0.1)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#00ff88',
          color: '#000000',
          fontWeight: 700,
          border: '2px solid #00ff88',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          background: 'linear-gradient(135deg, #141a1a 0%, #1a2222 100%)',
          border: '1px solid rgba(0, 255, 136, 0.3)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: 700,
          background: 'linear-gradient(45deg, #00ff88 30%, #00cc6a 90%)',
          color: '#000000',
          padding: '20px 24px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          background: '#141a1a',
          border: '1px solid rgba(0, 255, 136, 0.2)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
          },
        },
      },
    },
  },
});

export default theme;