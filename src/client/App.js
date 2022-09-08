import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Navbar from './shared/components/Navbar.js/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008080',
    },
  },
});

const Sample = () => (
  <div>
    <Navbar />
    <p>Sample</p>
  </div>
);

const Sample2 = () => (
  <div>
    <p>Sample2</p>
  </div>
);

export default () => (
  <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/sample" element={<Sample2 />} />
      <Route path="/" element={<Sample />} />
    </Routes>
  </ThemeProvider>
);
