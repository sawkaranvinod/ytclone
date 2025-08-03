import {replyHandler500,replyHandler200,replyHandler400} from "../helper/reply.helper.js";
import {getPreSignUrl} from "../helper/presignUrl.helper.js";
import { randomUUID } from "crypto";
import {envVariable} from "../grpcConfigClinet/env/variable.env.js";

export async function handleUploadVideo(req,reply) {
    try {
        let {fileName,userId,contentType,duration} = req.body;
        fileName = `${duration}:${randomUUID().replace("-","")}:${userId}:${fileName}`;
        contentType = contentType.split("/");
        if (contentType.length !== 2 || contentType[0] !== "video") {
            return replyHandler400(reply,"unacceptable content type");
        };
        const url = await getPreSignUrl(fileName,contentType,envVariable.tempBucketName,envVariable.region,envVariable.accessKeyId,envVariable.secretAccessKey);
        if (!url) {
            return replyHandler500(reply);
        };
        return replyHandler200(reply,"sucess",{url});
    } catch (error) {
        console.log("error in the main handler function of the upload video",error.message);
        return replyHandler500(reply);
    }
}