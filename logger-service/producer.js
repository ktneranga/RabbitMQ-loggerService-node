const amqp = require('amqplib');
const {rabbitMQ} = require('./config')

//1. Connect to the rabbitmq server
//2. Create a new channel on that connection
//3. create the exchange
//4. Publish the message to exchange with a routing key


class Producer {
    //this is called instance property, when create an instance of this class, it is undefined
    channel;

    //create the channel
    createChannel = async () => {
        const connection = await amqp.connect('amqp://127.0.0.1');
        this.channel = await connection.createChannel();
    }

    publishMessage = async (routingKey, message) => {
        if(!this.channel){
            await this.createChannel();
        }

        const exchangeName = rabbitMQ.exchangeName

        //create the exchange
        await this.channel.assertExchange(exchangeName, 'direct');

        //publish the message

        const logDetails = {
            logType: routingKey,
            message: message,
            date: new Date()
        }

        const resp = await this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(logDetails)))

        console.log(`The message ${message} has been sent to exchane ${exchangeName}`)

        return resp;

    }

}

module.exports = Wrapper = () => {
    return new Producer();
};