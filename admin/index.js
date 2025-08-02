import { Kafka } from "kafkajs";

const client = new Kafka({
    clientId : "my-app",
    brokers: ["localhost:19092"],
});

async function adminInit(){

    const admin = client.admin();
    await admin.connect()

    await admin.createTopics({
        topics: [
            {
                topic: "views",
                numPartitions: 3
            },{
                topic: "reactions",
                numPartitions: 3
            },{
                topic: "subscribes",
                numPartitions: 3
            }
        ]
    })

    await admin.disconnect();
}
adminInit();