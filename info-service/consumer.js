const amqp = require('amqplib');
const config = require('./config');

//1. connect to the rabbitmq server
//2. create a new channel
//3. create the exchange
//4. create the queue
//5. bind the queue to the exchange
//6. consume messages from the queue

const consumeMessage = async() => {
    let connection;
   try {
    connection = await amqp.connect(config.rabbitMQ.url);
    const channel = await connection.createChannel();

    //create the exchange
    await channel.assertExchange(config.rabbitMQ.exchangeName, 'direct');

    //create the queue
    const q = await channel.assertQueue(config.rabbitMQ.queueName);

    //bind the queue to the exchange
    //infoQueue bound to the logExchnge with the bind key => info
    await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, 'info');

    //consume message from the queue
    channel.consume(config.rabbitMQ.queueName, (msg)=> {
        const data = JSON.parse(msg.content);
        console.log(data);
        channel.ack(msg);
    })

   } catch (error) {
    console.log(error)
   }
}

module.exports = consumeMessage;