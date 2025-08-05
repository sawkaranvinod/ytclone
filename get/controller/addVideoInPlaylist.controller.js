import { Playlist } from "../schema/playlist.modle.js";
import { PlaylistVideo } from "../schema/playlistVideo.modle.js";
import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";

export async function handleAddVideoToPlaylist(req, reply) {
    try {
        const { playlistId, videoId } = req.body;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return replyHandler400(reply, "Playlist not found");
        }

        const alreadyExists = await PlaylistVideo.findOne({ playlistId, videoId });

        if (alreadyExists) {
            return replyHandler400(reply, "Video already exists in the playlist");
        }
        
        const newPlaylistVideo = new PlaylistVideo({ playlistId, videoId });
        const savedEntry = await newPlaylistVideo.save();

        return replyHandler200(reply, "Video added to playlist", savedEntry);
    } catch (error) {
        console.error("Error adding video to playlist:", error);
        return replyHandler500(reply);
    }
}
