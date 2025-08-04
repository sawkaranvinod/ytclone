import {replyHandler500,replyHandler200,replyHandler400} from "../helper/reply.helper.js";
import {getPreSignUrl} from "../helper/presignUrl.helper.js";
import { randomUUID } from "crypto";
import {envVariable} from "../grpcConfigClinet/env/variable.env.js";
import {dataCache} from "../config/redis.config.js";

export async function handleUploadVideo(req,reply) {
    try {
        const cache = dataCache.getCache();
        let {fileName,userId,contentType,duration,description,title,region,category} = req.body;
        const random = randomUUID().replaceAll("-","");
        fileName = encodeURIComponent(`${duration.replace(":","")}:${random}:${fileName}`);
        contentType = contentType.split("/");
        if (contentType.length !== 2 || contentType[0] !== "video") {
            return replyHandler400(reply,"unacceptable content type");
        };
        const url = await getPreSignUrl(fileName,contentType,envVariable.tempBucketName,envVariable.region,envVariable.accessKeyId,envVariable.secretAccessKey);
        if (!url) {
            return replyHandler500(reply);
        };
        await cache.set(`processingVideo:${fileName}`,JSON.stringify({userId,description,title,region,category,channelId}),"EX",300);
        return replyHandler200(reply,"sucess",{url});
    } catch (error) {
        console.log("error in the main handler function of the upload video",error.message);
        return replyHandler500(reply);
    }
}