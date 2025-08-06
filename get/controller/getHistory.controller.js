import { replyHandler200, replyHandler500, replyHandler400 } from "../helper/reply.helper.js";
import { View } from "../schema/view.model.js";

export async function getHistory(req, reply) {
    try {
        const { userId } = req.body;
        const historyVideos = await View.find({ userId }).populate("videoId");
        return replyHandler200(reply, "Successfully fetched history", {
            history: historyVideos.map(v => v.videoId),
        });
    } catch (error) {
        console.log("Error in getHistory controller:", error.message);
        return replyHandler500(reply);
    }
}
