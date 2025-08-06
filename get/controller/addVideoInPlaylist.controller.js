import { Playlist } from "../schema/playlist.modle.js";
import { PlaylistVideo } from "../schema/playlistVideo.modle.js";
import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import {dataCache} from "../config/redis.config.js";

export async function handleAddVideoToPlaylist(req, reply) {
    try {
        const cache  = dataCache.getCache();
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

        const cacheData = await cache.get(`playlist:${playlistId}`);

        if (cacheData) {
            await cache.set(`playlist:${playlistId}`,JSON.stringify(
                {
                    playlistName:cacheData.playlistName,
                    videos:[...cacheData.videos,savedEntry._id.toString()],
                }
            ))
            
        };

        return replyHandler200(reply, "Video added to playlist", savedEntry);
    } catch (error) {
        console.error("Error adding video to playlist:", error);
        return replyHandler500(reply);
    }
}
