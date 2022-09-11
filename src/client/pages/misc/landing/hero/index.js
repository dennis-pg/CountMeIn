import * as React from 'react';
import {
  Typography, Grid, Paper, CssBaseline, Stack
} from '@mui/material';
import backgroundSrc from '../../../../../../public/images/White-Background.png';
import graphicSrc from '../../../../../../public/images/Graphic.png';


const Hero = () => (
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
      <Stack spacing={1} sx={{ ml: 15, pb: 10 }}>
        <Typography variant="h1">Your Healthcare privacy</Typography>
        <Typography variant="h1">is our goal</Typography>
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
);

export default Hero;
