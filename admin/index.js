import { createTopic } from "./admin.kafka.js";
import { kafkaConfig } from "./config/kafka.config.js";
import { kafkaAdmin } from "./config/kafkaAdmin.config.js";
import {injectEnvVariables} from "./grpcConfigClinet/env/inject.js";
import {envVariable} from "./grpcConfigClinet/env/variable.env.js"

;(async () => {
    await injectEnvVariables();
    // console.log(envVariable);
    kafkaAdmin.setKafkaClient(envVariable.clientId,envVariable.brokers);
    await kafkaAdmin.connectKafkaAdmin();
    // await createTopic();
    await kafkaAdmin.listAllTopics();
    await kafkaAdmin.disconnectKafkaAdmin();
})()