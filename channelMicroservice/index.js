import Fastify from "fastify";
import {masterRoute} from "./routes/master.route.js";
import {injectEnvVariables} from "./grpcConfigClinet/env/inject.js";
import {config} from "dotenv";
config();

const fastify = Fastify();


fastify.register(masterRoute,{prefix:"/api/v1"});

const port = process.env.FASTIFY_CHANNEL_MICROSERVICE || 5010;

;(async () => {
    try {
        await injectEnvVariables();
        fastify.listen(
            {port:port},
            (err,address)=>{
                if (err) {
                    console.log("error in listening the fastify",err.message);
                    process.exit(-1);
                };
                console.log(`fastify server is running on ${address} and localhost:${port}`);
            },
        )
    } catch (error) {
        console.log("error in the main function of the channel microservice",error.message);
        process.exit(-1);
    }
})();