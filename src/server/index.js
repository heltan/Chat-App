const express = require('express')
const path = require("path");
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home page')
})

app.post('/signup', (req, res) => {
  console.log('req', req.body)
  //check if item in localstorage
  if (localStorage.getItem(req.body.username)){
    res.send('User already exists')
  } else {
    localStorage.setItem(req.body.username, req.body.password)
  }
  res.send(200)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})