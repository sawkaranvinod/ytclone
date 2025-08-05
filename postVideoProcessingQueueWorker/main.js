import { envVariable } from "./grpcConfigClinet/env/variable.env.js";
import { dataCache } from "./config/redis.config.js";
import { addData } from "./meiliSearch/addDocument.meiliSearch.js";
import { Video } from "./schema/video.model.js";
export async function consumeMessageQueue() {
    try {
        const cache = dataCache.getCache();
        while (true) {
            const key = await cache.rpop(`${envVariable.postVideoProcessingQueue}`);
            try {
                if (!key) {
                    continue;
                };
                if (key) {
                    console.log(key);
                }
                let data = await cache.get(`processingVideo:${key}`);
                if (!data) {
                    console.log("no message recived");
                    continue;
                };
                data = JSON.parse(data);
                const video = await Video.create({
                    channelId: data.channelId,
                    videoUrl: `https://${envVariable.productionBucketName}.s3.${envVariable.region}.amazonaws.com/${encodeURIComponent(key)}/master.m3u8`,
                    description: data.description,
                    title: data.title,
                    category: data.category, // fix typo
                    region: data.region,
                });
                const videoObj = {
                    _id:video._id.toString(),
                    title:video.title,
                    videoUrl:video.videoUrl,
                    description:video.description,
                    channelId:video.channelId,
                    category:video.category,
                    region:video.region,
                    thumbmaiUrl:video.thumbnaiUrl,
                }; // convert to plain object
                const add = await addData("video",[videoObj],envVariable.meiliSearchHost,envVariable.meiliSearchApiKey);
                if (!add) {
                    await addData("video", [data]);
                };
                await cache.set(`video:${video._id}`, JSON.stringify({
                    channelId: data.channelId,
                    videoUrl: key,
                    description: data.description,
                    title: data.title,
                    categroy: data.category,
                    region: data.region,
                }));
    
                await cache.del(`processingVideo:${key}`);
            } catch (error) {
                console.log("error in the infinite loop of the while",error.message);
                await cache.lpush(`${envVariable.postVideoProcessingQueue}`,key);
            }
        }
    } catch (error) {
        console.log("error in the main function which consume message from post video processing queue", error.message);
        process.exit(-1);
    }
}