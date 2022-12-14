import * as React from 'react';
import {
  Stack, Typography, Grid, TextField, Button, Box, CircularProgress
} from '@mui/material';
import { ExpandMore, FileCopy } from '@mui/icons-material';
import Layout from '../../../shared/components/Layout';
import DataPointAccordion from './components/DataPointAccordion/index';
import DefaultDataPointValuesModal from './components/DefaultDataModal/index';
import { ManageDataPointsContextFormProvider } from '../../../contexts/ManageDataPointsFormContext';
import { getUserDetails, updatePolicy } from '../../../FirestoreMember.js';
import { useAuth } from '../../../contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
  
const ManageDataPoints = () => {
  const [state, setState] = React.useState({ modalOpen: false, filterText: '', panel: undefined });
  const queryClient = useQueryClient();
  const handleOpen = () => setState({ ...state, modalOpen: true });
  const handleClose = () => {
    setState({ ...state, modalOpen: false })
    queryClient.invalidateQueries(['member-manage-data-points'])
  };
  const handleAccordionToggle = text => setState({
    ...state, panel: state.panel === text ? undefined : text
  });
  
  const { currentUser } = useAuth();

  const { isLoading, isFetching, data } = useQuery(['member-manage-data-points'], async() => {
    const data = await getUserDetails(currentUser.uid) ?? [];
    return { data };
  });

  const handleChange = async (dataPointName, buyerCategory, inputType, newValue) => {
    await updatePolicy(currentUser.uid, dataPointName, buyerCategory, inputType, newValue);
  }

  return (
    <Layout>
      { isLoading || isFetching ? <Stack alignItems="center" p={5}><CircularProgress /></Stack> :
        <Stack>
          <Stack alignItems="center" p={5}>
            <Typography variant="h2" sx={{ m: 2 }}>Manage My Data Points</Typography>
          </Stack>
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
          <ManageDataPointsContextFormProvider value = {{ data, handleChange }}>
            <DefaultDataPointValuesModal open={state.modalOpen} handleClose={handleClose} />
            <Grid container sx={{ p: 5 }} spacing={5}>
              {
                data.data
                  .filter(entry => entry["data_point_name"].includes(state.filterText))
                  .map(entry => (
                    <Grid item xs={12} md={6} lg={4} key={entry["data_point_name"]}>
                      <DataPointAccordion
                        dataPointName={entry["data_point_name"]}
                        data={entry}
                        panel={state.panel}
                        handleAccordionToggle={handleAccordionToggle}
                      />
                    </Grid>
                  ))
              }
            </Grid>
            <DefaultDataPointValuesModal open={state.modalOpen} handleClose={handleClose} />
          </ManageDataPointsContextFormProvider>
        </Stack>
      }
    </Layout>
  );
};

export default ManageDataPoints;
