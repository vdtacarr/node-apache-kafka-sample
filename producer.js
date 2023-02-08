const {Kafka} =  require("kafkajs");
const log_data = require("./logs.json")

const topic_name = process.argv[2] || "Logs2";   
const partition = process.argv[3] || 0;
createProducer()

async function createProducer(){    
    const kafka = new Kafka({
        clientId : "kafka_queue",
        brokers : ["127.0.0.1:9092"]
    });
    const producer = kafka.producer();
    console.log("Producer'a bağlanılıyor...");
    await producer.connect();
    console.log("Producer'a bağlanildı.")
    
    const messages = log_data.map((item)  => {
        return {
            value:JSON.stringify(item),
            partition: item.type === "system" ? 0 : 1
        }
    })
    const message_result = await producer.send({
        topic:topic_name,
        messages : messages
    });
    console.log("Gönderim başarılı.",JSON.stringify(message_result));
    await producer.disconnect();
}