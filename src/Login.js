import React,  { useState, useEffect }  from 'react'

import { TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Grid, Button, Alert, AlertTitle } from '@mui/material'

import axios from "axios"
import { useNavigate } from "react-router-dom";





export default function Login() {

  useEffect(()=>{
    if (localStorage.getItem('currentLoggedInUser')){
      navigate("/")
    }

  })
  const navigate = useNavigate();

  const onSubmit = data => {
    setUsernameError("")
    setPwError("")
    setLoginAlert("")

    switch(username){
      case "":
        setUsernameError('Please enter a username.')
        break;
      default:
    }
    switch(password){
      case "":
        setPwError('Please enter a password.')
        break;
      default:
    }
      if (username !== "" && password !== ""){
        let userObj = JSON.parse(localStorage.getItem(username))
        if (userObj.password!== password){
          setLoginAlert(
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Username or password is incorrect, please try again.
            </Alert>
          )
        } else {
          localStorage.setItem('currentLoggedInUser', username)
          setLoginAlert(<Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Login succesfull!
        </Alert>)
        }



      }


  };
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [pwError, setPwError] = useState("")
  const [loginAlert, setLoginAlert] = useState("")

  return (

    <div>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
      <Grid item xs={3}>
      <Stack

        sx={{
          width: '25ch',
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
      {loginAlert}
      <h1>Login</h1>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="standard"
          margin="normal"
          onChange = {e=>setUsername(e.target.value)}
          helperText = {usernameError}
          error={usernameError !== ""}
          required/>

        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          margin="normal"
          onChange = {e=>setPassword(e.target.value)}
          helperText = {pwError}
          error={pwError !== ""}
          required
        />
        <div id="login-signup">
          <p>Don't have an account?</p>
          <p className="navigate-to-signup"
            onClick={()=>navigate('/signup')}>
          <i>Signup here</i>
          </p>
        </div>

        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {onSubmit}
          >
            Login
          </Button>
        </Stack>
        </Grid>
        </Grid>

    </div>
  )
      }



