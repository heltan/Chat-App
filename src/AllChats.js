import * as React from 'react';
import {useEffect, useState }  from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';
import { TextField, Alert, AlertTitle } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SingleChat from './SingleChat'

export default function AllChats(props){

  // const [sortedUserChats, setSortedUserChats] = useState("")
  const [chatMessages, setChatMessages] = useState("")

  const [singleChatData, setSingleChatData] = useState(false)

  useEffect(()=>{



    setChatMessages(getCurrentUserChats())

  }, [props])

  const getCurrentUserChats = () => {
    const sortUserChatsByDate = (chats) => {
      let sortedChats = []
      for (let x in chats){
        sortedChats.push({user:x,chats: chats[x]})
      }
      return sortedChats.sort((a,b)=>{
        return new Date(b.chats[0].date) - new Date(a.chats[0].date)
      })
    }

    let currentUser = localStorage.getItem('currentLoggedInUser')
    let usersChats = JSON.parse(localStorage.getItem(currentUser)).chats
    let sortedUserChats = (sortUserChatsByDate(usersChats))
    let chatsArr = []
    let date;

    sortedUserChats.forEach((item, iter)=>{
      let unparsedDate = item.chats[0].date;
      date = new Date(unparsedDate).toLocaleDateString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).toString().replace(/\b0/g, '')

      chatsArr.push(
        <Grid container
          spacing={2} p={1}
          sx={{minWidth: '250px'}}
          className="all-chats-msg-container"
          onClick={
            ()=> {setSingleChatData(item)
            }
          }
          key={item.user}
          >

            <Grid item xs={3} md={3} lg={3}
            className="all-chats-avatar"
            >
              <Avatar>{item.user.substring(0,3)}</Avatar>
            </Grid>

            <Grid item xs={7}
                  className="all-chats-user-date"
                  >
                <h4 className="all-chats-user-date-username">{item.user}</h4>
                <p>{date}</p>
            </Grid>



              <Grid item xs={6} className="all-chats-msg-txt">
                {item.chats[item.chats.length-1].sender === currentUser?
                <p>You: {item.chats[item.chats.length-1].message.substring(0,24)}...</p>
              : <p>{item.chats[item.chats.length-1].message.substring(0,24)}...</p> }

              </Grid>
            </Grid>
      )



    })
    return chatsArr

  }



    return(
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{
          height: '100%',
          p:2,
          minWidth:'300px' }}
        >

          {singleChatData?
          <div className="all-chats-header-back-btn">
            <div className="all-chats-arrow-back">
              <ArrowBackIcon
                onClick={()=>setSingleChatData(false)}
              />

            </div>
            <h3 className="all-chats-header">All Chats</h3>
          </div>

          :
          <div className="all-chats-header-back-btn">
             <div className="all-chats-arrow-back"/>
             <h3 className="all-chats-header">All Chats</h3>
            </div>

            }

          {singleChatData? <SingleChat props={singleChatData}/>:
          chatMessages}





          </Box>

      </Container>
    </React.Fragment>
    )




}