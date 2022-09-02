import { createTheme } from '@mui/material/styles';

const font = "'Noto Sans TC', sans-serif";

const globalPalette = createTheme({
  status: {
    danger: '#F16063',
  },
  palette: {
    primary: {
      main: '#44C177',
      100: '#DAF3E4',
      300: '#8FDAAD',
      500: '#44C177', // default
      700: '#2C7D4D',
      900: '#143A24',
      contrastText: '#251A0D'
    },
    secondary: {
      main: '#FCD219',
      100: '#FEF6D1',
      300: '#FDE475',
      500: '#FCD219', // main
      700: '#A48910',
      900: '#4C3F08',
      contrastText: '#4A341A'
    },
    error: {
      main: '#F16063',
      contrastText: '#FFFFFF'
    },
    red: {
      main: '#FF7768'
    },
    purple: {
      main: '#5552FF'
    },
    grey: {
      100: '#F7FAFC',
      200: '#EDF2F7',
      300: '#E2E8F0',
      400: '#CBD5E0',
      500: '#A0AEC0',
      600: '#718096',
      700: '#4A5568',
      800: '#2D3748',
      900: '#1A202C'
    },
    carton: {
      100: '#ECDCCA',
      200: '#E3CBAF',
      300: '#D6B38A',
      400: '#C99B65',
      500: '#BA8241',
      600: '#956834',
      700: '#704E27',
      800: '#4A341A',
      900: '#251A0D',
    }
  },
  typography: {
    fontFamily: font,
    h1: {
      fontSize: '36px',
      fontWeight: '600',
      lineHeight: 1.4,
    },
    h2: {
      fontSize: '32px',
      lineHeight: 1.4,
    },
    h3: {
      fontSize: '28px',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '25px',
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '22px',
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '20px',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '18px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
    body3: {
      fontSize: '14px',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '27px',
    },
    caption: {
      fontSize: '12px',
      lineHeight: 1.5,
    }
  },
})

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
        disableElevation: true,
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            borderRadius: '16px',
            height: '64px',
            backgroundColor: globalPalette.palette.primary.main,
            "&:hover":{
              backgroundColor: globalPalette.palette.primary[300],
            },
            "&:active":{
              backgroundColor: globalPalette.palette.primary[300],
            },
            "&:focus":{
              backgroundColor: globalPalette.palette.primary.main,
            },
            "&:disabled":{
              backgroundColor: globalPalette.palette.carton[400],
            }
          },
          
        },
        {
          props: { variant: 'secondary' },
          style: {
            borderRadius: '45px',
            height: '48px',
            backgroundColor: globalPalette.palette.secondary.main,
            "&:hover":{
              backgroundColor: globalPalette.palette.secondary[300],
            },
            "&:active":{
              backgroundColor: globalPalette.palette.secondary[300],
            },
            "&:focus":{
              backgroundColor: globalPalette.palette.secondary.main,
            },
          },
        },
        {
          props: { variant: 'toggle' },
          style: {
            borderRadius: '8px',
            height: '28px',
            width: '28px',
            backgroundColor: 'transparent',
            "&:disabled":{
              backgroundColor: 'transparent',
            },
          },
        },
      ],
    }
  },
}, globalPalette);

export default theme;