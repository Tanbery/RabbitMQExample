const amqp = require("amqplib")

const message = {
    description: "Message is "
}

connect_rabbitmq()

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = connection.createChannel();
        (await channel).assertQueue("jobsQueue")
    
        setInterval(async () =>{
            ;(await channel).sendToQueue("jobsQueue",Buffer.from(JSON.stringify(message) + new Date()));
        },100);
        
        console.log("Messagelar Gonderilmeye Basladi");
    } catch (error) {
        console.log("Error: ", error)
    }

}