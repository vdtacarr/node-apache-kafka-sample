const {Kafka} =  require("kafkajs");
const topic_name = process.argv[2] || "Logs2";   
const partition = process.argv[3] || 0;
createProducer()

async function createProducer(){    
    const kafka = new Kafka({
        clientId : "kafka_ornek_1",
        brokers : ["192.169.0.14:9092"]
    });
    
    const producer = kafka.producer();
    console.log("Producer'a bağlanılıyor...");
    await producer.connect();
    console.log("Producer'a bağlanildı.")
    
    const message_result = await producer.send({
        topic:topic_name,
        messages : [
            {
                value : "Bu bir test log mesajıdır.",
                partition :partition
            }
        ]
    });
    console.log("Gönderim başarılı.",JSON.stringify(message_result));
    await producer.disconnect();
}