import { Stack } from '@mui/material';
import * as React from 'react';
import Layout from '../../../shared/components/Layout';
import Hero from './hero';

const Landing = () => (
  <Layout noMarginTop={true}>
    <Stack>
      <Hero />
    </Stack>
  </Layout>
);


export default Landing;
