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
  const [chats, setChats] = useState("")

console.log('single chat data?', props.props)

useEffect(()=>{
  setChats(props)

},[])

const renderChats = () => {

}

    return(

        <p>show a single chat</p>

    )




}