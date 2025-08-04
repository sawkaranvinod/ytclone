import { envVariable } from "./grpcConfigClinet/env/variable.env.js";
import { dataCache } from "./config/redis.config.js";
import {runContainer} from "./container/run.container.js";
export async function consumeMessageFromQueue() {
    try {
        const cache = dataCache.getCache();
        while (true) {
            const key = await cache.rpop(`${envVariable.videoProcessingFaultQueue}`);
            if (!key) {
                console.log("no message recived");
                continue;
            }
            try {
                const imageName = `videoprocessing:latest`;
                const container = runContainer(envVariable.accessKeyId,envVariable.secretAccessKey,envVariable.region,key,envVariable.tempBucketName,envVariable.productionBucketName,`${envVariable.port}`,'host.docker.internal',envVariable.username,envVariable.password,envVariable.videoProcessingFaultQueue,envVariable.postVideoProcessingQueue,imageName);
                container.unref();
            } catch (error) {
                await cache.lpush(envVariable.videoProcessingFaultQueue,key);
                console.log("error in the infinite loop video processing fault queue worker", error.message);
            }
        }
    } catch (error) {
        console.log("error in the main function of the consume message from queue video processing fault queue worker", error.message);
        process.env(-1);
    }
}