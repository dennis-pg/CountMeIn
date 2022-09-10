import * as React from 'react';
import {
  Grid, Card, Typography, Stack, TextField, Autocomplete, Divider, Button, Box
} from '@mui/material';
import { State, City } from 'country-state-city';
import Layout from '../../../shared/components/Layout';
import DatePicker from '../../../shared/components/DatePicker/index';

const diseaseList = ['Diabetes', 'COVID-19', 'Measles', 'Mumps', 'Rubella', 'Dengue', 'HIV', 'Tuberculosis'];
const medicineList = [
  'Acetaminophen', 'Adderall', 'Amitriptyline', 'Amlodipine', 'Amoxicillin', 'Ativan', 'Atorvastatin', 'Azithromycin', 'Benzonatate', 'Brilinta', 'Bunavail', 'Buprenorphine', 'Cephalexin', 'Ciprofloxacin', 'Citalopram', 'Clindamycin', 'Clonazepam', 'Cyclobenzaprine', 'Cymbalta', 'Doxycycline', 'Dupixent', 'Entresto', 'Entyvio', 'Farxiga', 'Fentanyl', 'Fentanyl Patch', 'Gabapentin', 'Gilenya', 'Humira', 'Hydrochlorothiazide', 'Hydroxychloroquine', 'Ibuprofen', 'Imbruvica', 'Invokana', 'Januvia', 'Jardiance', 'Kevzara', 'Lexapro', 'Lisinopril', 'Lofexidine', 'Loratadine', 'Lyrica', 'Melatonin', 'Meloxicam', 'Metformin', 'Methadone', 'Methotrexate', 'Metoprolol', 'Naloxone', 'Naltrexone', 'Naproxen', 'Omeprazole', 'Onpattro', 'Otezla', 'Ozempic', 'Pantoprazole', 'Prednisone', 'Probuphine', 'Rybelsus', 'secukinumab', 'Sublocade', 'Tramadol', 'Trazodone', 'Viagra', 'Wellbutrin', 'Xanax', 'Zubsolv'
];


const MemberProfile = () => {
  const [state, setState] = React.useState({ state: undefined });
  const states = State.getStatesOfCountry('US');
  const cities = state.state
    ? City.getCitiesOfState('US', State.getStatesOfCountry('US').find(stateObj => stateObj.name === state.state).isoCode)
    : [];


  return (
    <Layout>
      <Grid container p={3} spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 6px 0 rgba(0, 0, 0, 0.19)' }}
          >
            <Stack spacing={3} p={6}>
              <Typography variant="h4">Personal Information</Typography>
              <Autocomplete
                disablePortal
                id="gender"
                name="gender"
                options={['Male', 'Female', 'Transgender', 'Prefer not to say']}
                renderInput={params => <TextField {...params} label="Gender" />}
              />
              <DatePicker
                label="Date of birth"
              />
              <Divider />
              <TextField
                margin="normal"
                required
                fullWidth
                id="streetAddress"
                label="Street Address"
                name="streetAddress"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="addressLine2"
                label="Address Line 2"
                name="addressLine2"
              />
              <Autocomplete
                disablePortal
                id="state"
                name="state"
                options={states.map(stateObj => stateObj.name)}
                onChange={(event, newValue) => { setState({ state: newValue }); }}
                renderInput={params => <TextField {...params} label="State" />}
              />
              <Autocomplete
                disablePortal
                id="city"
                name="city"
                options={cities.map(city => city.name)}
                renderInput={params => <TextField {...params} label="City" />}
              />
              <Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // onClick={handleSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 6px 0 rgba(0, 0, 0, 0.19)' }}
          >
            <Stack spacing={3} p={6}>
              <Typography variant="h4">Medical Information</Typography>
              <Autocomplete
                multiple
                id="diseases"
                options={diseaseList}
                defaultValue={
                  [
                    diseaseList[3],
                    diseaseList[5],
                    diseaseList[6],
                    diseaseList[7]
                  ]
                }
                // getOptionLabel={(option) => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Illness History"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="medication"
                options={medicineList}
                defaultValue={
                  [
                    medicineList[9],
                    medicineList[22],
                    medicineList[16],
                    medicineList[17],
                    medicineList[5],
                    medicineList[29],
                    medicineList[31],
                    medicineList[33],
                    medicineList[40],
                  ]
                }
                // getOptionLabel={(option) => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Medication"
                  />
                )}
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MemberProfile;
