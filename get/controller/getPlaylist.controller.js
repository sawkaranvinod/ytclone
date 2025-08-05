import { replyHandler200, replyHandler500, replyHandler400 } from "../helper/reply.helper.js";
import { Playlist } from "../schema/playlist.modle.js";
import { PlaylistVideo } from "../schema/playlistVideo.modle.js";

export async function getPlaylist(req, reply) {
    try {
        const { playlistId } = req.body;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return replyHandler400(reply, "Playlist not found");
        }

        const videos = await PlaylistVideo.find({ playlistId }).populate("videoId");

        return replyHandler200(reply, "Successfully fetched playlist", {
            playlist,
            videos: videos.map(v => v.videoId),
        });
        
    } catch (error) {
        console.error("Error in getPlaylist controller:", error.message);
        return replyHandler500(reply);
    }
}
