import {
  Card, CardContent, Typography, Stack, Grid, Button
} from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';

const DataPointPrice = ({
  name, recommended, cheapest
}) => (
  <Card
    sx={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 6px 0 rgba(0, 0, 0, 0.19)', width: '100%' }}
  >
    <CardContent>
      <Stack spacing={2}>
        <Stack direction="row" sx={{ width: '100%', textAlign: 'center' }}>
          <Typography sx={{ paddingX: 3 }}>{`${name}`}</Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button variant="contained" size="large">
              Recommended:
              { recommended }
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" size="large">
              Cheapest:
              { cheapest }
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
);

DataPointPrice.propTypes = {
  name: PropTypes.string.isRequired,
  recommended: PropTypes.number.isRequired,
  cheapest: PropTypes.number.isRequired,
};

export default DataPointPrice;
