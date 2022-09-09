import * as React from 'react';
import {
  Box, Link, TextField, Button, Grid
} from '@mui/material';
// import { Form, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"

const SignIn = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const history = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch(e) {
      console.log("Failed"+e)
      setError("Failed to log in")
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
          inputRef={emailRef}
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
        inputRef={passwordRef}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleSubmit}
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
