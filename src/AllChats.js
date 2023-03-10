import * as React from 'react';
import {useEffect, useState }  from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';
import { TextField, Alert, AlertTitle } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';

import SingleChat from './SingleChat'

export default function AllChats(){

  // const [sortedUserChats, setSortedUserChats] = useState("")
  const [chatMessages, setChatMessages] = useState("")

  const [singleChatData, setSingleChatData] = useState("")

  useEffect(()=>{
    getCurrentUserChats()
  }, [])

  const getCurrentUserChats = () => {
    let currentUser = localStorage.getItem('currentLoggedInUser')
    let usersChats = JSON.parse(localStorage.getItem(currentUser)).chats
    let sortedUserChats = (sortUserChatsByDate(usersChats))
    let chatsArr = []
    sortedUserChats.forEach((item, iter)=>{

      chatsArr.push(
        <Grid container spacing={0} p={1}

          alignItems="center"
          justifyContent="left"
          sx={{minWidth: '250px'}}
          className="all-chats-msg-container"
          onClick={
            setSingleChatData(item)
          }
          >
          <Grid item xs={3} md={3} lg={3}
            className="all-chats-avatar"

            >
            <Avatar>{item.user.substring(0,3)}</Avatar>
          </Grid>

          <Grid item xs={8} className="all-chats-msg-txt">
            <p>{item.chats[0].message.substring(0,24)}...</p>
          </Grid>

        </Grid>
      )
      setChatMessages(chatsArr)
    })


  }

  const sortUserChatsByDate = (chats) => {
    let sortedChats = []
    for (let x in chats){
      sortedChats.push({user:x,chats: chats[x]})
    }
    return sortedChats.sort((a,b)=>{
      return new Date(b.chats[0].date) - new Date(a.chats[0].date)
    })
  }


    return(
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{

          height: '100%',
          p:2,
          width:'40vw' }}
        >

        <h3>All Chats</h3>


          {singleChatData? <SingleChat props={singleChatData}/>:
          chatMessages}





          </Box>

      </Container>
    </React.Fragment>
    )




}