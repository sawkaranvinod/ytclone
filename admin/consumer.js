import {kafkaConfig} from "./config/kafka.config.js"
import {injectEnvVariables} from "./grpcConfigClinet/env/inject.js"
import {envVariable} from "./grpcConfigClinet/env/variable.env.js"

;(async () => {
    await injectEnvVariables();
    // console.log(envVariable);
    const client = kafkaConfig(envVariable.clientId,envVariable.brokers);
    const consumer = client.consumer({ groupId: 'test-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'views', fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            });
        },
    });
})()
