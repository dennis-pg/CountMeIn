import * as React from 'react';
import {
  Box, Link, TextField, Button, Grid
} from '@mui/material';
// import { Form, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../../contexts/AuthContext"
import { useHistory } from "react-router-dom"

const SignIn = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  console.log();
  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

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
          ref={emailRef}
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
        ref={passwordRef}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onSubmit={handleSubmit}
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
