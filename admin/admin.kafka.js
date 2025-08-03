import { kafkaAdmin } from "./config/kafkaAdmin.config.js";

export async function createTopic() {
    try {
        const admin = kafkaAdmin.getKafkaAdmin();
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
    } catch (error) {
        console.log(error.message);
        await kafkaAdmin.disconnectKafkaAdmin();
    }
}