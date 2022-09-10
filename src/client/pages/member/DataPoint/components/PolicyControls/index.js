import * as React from 'react';
import {
  Typography, Grid, Switch, TextField,
} from '@mui/material';

const PolicyControls = ({data, category, onChange}) => {

  return(
    <>
      <Grid container spacing={3} sx={{ mb: 2 }} key={category}>
        <Grid item xs={4}>
          <Typography sx={{ mt: 1 }}>
            {`${category}`}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Switch 
            name={"access"}
            checked={data.access}
            onChange={(event) => {onChange(data, event.target.name, event.target.value == "on" ? true : false)}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Base price"
            name={"base_price"}
            value={data.base_price}
            type="number"
            size="small"
            onChange={(event) => {onChange(data, event.target.name, event.target.value)}}
          />
        </Grid>
      </Grid>
    </>
  );
}
  
  

export default PolicyControls;
