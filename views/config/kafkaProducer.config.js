import { client } from "./kafka.config.js";

class KafkaProdcuer{
    constructor(){
        this.producer = client.producer();
    }

    getKafkaProducer(){
        return this.producer;
    }

    async connect(){
        await this.producer.connect();
    }
}

export const kafkaProducer = new KafkaProdcuer();