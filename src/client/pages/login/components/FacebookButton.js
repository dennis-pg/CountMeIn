import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { Facebook } from '@mui/icons-material';

const FacebookMuiButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('rgb(59, 89, 152)'),
  backgroundColor: 'rgb(59, 89, 152)',
  '&:hover': {
    backgroundColor: 'rgb(14, 31, 86)',
  },
}));

const FacebookButton = () => (
  <FacebookMuiButton variant="contained" startIcon={<Facebook />} style={{ textTransform: 'none', fontWeight: 'bold' }}>
    Continue with Facebook
  </FacebookMuiButton>
);

export default FacebookButton;
