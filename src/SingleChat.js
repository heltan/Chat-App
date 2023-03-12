import * as React from 'react';
import {useEffect, useState }  from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';
import { TextField, Alert, AlertTitle } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';



export default function SingleChat(props){
  const [chats, setChats] = useState([])
  useEffect(()=>{

    renderChats(props.props)

  },[props.props])

  const renderChats = (chats) => {

    let chatsArr = [];
    let date;

    chats.chats.forEach((item,iter)=>{

      date = new Date(item.date).toLocaleDateString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).toString().replace(/\b0/g, '')

      chatsArr.push(
        <Grid container
            spacing={2} p={1}
            sx={{minWidth: '250px'}}
            className="all-chats-msg-container"
            key={item.sender+item.date}
            >

              <Grid item xs={3} md={3} lg={3}
              className="all-chats-avatar"
              >
                <Avatar>{item.sender.substring(0,3)}</Avatar>
              </Grid>

              <Grid item xs={7}
                    className="all-chats-user-date"
                    >
                  <h4 className="all-chats-user-date-username">{item.sender}</h4>
                  <p>{date}</p>
              </Grid>

                <Grid item xs={6} className="all-chats-msg-txt">
                  <p>{item.message}</p>

                </Grid>
              </Grid>
      )

    })

    setChats(chatsArr)
  }

    return(
      <div style={{ height: '500px', overflow: 'scroll' }}
      >
        {chats}
      </div>

    )
}