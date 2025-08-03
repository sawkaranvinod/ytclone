import { envVariable } from "./grpcConfigClinet/env/variable.env.js";
import { dataCache } from "./config/redis.config.js";
import {runDockerContainer} from "./container/run.container.js";
export async function consumeMessageFromQueue() {
    try {
        const cache = dataCache.getCache();
        while (true) {
            try {
                const key = await cache.rpop(`${envVariable.videoProcessingFaultQueue}`);
                if (!key) {
                    console.log("no message recived");
                    continue;
                }
                const variable = [`AWS_ACCESS_KEY_ID=${envVariable.accessKeyId}`, `AWS_SECRET_ACCESS_KEY=${envVariable.secretAccessKey}`, `KEY=${key}`, `AWS_TEMP_BUCKET_NAME=${envVariable.tempBucketName}`, `AWS_PRODUCTION_BUCKET_NAME=${envVariable.productionBucketName}`];
                const imageName = `videoprocessing:latest`;
                const containerName = key;
                await runDockerContainer(variable, imageName, containerName);

            } catch (error) {
                console.log("error in the infinite loop video processing fault queue worker", error.message);
            }
        }
    } catch (error) {
        console.log("error in the main function of the consume message from queue video processing fault queue worker", error.message);
        process.env(-1);
    }
}