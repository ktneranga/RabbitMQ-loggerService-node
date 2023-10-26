const express = require('express');
require('dotenv').config();
const consumeMessage = require('./consumer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`)
    consumeMessage();
})