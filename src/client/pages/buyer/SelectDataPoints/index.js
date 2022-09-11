import * as React from 'react';
import {
  Stack, Typography, Grid, Button, Box, TextField
} from '@mui/material';
import * as RandomString from 'randomstring';
import Layout from '../../../shared/components/Layout';
import DataPointRow from './DataPointRow';
import Filters from './Filters';
import MailUs from '../../../shared/components/Mail/MailUs';
const SelectDataPoints = () => {
  const [state, setState] = React.useState({ dataPointKeys: [RandomString.generate()] });
  const onAdd = (key) => {
    const dataPointKeys = [...state.dataPointKeys];
    const keyIndex = dataPointKeys.findIndex(datapointKey => datapointKey === key);
    dataPointKeys.splice(keyIndex + 1, 0, RandomString.generate());
    if (keyIndex !== -1) {
      setState({ dataPointKeys });
    }
  };
  const onRemove = (key) => {
    const dataPointKeys = [...state.dataPointKeys];
    const keyIndex = dataPointKeys.findIndex(datapointKey => datapointKey === key);
    dataPointKeys.splice(keyIndex, 1);
    if (keyIndex !== -1) {
      setState({ dataPointKeys });
    }
  };

  return (
    <Layout>
      <Stack alignItems="center" mb={5}>
        <Stack alignItems="center" p={5}>
          <Typography variant="h2" sx={{ m: 2 }}>Select Data Points For Survey</Typography>
        </Stack>
        <Typography variant="h4" sx={{ m: 2, mt: 5, mb: 4 }}>Filters</Typography>
        <Filters />
        <Typography variant="h4" sx={{ m: 2, mt: 10, mb: 4 }}>Data Points</Typography>
        <Grid container spacing={2} px={15} alignItems="center" justifyContent="center" sx={{ textAlign: 'center' }}>
          {state.dataPointKeys.map(key => (
            <DataPointRow
              key={key}
              dataPointKey={key}
              onAdd={onAdd}
              onRemove={onRemove}
              hideRemove={state.dataPointKeys.length === 1}
            />
          ))}
        </Grid>
        <Typography variant="h4" sx={{ m: 2, mt: 10, mb: 4 }}>Data Points Required</Typography>
        <Grid container spacing={2} px={15} alignItems="center" justifyContent="center">
          <TextField
            margin="normal"
            fullWidth
            id="dataPointsRequired"
            label="Number of Data Points Required"
            name="dataPointsRequired"
            type="number"
          />
        </Grid>
        <Box sx={{ m: 4, mt: 10 }}>
          <Button
            variant="contained"
          >
            Search
          </Button>
        </Box>
        <MailUs label="Not finding what you're looking for? Reach us" mailto="mailto:support@count-me-in.com" />

      </Stack>
    </Layout>
  );
};

export default SelectDataPoints;
