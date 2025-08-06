import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import { PlaylistVideo } from "../schema/playlistVideo.modle.js";
import {dataCache} from "../config/redis.config.js";
import {Playlist} from "../schema/playlist.modle.js";

export async function deleteVideoFromPlaylist(req, reply) {
    try {
        const cache = dataCache.getCache();
        const { playlistId, videoId } = req.body;
        const playlist = await Playlist.findOneById(playlistId);
        if (Object.keys(playlist)===0) {
            return replyHandler400(reply,"playlist not found");
        };
        if (playlist.visiblity === "public") {
            let data = await cache.get(`playlist:${playlistId}`);
            if (data) {
                data = JSON.parse(data);
                const videos = data.videos.filtre((x)=>(x!==videoId));
                let playlist = data;
                playlist.videos = videos;
                await cache.set(`playlist:${playlistId}`,JSON.stringify(playlist));
            };
        };
        
        const deleted = await PlaylistVideo.findOneAndDelete({ playlistId, videoId });

        if (!deleted) {
            return replyHandler400(reply, "Video not found in the playlist");
        };
        return replyHandler200(reply, "Video removed from playlist successfully", { deleted });
    } catch (error) {
        console.log("Error in deleteVideoFromPlaylist:", error.message);
        return replyHandler500(reply);
    }
}
