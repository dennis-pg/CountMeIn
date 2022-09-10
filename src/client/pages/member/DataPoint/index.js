import * as React from 'react';
import {
  Stack, Typography, Grid, TextField, Button, Box
} from '@mui/material';
import { ExpandMore, FileCopy } from '@mui/icons-material';

import Layout from '../../../shared/components/Layout';
import DataPointAccordion from './components/DataPointAccordion/index';
import DefaultDataPointValuesModal from './components/DefaultDataModal/index';
import { ManageDataPointsContextFormProvider } from '../contexts/ManageDataPointsFormContext';
import { getUserDetails } from '../../../FirestoreMember'

const dataPointsObjArray = [{
    "data_point_name": 'Blood Pressure',
    "access_control": [{
        "access_name": "Government",
        "access": true,
        "base_price": 100
      },{
        "access_name": "Commercial",
        "access": true,
        "base_price": 200
      },{
        "access_name": "Academia",
        "access": false,
        "base_price": 50
      }
    ],
  },
  {
    "data_point_name": 'SGBT',
    "access_control": [{
        "access_name": "Government",
        "access": true,
        "base_price": 400
      },{
        "access_name": "Commercial",
        "access": false,
        "base_price": 200
      },{
        "access_name": "Academia",
        "access": false,
        "base_price": 50
      }
    ],
  },
  {
    "data_point_name": 'Cholestrol',
    "access_control": [{
        "access_name": "Government",
        "access": false,
        "base_price": 100
      },{
        "access_name": "Commercial",
        "access": true,
        "base_price": 500
      },{
        "access_name": "Academia",
        "access": false,
        "base_price": 50
      }
    ],
  },
]; 
  
const dataPointsList = ['SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];

const ManageDataPoints = () => {
  const [formState, setFormState] = React.useState({data: dataPointsObjArray});
  const [state, setState] = React.useState({ modalOpen: false, filterText: '', panel: undefined });
  const handleOpen = () => setState({ ...state, modalOpen: true });
  const handleClose = () => setState({ ...state, modalOpen: false });
  const handleAccordionToggle = text => setState({
    ...state, panel: state.panel === text ? undefined : text
  });

  const handleChange = (key, newValue) => {
    // const error = validateInput(name, newValue);
    console.log("handleChange",key,newValue, formState);
    setFormState({...formState, [key]: newValue});
 }

 React.useEffect(() => {
  console.log("kfjhwsdefjwef", getUserDetails());
 }, [])

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
        <ManageDataPointsContextFormProvider value = {{ formState, handleChange }}>
          <Grid container sx={{ p: 5 }} spacing={5}>
            {
              formState.data
                .filter(entry => entry["data_point_name"].includes(state.filterText))
                .map(entry => (
                  <Grid item xs={12} md={6} lg={4} key={entry["data_point_name"]}>
                    <DataPointAccordion
                      dataPointName={entry["data_point_name"]}
                      data={entry}
                      access_control_key={"access_control"}
                      panel={state.panel}
                      handleAccordionToggle={handleAccordionToggle}
                    />
                  </Grid>
                ))
            }
          </Grid>
        </ManageDataPointsContextFormProvider>
      </Stack>
    </Layout>
  );
};

export default ManageDataPoints;
