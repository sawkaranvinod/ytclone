import { envVariable } from "./grpcConfigClinet/env/variable.env.js";
import { dataCache } from "./config/redis.config.js";
import { addData } from "./meiliSearch/addDocument.meiliSearch.js";
import { Video } from "./schema/video.model.js";
export async function consumeMessageQueue() {
    try {
        const cache = dataCache.getCache();
        console.log("ere")
        while (true) {
            const key = await cache.rpop(`${envVariable.postVideoProcessingQueue}`);
            if (!key) {
                continue;
            };
            let data = await cache.get(`processingVideo:${key}`);
            if (!data) {
                console.log("no message recived");
                continue;
            };
            data = JSON.parse(data);
            const video = await Video.create(
                {
                    channelId: data.channelId,
                    videoUrl: key,
                    description: data.description,
                    title: data.title,
                    categroy: data.category,
                    region: data.region,
                }
            );
            const add = await addData("video", [data]);
            if (!data) {
                await addData("video", data);
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
        }
    } catch (error) {
        console.log("error in the main function which consume message from post video processing queue", error.message);
        process.exit(-1);
    }
}