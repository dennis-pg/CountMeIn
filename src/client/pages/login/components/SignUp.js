import * as React from 'react';
import {
  TextField, Button, Grid
} from '@mui/material';
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import Alert from '@mui/material/Alert';

const SignUp = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const history = useNavigate()
  const { signup,updateUserType } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const [userType,setUserType] = useState("") 
  function handleMemberSignup(e)
  {
    e.preventDefault()
    handleSubmit("Member")
  }
  function handleBuyerSignup(e)
  {
    e.preventDefault()
    handleSubmit("Buyer")
  }
  
  async function handleSubmit(userType) {
    console.log("handleSubmit");  
    
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value,userType)
      history('/')

    } catch(err) {
      console.log("Failed:"+err);
    
      setError("Failed to create an account:"+err)
    }
    setLoading(false)
  }

  
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
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
        onClick={handleMemberSignup}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up as Member
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleBuyerSignup}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up as Buyer
      </Button>
    </>
  );
};

export default SignUp;
