import * as React from 'react';
import { State } from 'country-state-city';
import {
  Grid, TextField, Autocomplete,
} from '@mui/material';
import { useBuyerSearchFormContext } from '../../../../contexts/BuyerSearchContext';

const Filters = () => {
  const states = State.getStatesOfCountry('US');
  const { onChange } = useBuyerSearchFormContext();

  return (
    <Grid container spacing={2} px={15}>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          id="gender"
          name="gender"
          options={['Male', 'Female', 'Transgender', 'Prefer not to say']}
          renderInput={params => <TextField {...params} label="Gender" />}
          onBlur={(event) => onChange(event.target.id, event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          margin="normal"
          fullWidth
          id="age"
          label="Minimum Age"
          name="age"
          type="number"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          margin="normal"
          fullWidth
          id="age"
          label="Maximum Age"
          name="age"
          type="number"
          onBlur={(event) => onChange(event.target.name, event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          id="state"
          name="state"
          options={states.map(stateObj => stateObj.name)}
          renderInput={params => <TextField {...params} label="State" />}
          onBlur={(event) => onChange(event.target.id, event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          id="zipcode"
          name="zipcode"
          freeSolo
          options={[]}
          renderInput={params => <TextField {...params} label="Zipcode" />}
          onBlur={(event) => onChange(event.target.id, event.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
