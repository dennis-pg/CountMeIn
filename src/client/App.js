import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Navbar from './shared/components/Navbar';
import Login from './pages/login/index';
<<<<<<< HEAD
import { AuthProvider } from './contexts/AuthContext';
import ManageDataPoints from './pages/member/DataPoint/index';
=======
import ManageDataPoints from './pages/member/DataPoint';
import SelectDataPoints from './pages/buyer/SelectDataPoints';
>>>>>>> b667b68... Select Data Points Screen added

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

export default () => (
  <ThemeProvider theme={theme}>
<<<<<<< HEAD
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/manage-data-points" element={<ManageDataPoints />} />
        <Route path="/" element={<Sample />} />
      </Routes>
    </AuthProvider>
=======
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/manage-data-points" element={<ManageDataPoints />} />
      <Route path="/select-data-points" element={<SelectDataPoints />} />
      <Route path="/" element={<Sample />} />
    </Routes>
>>>>>>> b667b68... Select Data Points Screen added
  </ThemeProvider>
);
