import { Playlist } from "../schema/playlist.modle.js";
import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";

export async function handleCreatePlaylist(req, reply) {
    try {
        const { userId, playlistName } = req.body;

        const existingPlaylist = await Playlist.findOne({ userId, playlistName });

        if (existingPlaylist) {
            return replyHandler400(reply, "Playlist with the same name already exists for this user");
        }
        
        const newPlaylist = new Playlist({ userId, playlistName });
        const saved = await newPlaylist.save();

        return replyHandler200(reply, "Playlist created successfully", saved);
    } catch (error) {
        console.error("Error creating playlist:", error);
        return replyHandler500(reply);
    }
}
