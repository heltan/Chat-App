import logo from './logo.svg';
import './App.css';
import AccountMenu from './AccountMenu'
import NewChat from './NewChat'
import AllChats from './AllChats'

import Container from '@material-ui/core/Container';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from 'react'

function App() {

const [updateChat, setUpdateChat] = useState(false)



  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="right"
        justifyContent="flex-end"
        style={{ minHeight: '10vh' }}
        sx={{ m: 2 }}
        className="app"
      >

        <Grid item xs={3}
        className="account-menu">
          <AccountMenu/>
        </Grid>
      </Grid>

      <div className='chats-utility'>
        {/* here goes our newchat and allchats */}
        <Grid
        container
        spacing={2}
        >

          <Grid item xs={12} md={6}>
            <AllChats updateChat={updateChat}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <NewChat setUpdateChat={setUpdateChat}/>
          </Grid>
        </Grid>


      </div>


    </div>
  );
}

export default App;
