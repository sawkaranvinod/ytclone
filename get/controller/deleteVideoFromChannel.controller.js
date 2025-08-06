import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import { Video } from "../schema/video.model.js";
import {dataCache} from "../config/redis.config.js";

export async function deleteVideoByChannelOwner(req, reply) {
    try {
        const cache = dataCache.getCache();
        const { videoId } = req.body;
        const video = await Video.findById(videoId);

        if (!video) {
            return replyHandler400(reply, "Video not found");
        };
        await cache.del(`video:${videoId}`);
        await Video.findByIdAndDelete(videoId);
        return replyHandler200(reply, "Video deleted successfully");
    } catch (error) {
        console.error("Error in deleteVideoByChannelOwner:", error.message);
        return replyHandler500(reply);
    }
}
