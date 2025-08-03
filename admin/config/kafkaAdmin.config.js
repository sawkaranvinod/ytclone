import {kafkaConfig} from "./kafka.config.js"

class KafkaAdmin {
    constructor(){
        this.admin = null;
    }
    getKafkaAdmin(){
        return this.admin;
    }

    async connectKafkaAdmin(){
        this.admin.connect();
    }
    async disconnectKafkaAdmin(){
        this.admin.disconnect();
    }

    setKafkaClient(clientId,brokers){
        this.admin = kafkaConfig(clientId,brokers).admin();
    }
    async listAllTopics(){
        const topics  = await this.admin.listTopics();
        console.log("topics");
        console.log(topics);
    }
}

export let kafkaAdmin = new KafkaAdmin();