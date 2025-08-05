import { injectEnvVariables } from "./grpcConfigClinet/env/inject.js";
import { processMessageFromSqs } from "./main.js";
import {dataCache} from "./config/redis.config.js";
import {envVariable} from "./grpcConfigClinet/env/variable.env.js";
;(async () => {
    await injectEnvVariables();
    dataCache.connectRedis(envVariable.redisConfig);
    await processMessageFromSqs();
})();