import * as React from 'react';
import {
  Stack, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Grid, Button
} from '@mui/material';
import Layout from '../../../shared/components/Layout';
import DataPointSlider from './components/DataPointSlider';
import { useLocation } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import SuccessfulBuy from './components/SuccessfulBuy';

const results = {
  cheapest_price: 6300985,
  recommended_price: 12597612,
  maximumDataPoints: 157092,
};

const SelectionResults = () => {
  // const { state } = useBuyerSearchFormContext();
  const state = useLocation().state;
  const [ prevSearchState, setPrevSearchState ] = React.useState({sold: false});

  React.useEffect(() => {
    const data = state.dataPointKeys
        .filter(dataPoint => Object.keys(dataPoint).length !== 0);
    console.log(state);
    const searchKeys = data.map(dpKey => dpKey.value);
    setPrevSearchState({...prevSearchState, searchKeys, dataPointsRequired: parseInt(state.dataPointsRequired), buySelection: "Recommended"});
  }, [state])

  return(

    <Layout>
      <Stack alignItems="center" mb={5} sx={{ paddingX: '25vw' }}>
        {
          prevSearchState.sold ? 
          <SuccessfulBuy /> :
          <>
            <Stack alignItems="center" p={5}>
              <Typography variant="h2" sx={{ m: 2 }}>Results</Typography>
            </Stack>
            { prevSearchState.dataPointsRequired &&
              <Box sx={{ width: '100%', paddingY: 8 }}>
                <DataPointSlider 
                  initialValue={prevSearchState.dataPointsRequired} 
                  max={results.maximumDataPoints} 
                  onChange={(newValue) => {
                    setPrevSearchState({...prevSearchState, dataPointsRequired: newValue})
                  }} 
                />
              </Box>
            }
            {
              prevSearchState.searchKeys && prevSearchState.buySelection &&
              <Grid container sx={{ width: '100%', paddingY: 8 }}>

                {/* Data Points */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <Typography variant="h6"> Data points requested </Typography>
                      <List>
                        {
                          prevSearchState.searchKeys &&
                            prevSearchState.searchKeys
                            .map(key => {
                              return (
                                <ListItem>
                                  <ListItemIcon>
                                    <ArrowForward />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={key}
                                  />
                                </ListItem>
                              );
                            })
                        }
                      </List>
                  </Stack>
                </Grid>

                {/* Price */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <Button
                      variant={prevSearchState.buySelection === "Recommended" ? "contained" : "outlined"}
                      onClick={() => {
                        setPrevSearchState({...prevSearchState, buySelection: "Recommended"})
                      }}
                    >
                      <Stack>
                        <Typography sx={{textTransform: "none"}}>Recommended</Typography>
                        <Typography>$ { Math.round(results.recommended_price * prevSearchState.dataPointsRequired / results.maximumDataPoints).toLocaleString("en-US") }</Typography>
                      </Stack>
                    </Button>
                    <Button
                      variant={prevSearchState.buySelection === "Cheapest" ? "contained" : "outlined"}
                      onClick={() => {
                        setPrevSearchState({...prevSearchState, buySelection: "Cheapest"})
                      }}
                    >
                      <Stack>
                        <Typography sx={{textTransform: "none"}}>Cheapest</Typography>
                        <Typography>$ { Math.round(results.cheapest_price * prevSearchState.dataPointsRequired / results.maximumDataPoints).toLocaleString("en-US") }</Typography>
                      </Stack>
                    </Button>
                  </Stack>
                </Grid>

              </Grid>
            }
            { prevSearchState.buySelection &&
              <Box sx={{ width: '100%', paddingY: 8, textAlign: "center" }}>
                <Button 
                  sx={{ width: '50%' }}
                  variant={"contained"}
                  onClick={() => {
                    setPrevSearchState({...prevSearchState, sold: true})
                  }}  
                >
                  BUY NOW
                </Button>
              </Box>
            }
          </>
        
        }
      </Stack>
    </Layout>   
    
  );
}


export default SelectionResults;
