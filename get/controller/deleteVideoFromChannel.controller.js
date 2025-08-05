import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import { Video } from "../schema/video.model.js";
import { Channel } from "../schema/channel.modle.js";

export async function deleteVideoByChannelOwner(req, reply) {
    try {
        const { userId, videoId } = req.body;
        const video = await Video.findById(videoId);

        if (!video) {
            return replyHandler400(reply, "Video not found");
        }

        const channel = await Channel.findOne({ _id: video.channelId, userId });

        if (!channel) {
            return replyHandler400(reply, "Unauthorized: You do not own this video");
        }

        await Video.findByIdAndDelete(videoId);
        return replyHandler200(reply, "Video deleted successfully");
    } catch (error) {
        console.error("Error in deleteVideoByChannelOwner:", error.message);
        return replyHandler500(reply);
    }
}
