const {Kafka} =  require("kafkajs");
const topic_name = process.argv[2] || "Logs2";   
createConsumer()

async function createConsumer(){    
    const kafka = new Kafka({
        clientId : "kafka_ornek_1",
        brokers : ["192.169.0.14:9092"]
    });
    
    const consumer = kafka.consumer({
        groupId : "ornek_1_cg_1"
    });
    console.log("Consumer'a bağlanılıyor...");
    await consumer.connect();
    console.log("Bağlantı başarılı.")
    await consumer.subscribe({
        topic : topic_name,
        fromBeginning : true
    })
    await consumer.run({
        eachMessage: async result =>{
            console.log(`Gelen mesaj ${result.message.value}`);
        }
    })
}