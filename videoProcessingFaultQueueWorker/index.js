import {injectEnvVariables} from "./grpcConfigClinet/env/inject.js";
import {envVariable} from "./grpcConfigClinet/env/variable.env.js";
import {dataCache} from "./config/redis.config.js";
import {consumeMessageFromQueue} from "./main.js";
;(async () => {
    try {
        await injectEnvVariables();
        dataCache.connectRedis(envVariable.redisConfig());
        await consumeMessageFromQueue();
    } catch (error) {
        console.log("error in the main index file of the video processing fault quqeue worker",error.message);
        process.exit(-1);
    }
})();