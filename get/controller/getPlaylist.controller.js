import { replyHandler200, replyHandler500, replyHandler400 } from "../helper/reply.helper.js";
import { Playlist } from "../schema/playlist.modle.js";
import {dataCache} from "../config/redis.config.js";

export async function getPlaylist(req, reply) {
    try {
        const cache = dataCache.getCache();
        const { playlistId } = req.body;
        let playlist = await cache.get(`playlist:${playlistId}`);
        if (!playlist) {
            playlist = await Playlist.aggregate(
                [
                    {
                        $match:{
                            _id:playlistId,
                        }
                    },
                    {
                        $lookup:{
                            from:"playlistvideos",
                            localfield:"_id",
                            foreignfield:"playlistId",
                            as:"videos"
                        }
                    }
                ]
            );
        };
        if (!playlist) {
            return replyHandler400(reply, "Playlist not found");
        };
        playlist = JSON.parse(playlist);
        const videos = await cache.mGet(playlist.videos);
        playlist.videos = videos;
        return replyHandler200(reply, "Successfully fetched playlist", {playlist});
    } catch (error) {
        console.error("Error in getPlaylist controller:", error.message);
        return replyHandler500(reply);
    }
}
