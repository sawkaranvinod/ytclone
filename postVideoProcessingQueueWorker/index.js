import {dataCache} from "./config/redis.config.js";
import {injectEnvVariables} from "./grpcConfigClinet/env/inject.js";
import {envVariable} from "./grpcConfigClinet/env/variable.env.js";

;(async () => {
    try {
        await injectEnvVariables();
        dataCache.connectRedis(envVariable.redisConfig);
    } catch (error) {
        console.log("error in the main index function of the post video processing",error.message);
        process.exit(-1);
    }
})