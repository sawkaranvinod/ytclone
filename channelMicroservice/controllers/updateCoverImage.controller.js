import { replyHandler200, replyHandler400 } from "../helper/reply.helper.js";
import { Channel } from "../schema/channel.modle.js";
import {createHmac} from "../helper/createHmac.helper.js"
import {dataCache} from "../config/redis.config.js";

export async function handleUpdateCoverImage(req,reply){

    const cache = dataCache.getCache();
    let {fileName,ChannelId,userId,deviceFingerprint} = req.body;
    const cacheKey = `channel:${ChannelId}`;

    const random = createHmac("key",deviceFingerprint); //key configManger sai lana hai
    fileName = `${userId}:${random}:${encodeURIComponent(fileName)}`;

    const oldChannelDataFromCache = await cache.get(cacheKey);
    const oldChannelDataFromDB = null;

    if(!oldChannelDataFromCache){
        oldChannelDataFromDB = await Channel.findById({ChannelId});
        if(!oldChannelDataFromDB){
            return replyHandler400(reply,"channel not found");
        }
    }

    const updateCoverImageUrl = await Channel.findByIdAndUpdate(
        ChannelId,
        {$set:{coverImage:fileName}},
        {new:true}
    );

    if(oldChannelDataFromCache){
        const oldData = JSON.parse(oldChannelDataFromCache);
        await cache.set(
            cacheKey,
            JSON.stringify({
                ...oldData,
                coverImage:updateCoverImageUrl.coverImage,
            })
        );
    }

    const subscriberDocs = await Channel.find({ChannelId}).toArray();
    const totalSubscriber = subscriberDocs.length;

    const finalData = {
        ...updateCoverImageUrl,
        totalSubscriber:totalSubscriber,
    }

    await cache.set(cacheKey,JSON.stringify(finalData));
    return replyHandler200(reply,"success" ,{data : finalData});
}