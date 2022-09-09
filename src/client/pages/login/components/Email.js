import * as React from 'react';
import {
  Button, ButtonGroup
} from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Operations = Object.freeze({
  SIGN_IN: Symbol('sign-in'),
  SIGN_UP: Symbol('sign_up'),
});

const Email = () => {
  const [state, setState] = React.useState({
    operation: Operations.SIGN_IN
  });

  console.log(state.operation);
  return (
    <>
      <ButtonGroup variant="outlined" sx={{ mb: 4 }}>
        <Button
          variant={state.operation === Operations.SIGN_IN ? 'contained' : 'outlined'}
          onClick={() => { setState({ operation: Operations.SIGN_IN }); }}
        >
          Sign In
        </Button>
        <Button
          variant={state.operation === Operations.SIGN_UP ? 'contained' : 'outlined'}
          onClick={() => { setState({ operation: Operations.SIGN_UP }); }}
        >
          Sign Up
        </Button>
      </ButtonGroup>
      {state.operation === Operations.SIGN_IN ? <SignIn /> : <SignUp />}
    </>
  );
};

export default Email;
