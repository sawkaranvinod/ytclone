import Fastify from "fastify";
import {masterRoute} from "./routes/master.route.js";
import { kafkaProducer } from "./config/kafkaProducer.config.js";
import { injectEnvVariables } from "./grpcConfigClinet/env/inject.js";
import { envVariable } from "./grpcConfigClinet/env/variable.env.js";

const fastify = Fastify();

const PORT = process.env.PORT || 3000;

fastify.register(masterRoute,{prefix:"/api/v1"});

;(async () => {
    try {
        await injectEnvVariables();
        kafkaProducer.setKafkaProducer(envVariable.clientId,envVariable.brokers);
        fastify.listen({port:PORT},(err,address) => {
            if (err) {
                fastify.log.error(err);
                process.exit(1);
            };
            kafkaProducer.connect();
            console.log(`server listening on ${address}`);
        })
    } catch (error) {
        console.log(error.message)
        kafkaProducer.disconnect();
    }
})()

