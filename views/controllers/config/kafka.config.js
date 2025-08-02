import { Kafka } from "kafkajs";

export const client = new Kafka({
    clientId : "my-app",
    brokers: ["localhost:19092"],
});