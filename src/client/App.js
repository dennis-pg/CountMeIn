import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Navbar from './shared/components/Navbar';
import Login from './pages/login/index';
import SignUp from './pages/login/components/SignUp';
import { AuthProvider } from "./contexts/AuthContext"

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
    <AuthProvider>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Sample />} />
    </Routes>
    </AuthProvider>
  </ThemeProvider>
);
