import React,  { useState }  from 'react'

import { TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Grid, Button, Alert, AlertTitle } from '@mui/material'

import axios from "axios"



export default function Signup() {
  const onSubmit = data => {
    console.log('form input', username,password)

    setUsernameError("")
    setPwError("")
    setSignupAlert("")

    switch(username){
      case "":
        setUsernameError('Please enter a username.')
        break;
      case username.length > 15:
        setUsernameError('Username is too long.')
        break;
      default:
    }
    switch(password){
      case "":
        setPwError('Please enter a password.')
        break;
      case username.length > 15:
        setUsernameError('Password is too long.')
        break;
      default:
    }
    if (usernameError === "" && pwError === ""){

      // axios.post('http://localhost:3001/signup', {username, password}).then(resp=>{
      //   console.log('axios resp', resp)

      // }).catch(err=>{
      //   console.log(err)
      // })

      //for now do localstorage
      if (localStorage.getItem(username)){
        setSignupAlert(
          <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  Username already exists!
</Alert>
        )
      } else {
        let userObj = {password, chats: {}}
        localStorage.setItem(username, JSON.stringify(userObj))
        setSignupAlert(<Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Signup succesfull!
      </Alert>)
      }
    }
  };
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [pwError, setPwError] = useState("")
  const [signupAlert, setSignupAlert] = useState("")


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
      {signupAlert}
      <h1>Signup</h1>
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
        <div id="signup-login">
          <p>Already have an account? Login here</p>
        </div>



        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {onSubmit}
          >
            Sign Up
          </Button>
        </Stack>
        </Grid>
        </Grid>
    </div>


  )
}