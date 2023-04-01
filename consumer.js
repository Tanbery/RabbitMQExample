const amqp = require("amqplib");
const { closeMessage } = require("amqplib/lib/format");



connect_rabbitmq()

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = connection.createChannel();
        (await channel).assertQueue("jobsQueue");
        (await channel).consume("jobsQueue", async msg =>{
            console.log("Message:", msg.content.toString());
            (await channel).ack(msg);
        });
        
    } catch (error) {
        console.log("Error: ", error)
    }

}