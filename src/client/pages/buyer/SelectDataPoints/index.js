import * as React from 'react';
import {
  Stack, Typography, Grid, Button, Box
} from '@mui/material';
import * as RandomString from 'randomstring';
import Layout from '../../../shared/components/Layout';
import DataPointRow from './DataPointRow';

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
      <Stack alignItems="center">
        <Typography variant="h2" sx={{ m: 2 }}>Select Data Points For Survey</Typography>
        <Grid container spacing={2} p={15} alignItems="center" justifyContent="center" sx={{ textAlign: 'center' }}>
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
        <Box>
          <Button
            variant="contained"
          >
            Search
          </Button>
        </Box>
      </Stack>
    </Layout>
  );
};

export default SelectDataPoints;
