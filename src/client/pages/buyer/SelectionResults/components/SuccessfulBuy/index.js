import {
  Typography, Stack
} from '@mui/material';
import * as React from 'react';
import { CheckCircleRounded } from '@mui/icons-material';
import MailUs from '../../../../../shared/components/Mail/MailUs';

const SuccessfulBuy = ({}) => (
  
  <Stack alignItems="center" justifyContent="center" spacing={10} mt={20}>
    <Stack alignItems="center" justifyContent="center" direction="row" spacing={5}>
      <CheckCircleRounded color="primary" sx={{ fontSize: '80px' }}/>
      <Typography variant="h1"> Congratulations! </Typography>
    </Stack>
    <Stack spacing={2} alignItems="center" justifyContent="center">
      <Typography>Your order has been placed.</Typography>
      <Typography>The Count Me In team will reach out to you regarding confirmation and payment details.</Typography>
    </Stack>
    <MailUs label="For any queries, please contact us here" mailto="mailto:support@count-me-in.com" />
  </Stack>
);
  
  export default SuccessfulBuy;
  