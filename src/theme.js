import { createTheme } from '@mui/material/styles';

// Modern color palette
const colors = {
  primary: {
    50: '#f0f4ff',
    100: '#e0e9ff',
    200: '#c7d8ff',
    300: '#a5beff',
    400: '#8296ff',
    500: '#667eea', // Main primary
    600: '#5a67d8',
    700: '#4c51bf',
    800: '#434190',
    900: '#3730a3',
  },
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6', // Main secondary
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    warning: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
    info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    card: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.95)',
    border: 'rgba(255, 255, 255, 0.2)',
    backdrop: 'blur(20px)',
  }
};

// Modern shadows
const shadows = {
  glass: '0 8px 32px rgba(31, 38, 135, 0.37)',
  card: '0 4px 15px rgba(0, 0, 0, 0.1)',
  hover: '0 8px 25px rgba(0, 0, 0, 0.15)',
  button: '0 4px 15px rgba(102, 126, 234, 0.4)',
  buttonHover: '0 6px 20px rgba(102, 126, 234, 0.6)',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
      gradient: colors.gradient.background,
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: colors.gradient.background,
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: colors.glass.background,
          backdropFilter: colors.glass.backdrop,
          border: `1px solid ${colors.glass.border}`,
          boxShadow: shadows.glass,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: shadows.hover,
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          boxShadow: shadows.card,
        },
        elevation1: {
          boxShadow: shadows.card,
        },
        elevation2: {
          boxShadow: shadows.hover,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: colors.gradient.primary,
          color: 'white',
          boxShadow: shadows.button,
          '&:hover': {
            background: colors.gradient.primary,
            boxShadow: shadows.buttonHover,
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            background: 'rgba(102, 126, 234, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary[400],
                borderWidth: 2,
              },
            },
            '&.Mui-focused': {
              backgroundColor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary[500],
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: colors.glass.background,
          backdropFilter: colors.glass.backdrop,
          border: `1px solid ${colors.glass.border}`,
          boxShadow: shadows.glass,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: colors.gradient.primary,
          '& .MuiTableCell-head': {
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.025em',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(102, 126, 234, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        filled: {
          background: colors.gradient.secondary,
          color: 'white',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors.gradient.primary,
          boxShadow: shadows.card,
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: colors.glass.background,
          backdropFilter: colors.glass.backdrop,
          border: `1px solid ${colors.glass.border}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          background: colors.glass.background,
          backdropFilter: colors.glass.backdrop,
          border: `1px solid ${colors.glass.border}`,
          boxShadow: shadows.glass,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: shadows.card,
          border: 'none',
        },
        filledSuccess: {
          background: colors.gradient.success,
        },
        filledInfo: {
          background: colors.gradient.info,
        },
        filledWarning: {
          background: colors.gradient.warning,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          borderRadius: 8,
          margin: '0 4px',
          transition: 'all 0.3s ease',
          '&.Mui-selected': {
            background: colors.gradient.primary,
            color: 'white',
            boxShadow: shadows.button,
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: colors.gradient.primary,
          boxShadow: shadows.button,
          '&:hover': {
            background: colors.gradient.primary,
            boxShadow: shadows.buttonHover,
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
  // Custom theme extensions
  custom: {
    colors,
    shadows,
    gradients: colors.gradient,
    glass: colors.glass,
  },
});

export default theme;
