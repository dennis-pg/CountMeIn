import * as React from 'react';
import {
  Typography, Grid, Switch, TextField,
} from '@mui/material';

const PolicyControls = () => (
  <>
    {['Government', 'Academia', 'Commercial'].map(
      category => (
        <Grid container spacing={3} sx={{ mb: 2 }} key={category}>
          <Grid item xs={4}>
            <Typography sx={{ mt: 1 }}>
              {`${category}`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Switch />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Base price"
              name="baseprice"
              type="number"
              size="small"
            />
          </Grid>
        </Grid>
      )
    )}
  </>
);

export default PolicyControls;
