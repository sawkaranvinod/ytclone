import {dataCache} from "./config/redis.config.js";
import {injectEnvVariables} from "./grpcConfigClinet/env/inject.js";
import {envVariable} from "./grpcConfigClinet/env/variable.env.js";
import {connectDB} from "./database/mongodb.connect.js";
import {consumeMessageQueue} from "./main.js"
;(async () => {
    try {
        await injectEnvVariables();
        await connectDB(envVariable.uri)
        dataCache.connectRedis(envVariable.redisConfig);
        await consumeMessageQueue()
    } catch (error) {
        console.log("error in the main index function of the post video processing",error.message);
        process.exit(-1);
    }
})()