import * as React from 'react';
import {
  Stack, Typography, Grid, TextField, Button, Box
} from '@mui/material';
import { ExpandMore, FileCopy } from '@mui/icons-material';

import Layout from '../../../shared/components/Layout';
import DataPointAccordion from './components/DataPointAccordion/index';
import DefaultDataPointValuesModal from './components/DefaultDataModal/index';

const dataPointsList = ['Blood Pressure', 'SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];

const ManageDataPoints = () => {
  const [state, setState] = React.useState({ modalOpen: false, filterText: '', panel: undefined });
  const handleOpen = () => setState({ ...state, modalOpen: true });
  const handleClose = () => setState({ ...state, modalOpen: false });
  const handleAccordionToggle = text => setState({
    ...state, panel: state.panel === text ? undefined : text
  });

  console.log(state.panel);
  return (
    <Layout>
      <Stack>
        <Typography variant="h2" sx={{ m: 2 }}>Manage My Data Points</Typography>
        <Stack direction="row" m="2em 3em" justifyContent="space-between">
          <Stack spacing={2} direction="row" alignItems="start">
            <Box>
              <Button
                variant="outlined"
                startIcon={<ExpandMore />}
                fullWidth={false}
                onClick={() => {
                  setState({ ...state, panel: state.panel !== null ? null : undefined });
                }}
              >
                Toggle All
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                startIcon={<FileCopy />}
                fullWidth={false}
                onClick={() => {
                  handleOpen(true);
                }}
              >
                Set Default Values
              </Button>
              <DefaultDataPointValuesModal open={state.modalOpen} handleClose={handleClose} />
            </Box>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="start">
            <Box>
              <TextField
                label="Filter"
                name="datapointsearch"
                type="text"
                size="small"
                onChange={(event) => {
                  if (state.filterText !== event.target.value) {
                    setState({ ...state, filterText: event.target.value });
                  }
                }}
              />
            </Box>
          </Stack>

        </Stack>
        <Grid container sx={{ p: 5 }} spacing={5}>
          {
            dataPointsList
              .filter(text => text.includes(state.filterText))
              .map(text => (
                <Grid item xs={12} md={6} lg={4} key={text}>
                  <DataPointAccordion
                    dataPointName={text}
                    panel={state.panel}
                    handleAccordionToggle={handleAccordionToggle}
                  />
                </Grid>
              ))
          }
        </Grid>
      </Stack>
    </Layout>
  );
};

export default ManageDataPoints;
