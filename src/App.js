import logo from './logo.svg';
import './App.css';
import AccountMenu from './AccountMenu'
import NewChat from './NewChat'
import AllChats from './AllChats'

import Container from '@material-ui/core/Container';
import Grid from '@mui/material/Grid';
import {useEffect} from 'react'

function App() {



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
      >

        <Grid item xs={3}>
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
            <AllChats/>
          </Grid>

          <Grid item xs={12} md={6}>
            <NewChat/>
          </Grid>
        </Grid>


      </div>


    </div>
  );
}

export default App;
