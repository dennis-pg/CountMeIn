import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Navbar from '../Navbar';

const Layout = ({ children, noMarginTop }) => (
  <Box sx={{ mt: !noMarginTop ? 10 : 0 }}>
    <Navbar />
    {children}
  </Box>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
