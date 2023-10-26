const express = require('express');
require('dotenv').config();

const Producer = require('./producer')

const ProducerService = Producer();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

const PORT = process.env.PORT || 3000;

app.post('/addLog', async (req, res)=> {

    const {routingKey, message} = req.body;

    try {
        const response = await ProducerService.publishMessage(routingKey, message);
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

app.listen(PORT, ()=> console.log(`Server is runnning on PORT : ${PORT}`))