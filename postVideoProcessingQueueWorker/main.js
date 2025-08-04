import {envVariable} from "./grpcConfigClinet/env/variable.env.js";
import {dataCache} from "./config/redis.config.js";
export function consumeMessageQueue() {
    try {
        const cache = dataCache.getCache();
        while (true) {
            const key = cache.rpop(`${envVariable.postVideoProcessingQueue}`);
            if (!key) {
                console.log("no message recived");
                continue;
            };
            
        }
    } catch (error) {
        console.log("error in the main function which consume message from post video processing queue",error.message);
        process.exit(-1);
    }
}