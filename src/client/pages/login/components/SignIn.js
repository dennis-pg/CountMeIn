import * as React from 'react';
import {
  Box, Link, TextField, Button, Grid
} from '@mui/material';

const SignIn = () => {
  console.log();
  return (
    <>
      <Grid container>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
      </Grid>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Box sx={{ m: '2em 0em', alignSelf: 'start' }}>
        <Link href="/forgot-password" variant="body2">
          Forgot password?
        </Link>
      </Box>
    </>
  );
};

export default SignIn;
