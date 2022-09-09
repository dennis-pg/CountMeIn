import * as React from 'react';
import {
  TextField, Button, Grid
} from '@mui/material';
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"

const SignUp = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const history = useNavigate()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e) {
    console.log("handleSubmit");

    
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")

    } catch(err) {
      console.log("failed"+err);
    
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
          />
        </Grid>
      </Grid>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        inputRef={emailRef}
        autoComplete="email"
      />
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
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
