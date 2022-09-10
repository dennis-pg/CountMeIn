import * as React from 'react';
import {
  Slider, Stack, Grid, Typography, TextField
} from '@mui/material';
import PropTypes from 'prop-types';

const DataPointSlider = ({ initialValue, max }) => {
  const [value, setValue] = React.useState({
    percentage: Math.round(initialValue / max * 100), number: initialValue
  });

  const handleSliderChange = (event, newValue) => {
    setValue({ percentage: newValue, number: Math.round(newValue / 100 * max) });
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value === '' ? '' : Number(event.target.value);
    setValue({ percentage: Math.round((inputValue ?? 0) / max * 100), number: inputValue });
  };

  const handleBlur = () => {
    if (value.number < 0) {
      setValue({ percentage: 0, number: 0 });
    } else if (value.number > max) {
      setValue({ percentage: max, number: max });
    }
  };

  return (
    <Stack>
      <Typography id="input-slider" gutterBottom>
        Number of data points
      </Typography>
      <Grid container spacing={4} alignItems="center" sx={{ width: '100%' }}>
        <Grid item xs={10}>
          <Slider
            value={value.percentage ?? 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            value={value.number}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

DataPointSlider.propTypes = {
  initialValue: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default DataPointSlider;
