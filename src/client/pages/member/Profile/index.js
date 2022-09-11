import * as React from 'react';
import {
  Grid, Card, Typography, Stack, TextField, Autocomplete, Divider, Button, Box
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { State, City } from 'country-state-city';
import Layout from '../../../shared/components/Layout';
import DatePicker from '../../../shared/components/DatePicker/index';
import { useRef } from "react"
import { addUserProfile } from '../../../FirestoreMember.js';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserProfile } from '../../../FirestoreMember';
import Alert from '@mui/material/Alert';

const diseaseList = ['Diabetes', 'COVID-19', 'Measles', 'Mumps', 'Rubella', 'Dengue', 'HIV', 'Tuberculosis'];
const medicineList = [
  'Acetaminophen', 'Adderall', 'Amitriptyline', 'Amlodipine', 'Amoxicillin', 'Ativan', 'Atorvastatin', 'Azithromycin', 'Benzonatate', 'Brilinta', 'Bunavail', 'Buprenorphine', 'Cephalexin', 'Ciprofloxacin', 'Citalopram', 'Clindamycin', 'Clonazepam', 'Cyclobenzaprine', 'Cymbalta', 'Doxycycline', 'Dupixent', 'Entresto', 'Entyvio', 'Farxiga', 'Fentanyl', 'Fentanyl Patch', 'Gabapentin', 'Gilenya', 'Humira', 'Hydrochlorothiazide', 'Hydroxychloroquine', 'Ibuprofen', 'Imbruvica', 'Invokana', 'Januvia', 'Jardiance', 'Kevzara', 'Lexapro', 'Lisinopril', 'Lofexidine', 'Loratadine', 'Lyrica', 'Melatonin', 'Meloxicam', 'Metformin', 'Methadone', 'Methotrexate', 'Metoprolol', 'Naloxone', 'Naltrexone', 'Naproxen', 'Omeprazole', 'Onpattro', 'Otezla', 'Ozempic', 'Pantoprazole', 'Prednisone', 'Probuphine', 'Rybelsus', 'secukinumab', 'Sublocade', 'Tramadol', 'Trazodone', 'Viagra', 'Wellbutrin', 'Xanax', 'Zubsolv'
];


const MemberProfile = () => {
  const { currentUser, logout } = useAuth()
  const { isLoading, isFetching, data } = useQuery(['member-profile'], async() => {
    const data = await getUserProfile(currentUser.uid) ?? {};
    return data;
  });
  const [state, setState] = React.useState({ state: undefined });
  const [genderRef,setGenderRef] = React.useState('');
  const [dateOfBirthRef,setDateOfBirthRef] = React.useState(new Date());
  const [streetAddressRef,setStreetAddressRef] = React.useState('');
  const [illnessRef,setIllnessRef] = React.useState(
    [
      diseaseList[3],
      diseaseList[5],
      diseaseList[6],
      diseaseList[7]
    ]
  )
  const [addressLine2Ref,setAddressLine2Ref] = React.useState('');
  const [cityRef,setCityRef] = React.useState('');
  const [medicineRef,setMedicineRef]= React.useState(
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
  )
  const [submitMessage,setSubmitMessage] = React.useState('');
  const states = State.getStatesOfCountry('US');
  const cities = state.state
    ? City.getCitiesOfState('US', State.getStatesOfCountry('US').find(stateObj => stateObj.name === state.state).isoCode)
    : [];


  function handleSubmit()
  {
    var profile={
      "profile":
      {
      "gender":genderRef,
      "date_of_birth":dateOfBirthRef,
      "address":streetAddressRef.target.value,
      "address_second_line":addressLine2Ref.target.value,
      "state":state['state'],
      "city":cityRef,
      "illness":illnessRef,
      "medicine":medicineRef
      }
    }
    addUserProfile(currentUser.uid,profile); 
    setSubmitMessage('Saved');
    
  }
  return (
    isLoading || isFetching ? <div></div> :
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
                onChange={(event, newValue) => {
                  setGenderRef(newValue
                  );}}
                defaultValue={data.gender}
                options={['Male', 'Female', 'Transgender', 'Prefer not to say']}
                renderInput={params => <TextField {...params} label="Gender" />}
              />
              <DatePicker
                inputRef={dateOfBirthRef}
                onChange={(event, newValue) => {
                  setDateOfBirthRef(newValue
                  );}}
                label="Date of birth"

              />
              <Divider />
              <TextField
                margin="normal"
                defaultValue={data.streetAddress}
                fullWidth
                id="streetAddress"
                label="Street Address"
                name="streetAddress"
                onChange={(event, newValue) => {
                  setStreetAddressRef(event
                  );}}
                inputRef={streetAddressRef}
              />
              <TextField
                margin="normal"
                defaultValue={data.addressLine2}
                fullWidth
                id="addressLine2"
                label="Address Line 2"
                name="addressLine2"
                onChange={(event, newValue) => {
                  setAddressLine2Ref(event
                  );}}
                inputRef={addressLine2Ref}
              />
              <Autocomplete
                disablePortal
                defaultValue={data.state}
                id="state"
                name="state"
                options={states.map(stateObj => stateObj.name)}
                onChange={(event, newValue) => { setState({ state: newValue });}}
                renderInput={params => <TextField {...params} label="State" />}
              />
              <Autocomplete
                disablePortal
                defaultValue={data.city}
                id="city"
                name="city"
                inputRef={cityRef}
                options={cities.map(city => city.name)}
                onChange={(event, newValue) => {
                  setCityRef(newValue
                  );}}
                renderInput={params => <TextField {...params} label="City" />}
              />
              <Box>
                {submitMessage && <Alert variant="danger">Successfully saved</Alert>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
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
                onChange={(event, newValue) => 
                setIllnessRef(newValue)
                }
                defaultValue={data.illnesses}
                // getOptionLabel={(option) => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Illness History"
                    inputRef={illnessRef}
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
                onChange={(event, newValue) => 
                  setMedicineRef(newValue)
                  }
                defaultValue={data.medications}
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
