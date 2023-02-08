const {Kafka} =  require("kafkajs");
createTopic()

async function createTopic(){ 
    try{
        const kafka = new Kafka({
            clientId : "kafka_queue",
            brokers : ["127.0.0.1:9092"]
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
    catch(ex){
        console.log("Bir hata oluştu", ex);
    }
    finally{
        process.exit(0)
    }
}