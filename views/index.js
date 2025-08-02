import Fastify from "fastify";
import {masterRoute} from "./routes/master.route.js";
import { kafkaProducer } from "./controllers/config/kafkaProducer.config.js";

const fastify = Fastify();

const PORT = process.env.PORT || 3000;

fastify.register(masterRoute,{prefix:"/api/v1"});

;(async () => {
    try {
        fastify.listen({PORT},(err,address) => {
            if (err) {
                fastify.log.error(err);
                process.exit(1);
            };
            kafkaProducer.connect();
            console.log(`server listening on ${address}`);
        })
    } catch (error) {
        console.log(error.message)
    }
})()

