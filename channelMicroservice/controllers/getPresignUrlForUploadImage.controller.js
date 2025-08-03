import { replyHandler200, replyHandler400, replyHandler500 } from "../helper/reply.helper.js";
import {envVariable} from "../grpcConfigClinet/env/variable.env.js"
import { getPreSignUrl } from "../helper/presignUrl.helper.js";
import { randomUUID } from "crypto";
export async function handleGetPresignUrlForUploadImage(req,reply){
    try {
        let {fileName,contentType,userId} = req.body;
        fileName = `${userId}:${randomUUID().replace("-","")}:${encodeURIComponent(fileName)}`;
        const contentTypeArray = contentType.split("/");
        if(contentTypeArray[0] !== "image" || contentTypeArray.length !== 2){
            return replyHandler400(reply,"unacceptable content type");
        }

        const url = await getPreSignUrl(fileName,contentType,envVariable.productionBucketName,envVariable.region,envVariable.accessKeyId,envVariable.secretAccessKey);
        if(!url){
            return replyHandler500(reply);
        }
        return replyHandler200(reply,"success",{url});
    } catch (error) {
        console.log("error in the main handler function of the getPresignUrlForUploadImage",error.messages);
        return replyHandler500(reply);
    }
}