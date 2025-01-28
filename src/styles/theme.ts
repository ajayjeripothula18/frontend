import { createTheme } from '@mui/material/styles';
import { BRAND_COLORS } from '@/lib/constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: BRAND_COLORS.primary[500],
      light: BRAND_COLORS.primary[100],
      dark: BRAND_COLORS.primary[700],
    },
    secondary: {
      main: BRAND_COLORS.secondary[500],
      light: BRAND_COLORS.secondary[100],
      dark: BRAND_COLORS.secondary[700],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.5rem',
        },
      },
    },
  },
}); 