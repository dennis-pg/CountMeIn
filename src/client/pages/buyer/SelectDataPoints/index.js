import * as React from 'react';
import {
  Stack, Typography, Grid, Button, Box, TextField
} from '@mui/material';
import * as RandomString from 'randomstring';
import Layout from '../../../shared/components/Layout';
import DataPointRow from './DataPointRow';
import Filters from './Filters';
import { BuyerSearchFormContextProvider } from '../../../contexts/BuyerSearchContext';
import { useNavigate } from 'react-router-dom';
import MailUs from '../../../shared/components/Mail/MailUs';

const SelectDataPoints = () => {
  const [state, setState] = React.useState({ dataPointKeys: [{key: RandomString.generate(), value: null}] });
  const history = useNavigate();

  const onSelect = (key, newValue) => {
    const dataPointKeys = [...state.dataPointKeys];
    const keyIndex = dataPointKeys.findIndex(datapoint => datapoint.key === key);
    dataPointKeys[keyIndex] = {key: key, value: newValue};
    setState({...state, dataPointKeys});
    console.log("state", state, dataPointKeys, key);
  };
  const onAdd = () => {
    const dataPointKeys = [...state.dataPointKeys];
    dataPointKeys.push({key: RandomString.generate(), value: null});
    setState({...state, dataPointKeys});
  } 
  const onRemove = (key) => {
    const dataPointKeys = [...state.dataPointKeys];
    const keyIndex = dataPointKeys.findIndex(datapoint => datapoint.key === key);
    dataPointKeys.splice(keyIndex, 1);
    if (keyIndex !== -1) {
      setState({ ...state, dataPointKeys });
    }
  };
  const onChange = (key, newValue) => {
    setState({...state, [key]:newValue});
  }

  return (
    <BuyerSearchFormContextProvider value = {{ state, onChange }}>
      <Layout>
        <Stack alignItems="center" mb={5}>
          <Stack alignItems="center" p={5}>
            <Typography variant="h2" sx={{ m: 2 }}>Select Desired Data Points</Typography>
          </Stack>
          <Typography variant="h4" sx={{ m: 2, mt: 5, mb: 4 }}>Filters</Typography>
          <Filters />
          <Typography variant="h4" sx={{ m: 2, mt: 10, mb: 4 }}>Data Points</Typography>
          <Grid container spacing={2} px={15} alignItems="center" justifyContent="center" sx={{ textAlign: 'center' }}>
            {state.dataPointKeys.map(entry => (
              <DataPointRow
                key={entry.key}
                dataPointKey={entry.key}
                onSelect={onSelect}
                onRemove={onRemove}
                onAdd={onAdd}
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
              onBlur={(event) => onChange(event.target.name, event.target.value)}
            />
          </Grid>
          <Box sx={{ m: 4, mt: 10 }}>
            <Button
              variant="contained"
              onClick={() => {console.log("onClick event pressed", state); history(
                "/selection-results", 
                {state: state}
              );}}
            >
              Search
            </Button>
          </Box>
          <MailUs label="Not finding what you're looking for? Reach us" mailto="mailto:support@count-me-in.com" />

      </Stack>
      </Layout>
    </BuyerSearchFormContextProvider>
  );
};

export default SelectDataPoints;
