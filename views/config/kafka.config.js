import { Kafka } from "kafkajs";
import {envVariable} from "../grpcConfigClinet/env/variable.env.js"

export function getKafkaClient() {
    return new Kafka(
        {
            clientId:envVariable.clientId,
            brokers:envVariable.brokers
        }
    )
}