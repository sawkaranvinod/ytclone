import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import { PlaylistVideo } from "../schema/playlistVideo.modle.js";

export async function deleteVideoFromPlaylist(req, reply) {
    try {
        const { playlistId, videoId } = req.body;

        const deleted = await PlaylistVideo.findOneAndDelete({ playlistId, videoId });

        if (!deleted) {
            return replyHandler400(reply, "Video not found in the playlist");
        }

        return replyHandler200(reply, "Video removed from playlist successfully", { deleted });
    } catch (error) {
        console.log("Error in deleteVideoFromPlaylist:", error.message);
        return replyHandler500(reply);
    }
}
