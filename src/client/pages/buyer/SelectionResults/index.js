import * as React from 'react';
import {
  Stack, Typography, Box
} from '@mui/material';
import Layout from '../../../shared/components/Layout';
import DataPointPrice from './components/DataPointPrice';
import DataPointSlider from './components/DataPointSlider';

const results = {
  prices: {
    'Blood Pressure': { recommended: 2762, cheapest: 2132 },
    SpO2: { recommended: 3664, cheapest: 2934 },
    'RBC Count': { recommended: 864, cheapest: 750 },
    SGPT: { recommended: 345, cheapest: 290 },
    SGOT: { recommended: 217, cheapest: 141 },
  },
  maximumDataPoints: 157092,
};

const SelectionResults = () => (
  <Layout>
    <Stack alignItems="center" mb={5} sx={{ paddingX: '25vw' }}>
      <Stack alignItems="center" p={5}>
        <Typography variant="h2" sx={{ m: 2 }}>Results</Typography>
      </Stack>
      <Box sx={{ width: '100%', paddingY: 8 }}>
        <DataPointSlider initialValue={10000} max={results.maximumDataPoints} />
      </Box>
      <Stack spacing={2} px={15} alignItems="center" justifyContent="center">
        {Object.keys(results.prices).map(key => (
          <DataPointPrice
            key={key}
            name={key}
            recommended={results.prices[key].recommended}
            cheapest={results.prices[key].cheapest}
          />
        ))}
      </Stack>
    </Stack>
  </Layout>
);


export default SelectionResults;
