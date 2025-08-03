import { Kafka } from "kafkajs";

export function getKafkaClient(clientId,brokers) {
    return new Kafka(
        {
            clientId:clientId,
            brokers:brokers
        }
    )
}