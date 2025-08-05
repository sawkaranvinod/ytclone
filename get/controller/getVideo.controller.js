import { replyHandler200, replyHandler500} from "../helper/reply.helper.js";
import { Video } from "../schema/video.model.js";

export async function getVideo(req, reply) {
    try {
        const { videoId } = req.body;

        const video = await Video.findById(videoId);

        return replyHandler200(reply, "Successfully retrieved video", { video });
    } catch (error) {
        console.log("Error in getVideo controller:", error.message);
        return replyHandler500(reply);
    }
}
