import { Kafka } from "kafkajs";

export function kafkaConfig(clientId,brokers) {
    return new Kafka({
        clientId: clientId,
        brokers: brokers
    });
};