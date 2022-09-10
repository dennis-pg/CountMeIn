import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { ThemeProvider } from '@emotion/react';
import Login from './pages/login/index';
import SignUp from './pages/login/components/SignUp';
import { AuthProvider } from "./contexts/AuthContext"
import { useAuth } from "./contexts/AuthContext"
import ManageDataPoints from './pages/member/DataPoint';
import SelectDataPoints from './pages/buyer/SelectDataPoints';
import Faq from './pages/misc/faq';
import MemberProfile from './pages/member/Profile';
import SelectionResults from './pages/buyer/SelectionResults/index';
import Landing from './pages/misc/landing';
import theme from './shared/theme/AppTheme';

export default () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/manage-data-points" element={<ManageDataPoints />} />
        <Route path="/member-profile" element={<MemberProfile />} />
        <Route path="/select-data-points" element={<SelectDataPoints />} />
        <Route path="/selection-results" element={<SelectionResults />} />
        <Route path="/faq" element={<Faq />} />
        <Route exact path="/" element={<Sample />} />
      </Routes>
    </AuthProvider>
  </ThemeProvider>
);
