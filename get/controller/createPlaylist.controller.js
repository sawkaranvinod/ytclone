import { Playlist } from "../schema/playlist.modle.js";
import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import {dataCache} from "../config/redis.config.js";
export async function handleCreatePlaylist(req, reply) {
    try {
        const cache = dataCache.getCache();
        const { userId, playlistName,visiblity ,channelId} = req.body;

        let existingPlaylist = await Playlist.findOne({ userId, playlistName });
        existingPlaylist = await Playlist.findOne({channelId,playlistName});


        if (existingPlaylist) {
            return replyHandler400(reply, "Playlist with the same name already exists for this account");
        }
        
        const newPlaylist = new Playlist({ userId, playlistName,channelId});
        const saved = await newPlaylist.save();
        if (visiblity === "public") {
            await cache.set(`playlist:${saved._id.toString()}`,JSON.stringify(saved));
        };
        return replyHandler200(reply, "Playlist created successfully", saved);
    } catch (error) {
        console.error("Error creating playlist:", error);
        return replyHandler500(reply);
    }
}
