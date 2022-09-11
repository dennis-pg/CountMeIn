import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete, TextField, Grid, IconButton
} from '@mui/material';
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material';

const dataPointsList = ['Blood Pressure', 'SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];

const DataPointRow = ({
  dataPointKey, onAdd, onRemove, hideRemove
}) => {
  const [state, setState] = React.useState();

  return(
    <>
      <Grid item xs={10}>
        <Autocomplete
          disablePortal
          id="dataPoint1"
          name="dataPoint1"
          options={dataPointsList}
          renderInput={params => <TextField {...params} label="Data Point" />}
          onChange={(event, value) => {console.log("autocomplete state", value); setState(value)}}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          aria-label="Add Data point"
          color="primary"
          onClick={(event) => {console.log("onAdd", state); onAdd(dataPointKey, state)}}
        >
          <AddCircleRounded />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        { !hideRemove
          && (
            <IconButton
              aria-label="Delete Data Point"
              color="primary"
              onClick={() => onRemove(dataPointKey)}
            >
              <RemoveCircleRounded />
            </IconButton>
          )
        }
      </Grid>
    </>
  );
}

DataPointRow.propTypes = {
  dataPointKey: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  hideRemove: PropTypes.bool
};

DataPointRow.defaultProps = {
  hideRemove: false
};


export default DataPointRow;
