import { getKafkaClient } from "./kafka.config.js";

class KafkaProdcuer{
    constructor(){
        this.producer = null;
    }

    getKafkaProducer(){
        return this.producer;
    }

    setKafkaProducer(clientId,brokers){
        this.producer = getKafkaClient(clientId,brokers).producer();
    }
    async connect(){
        await this.producer.connect();
    }

    async disconnect(){
        this.producer.disconnect();
    }
}

export let kafkaProducer = new KafkaProdcuer();