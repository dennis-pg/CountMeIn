import * as React from 'react';
import {
  Divider, Stack, Typography, Grid, Box, Paper, CssBaseline
} from '@mui/material';
import { useTheme } from '@emotion/react';
import GoogleButton from './components/GoogleButton';
import FacebookButton from './components/FacebookButton';
import Email from './components/Email';
import logoSrc from '../../../../public/images/Logo.svg';


const Login = () => {
  const theme = useTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521080755838-d2311117f767?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1562&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" alignItems="center">
            <Box sx={{ mt: 1 }}>
              <img alt="Count Me In Logo" src={logoSrc} width={80} height={80} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'Montserrat',
                textDecoration: 'none',
                color: theme.palette.primary.main
              }}
            >
              COUNT ME IN
            </Typography>
          </Stack>


          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, textAlign: 'center' }}>
            <Divider sx={{ mb: 4 }}><Typography sx={{ color: '#AAAAAA' }}>continue with email</Typography></Divider>
            <Email />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
