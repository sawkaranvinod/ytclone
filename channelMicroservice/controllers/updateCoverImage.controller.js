import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import { Channel } from "../schema/channel.modle.js";
import {createHmac} from "../helper/createHmac.helper.js"
import {dataCache} from "../config/redis.config.js";
import { envVariable } from "../grpcConfigClinet/env/variable.env.js";
import {checkObjectInS3} from "../helper/checkObjectInS3.helper.js"
import { Video } from "../schema/video.model.js";
export async function handleUpdateCoverImage(req,reply){

    try {
        const cache = dataCache.getCache();
        let {userId,deviceFingerprint,channelId} = req.body;
        const key = envVariable.hmacKey;
        const devicehash = createHmac(key,deviceFingerprint);
        const imageCacheKey = `${userId}:${devicehash}`;
        const channelCacheKey = `channel:${channelId}`
    
        const url = await cache.get(imageCacheKey);
    
        if(!url){
            return replyHandler400(reply,"Invalid request or url not found");
        }
        const checkImage = await checkObjectInS3(envVariable.region,envVariable.accessKeyId,envVariable.secretAccessKey,envVariable.productionBucketName,url);
    
        if(!checkImage){
            return replyHandler400(reply,"invalid request or image not found");
        }
    
        const oldChannelDataFromCache = await cache.get(channelCacheKey);
        let oldChannelDataFromDB = null;
    
        if(!oldChannelDataFromCache){
            oldChannelDataFromDB = await Channel.findById({channelId});
            if(!oldChannelDataFromDB){
                return replyHandler400(reply,"channel not found");
            }
        }
    
        const updateCoverImageUrl = await Channel.findByIdAndUpdate(
            channelId,
            { $set :{coverImage:url}},
            {new:true}
        );
    
        if(oldChannelDataFromCache){
            const oldData = JSON.parse(oldChannelDataFromCache);
            await cache.set(
                channelCacheKey,
                JSON.stringify({
                    ...oldData,
                    coverImage:updateCoverImageUrl.coverImage,
                })
            );
        }
    
        const subscriberDocs = await Channel.find({ channelId }).toArray();
        const totalSubscriber = subscriberDocs.length;
    
        const videoIdFromChannel = await Video.aggregate([
            {
                $match : {
                    channelId: channelId
                },
            },
            {
                $sort : {
                    createdAt : -1
                }
            },
            {
                $project : {
                    _id: 1,
                }
            }
        ])
    
        const finalData = {
            ...updateCoverImageUrl,
            totalSubscriber:totalSubscriber,
            videoIdFromChannel : videoIdFromChannel
        }
    
        await cache.set(channelCacheKey,JSON.stringify(finalData));
        return replyHandler200(reply,"success" ,{data : finalData});
    } catch (error) {
        console.log("error at updateCoverImage controller js",error.messages);
        return replyHandler500(reply);
    }
}