import { createTheme } from '@mui/material';
// import montserratBoldSrc from '../../../../public/fonts/Montserrat/Montserrat-Bold.ttf';


const theme = createTheme({
  palette: {
    primary: {
      main: '#008080',
    },
  },
  typography: {
    fontFamily: 'Thiccboi',
    h1: {
      fontWeight: 700,
      fontSize: '6em',
      color: '#222'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5em',
      borderBottom: '3px solid #008080'
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25em',
      color: '#008080',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    }
  },
});

export default theme;
