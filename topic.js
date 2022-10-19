const {Kafka} =  require("kafkajs");
createTopic()

async function createTopic(){    
    const kafka = new Kafka({
        clientId : "kafka_ornek_1",
        brokers : ["192.169.0.14:9092"]
    });
    
    const admin = kafka.admin();
    console.log("Kafka broker a bağlanılıyor...");
    await admin.connect();
    console.log("Kafka broker'a bağlantı başarılı topic üretilecek..")

    await admin.createTopics({
       topics : [
           {
               topic: "Logs",
               numPartitions:1
           },
           {
            topic: "Logs2",
            numPartitions:2
        }
       ] 
    });
    console.log("Topic Başarılı bir şekilde oluşturuldu.. ");
    await admin.disconnect();
}