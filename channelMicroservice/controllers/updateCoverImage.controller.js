import {dataCache} from "../config/redis.config.js"
import { replyHandler400 } from "../helper/reply.helper.js";
import { Channel } from "../schema/channel.modle.js";
export async function handleUpdateCoverImage(req,reply){

    const {fileName,ChannelId} = req.body;
    const cache = dataCache.getCache();
    const cacheKey = `Channel:${ChannelId}`;
    const oldVideoDataFromCache = await cache.get(cacheKey);
    let letOldVideoDataFromDb = null;

    if(!oldVideoDataFromCache){
        letOldVideoDataFromDb = await Channel.findById();
        if(!letOldVideoDataFromDb){
            return replyHandler400(reply,"Video not found");
        }
    }

}