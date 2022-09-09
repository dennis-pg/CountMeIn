import * as React from 'react';
import {
  Stack, Typography, Grid, Card, CardContent, Switch, TextField
} from '@mui/material';
import Layout from '../../../shared/components/Layout';

const dataPointsList = ['Blood Pressure', 'SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];

const ManageDataPoints = () => (
  <Layout>
    <Stack>
      <Typography variant="h2" sx={{ m: 2 }}>Manage My Data Points</Typography>
      <Grid container sx={{ p: 5 }} spacing={5}>
        {
          [...Array(10).keys()].map(() => (
            <Grid item xs={12} md={6} lg={4}>
              <DataPoint />
            </Grid>
          ))
        }
      </Grid>
    </Stack>
  </Layout>
);

const DataPoint = () => (
  <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
    <CardContent>
      <Typography sx={{ mb: 4 }}>
        {dataPointsList[Math.floor(Math.random() * dataPointsList.length)]}
      </Typography>
      {['Government', 'Academia', 'Commercial'].map(
        category => (
          <Grid container spacing={3} sx={{ mb: 2 }}>
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
    </CardContent>
  </Card>
);

export default ManageDataPoints;
