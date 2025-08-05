import {dataCache} from "./config/redis.config.js";
import {injectEnvVariables} from "./grpcConfigClinet/env/inject.js";
import {envVariable} from "./grpcConfigClinet/env/variable.env.js";
import {connectDB} from "./database/mongodb.connect.js";
import {consumeMessageQueue} from "./main.js";
import {connectMeiliSearch} from "./database/meiliSearch.connect.js";
;(async () => {
    try {
        await injectEnvVariables();
        await connectDB(envVariable.uri)
        await connectMeiliSearch(envVariable.meiliSearchHost,envVariable.meiliSearchApiKey);
        dataCache.connectRedis(envVariable.redisConfig);
        await consumeMessageQueue()
    } catch (error) {
        console.log("error in the main index function of the post video processing",error.message);
        process.exit(-1);
    }
})()