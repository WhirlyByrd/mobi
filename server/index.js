//backend uses require keyword
require('dotenv').config()
const express = require('express');
const cors = require('cors');

const {SERVER_PORT} = process.env

const app = express()

app.use(express.json())
app.use(cors())

app.listen(SERVER_PORT, console.log(`Listening to server port ${SERVER_PORT}`));