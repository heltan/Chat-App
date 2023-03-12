import * as React from 'react';
import {useEffect, useState }  from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';
import { TextField, Alert, AlertTitle } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function NewChat(props){
  const [usernameError, setUsernameError] = useState("")
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [messageError, setMessageError] = useState("")
  const [newChatAlert, setNewChatAlert] = useState("")

  const handleSend = () => {
    setMessageError("")
    setUsernameError("")
    setNewChatAlert("")

    switch(username){
      case "":
        setUsernameError('Please enter a username.')
        break;
      default:
    }
    switch(message){
      case "":
        setMessageError('Please enter a message.')
        break;
      default:
    }
    if (username !== "" && message !== "") {
      //check user u want to send it to exists
      let userData = localStorage.getItem(username)
      if (!userData){
        setNewChatAlert(
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            User does not exist, please enter a valid user.
          </Alert>)
      } else {
        //save the chat to our localstorage in the userdata

        //if there is no chat to that user, creat a new chat array
        let currentUser = localStorage.getItem('currentLoggedInUser')
        let currentUserData = JSON.parse(localStorage.getItem(currentUser))

        let otherUser = localStorage.getItem(username)
        let otherUserData = JSON.parse(otherUser)

        let msgData = {message, date: new Date(), sender:currentUser}

        if (!currentUserData.chats[username]) {
          currentUserData.chats[username] = [msgData]
        } else {
          currentUserData.chats[username].push(msgData)
        }

        if (!otherUserData.chats[currentUser]){
          otherUserData.chats[currentUser] = [msgData]
        } else {
          otherUserData.chats[currentUser].push(msgData)
        }
        //add a latest chats

        localStorage.setItem(currentUser, JSON.stringify(currentUserData))
        localStorage.setItem(username, JSON.stringify(otherUserData))

        window.dispatchEvent(new Event('storage'))
        setNewChatAlert(
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Message sent.
          </Alert>
        )
        props.setUpdateChat(currentUser+msgData.date)


      }
    }
  }

  return(
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box sx={{
        bgcolor: '#cfe8fc',
        height: '100%',
        p:2,
         }}
      >
        {newChatAlert}
      <h3>New Chat</h3>
      <Grid container spacing={2} rowSpacing={1}  justify="flex-start">
        <Grid justifyContent="left" item xs={12}>
          <TextField
              id="outlined-basic"
              label="To:"
              variant="standard"
              margin="normal"
              onChange = {e=>setUsername(e.target.value)}
              helperText = {usernameError}
              error={usernameError !== ""}
              required/>
          </Grid>

          <Grid item xs={12} >
            <TextField
              id="outlined-basic"
              label="Message:"
              variant="outlined"
              onChange = {e=>setMessage(e.target.value)}
              helperText = {messageError}
              error={messageError !== ""}
              multiline />
          </Grid>

          <Grid item xs={12} m={2}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
          </Grid>
      </Grid>

        </Box>

    </Container>
  </React.Fragment>
  )
}