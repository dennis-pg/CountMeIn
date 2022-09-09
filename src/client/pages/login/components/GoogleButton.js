import * as React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import googleSrc from '../../../../../public/icons/google-logo.png';

const GoogleMuiButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('rgb(66, 133, 246)'),
  backgroundColor: 'rgb(66, 133, 246)',
  '&:hover': {
    backgroundColor: 'rgb(51, 103, 214)',
  },
}));

const GoogleButton = () => {
  const GoogleIcon = (
    <img alt="google-sign-in" src={googleSrc} width="20" height="20" />
  );

  return (
    <GoogleMuiButton variant="contained" startIcon={GoogleIcon} style={{ textTransform: 'none', fontWeight: 'bold' }}>
      Continue with Google
    </GoogleMuiButton>
  );
};

export default GoogleButton;
