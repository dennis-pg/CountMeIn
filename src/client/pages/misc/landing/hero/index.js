import * as React from 'react';
import {
  Typography, Grid, Paper, CssBaseline, Stack
} from '@mui/material';
import backgroundSrc from '../../../../../../public/images/White-Background.png';
import graphicSrc from '../../../../../../public/images/Graphic.png';
import { useTheme } from '@emotion/react';


const Hero = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        backgroundImage: `url(${backgroundSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      alignItems="center"
    >
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
      >
        <Stack spacing={6} sx={{ ml: 15, pb: 10 }}>
          <Typography variant="h1">Power of Data in <span style={{ color: theme.palette.primary.main }}>Your</span> Hands!</Typography>
          <Typography sx={{ fontSize:'2em' }}>Count Me In lets you own your data and you get <span style={{ color: theme.palette.primary.main, fontWeight: 700 }}> paid </span></Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        square
      >
        <img src={graphicSrc} alt="Graphic" style={{ width: '50em', filter: 'drop-shadow(5px 5px 5px #CCC)' }} />
      </Grid>
    </Grid>
  )
};

export default Hero;
