import { replyHandler200, replyHandler500,replyHandler404} from "../helper/reply.helper.js";
import { Video } from "../schema/video.model.js";
import {dataCache} from "../config/redis.config.js";
export async function getVideo(req, reply) {
    try {
        const cache = dataCache.getCache();
        const { videoId } = req.body;
        let video = await cache.get(`video:${videoId}`);
        if (!videoId) {
            video = await Video.findById(videoId);
        }
        if (!video) {
            return replyHandler404(reply,"video not found");
        }
        return replyHandler200(reply, "Successfully retrieved video", { video });
    } catch (error) {
        console.log("Error in getVideo controller:", error.message);
        return replyHandler500(reply);
    }
}
