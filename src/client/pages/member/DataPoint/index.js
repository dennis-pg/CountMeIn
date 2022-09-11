import * as React from 'react';
import {
  Stack, Typography, Grid, TextField, Button, Box
} from '@mui/material';
import { ExpandMore, FileCopy } from '@mui/icons-material';
import Layout from '../../../shared/components/Layout';
import DataPointAccordion from './components/DataPointAccordion/index';
import DefaultDataPointValuesModal from './components/DefaultDataModal/index';
import { ManageDataPointsContextFormProvider } from '../../../contexts/ManageDataPointsFormContext';
import { getUserDetails } from '../../../FirestoreMember.js';
import { addUserDetails } from '../../../FirestoreMember.js';
import { useAuth } from '../../../contexts/AuthContext';
  
const ManageDataPoints = () => {
  const [formState, setFormState] = React.useState({data: []});
  const [state, setState] = React.useState({ modalOpen: false, filterText: '', panel: undefined });
  const handleOpen = () => setState({ ...state, modalOpen: true });
  const handleClose = () => setState({ ...state, modalOpen: false });
  const handleAccordionToggle = text => setState({
    ...state, panel: state.panel === text ? undefined : text
  });
  // const { currentUser } = useAuth();
  const currentUser = {uid: "jghj21434"};

  const handleChange = (key, newValue) => {
    // const error = validateInput(name, newValue);
    console.log("handleChange",key,newValue, formState);
    setFormState({...formState, [key]: newValue});
 }
 const handleSubmit = () =>
 {
  console.log("formState: ",formState);
  addUserDetails(currentUser?.uid,formState)
 }

 React.useEffect(() => {
  const fetchData = async () => {
    const userDetails = await getUserDetails(currentUser?.uid);
    console.log("kfjhwsdefjwef", userDetails);
    setFormState({...formState, ["data"]: userDetails});
  }
  fetchData()
    .catch(console.error);
}, [])
 React.useEffect(() => {
  console.log("updated formState", formState);
 }, [formState]);

  console.log("Panel",state.panel, currentUser?.uid);
  return (
    <Layout>
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
              <Button
                variant="outlined"
                startIcon={<FileCopy />}
                fullWidth={false}
                type="submit"
                fullWidth
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
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
