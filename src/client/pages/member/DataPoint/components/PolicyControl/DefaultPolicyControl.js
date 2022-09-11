import * as React from 'react';
import {
  Typography, Grid, Switch, TextField,
} from '@mui/material';
import { useManageDataPointsFormContext } from '../../../../../contexts/ManageDataPointsFormContext';

const DefaultPolicyControl = ({data, category }) => {
  const { handleChange } = useManageDataPointsFormContext();

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
            defaultChecked={data.master_access ? data.master_access : null}
            onChange={(event) => {
              handleChange("master_access", category, "Access", event.target.checked)
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Base price"
            name={"base_price"}
            defaultValue={data.master_value}
            type="number"
            size="small"
            onChange={(event) => {
                handleChange("master_value", category, "Access", event.target.value) 
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default DefaultPolicyControl;
