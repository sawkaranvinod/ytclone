import {getS3Client} from "./client.helper.js";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {getPutObjectCommand} from "./putObjectCommand.helper.js";

export async function getPreSignUrl(fileName,contentType,bucketName,region,accessKeyId,secretAccessKey) {
    try {
        const client = getS3Client(region,accessKeyId,secretAccessKey);
        const putObjectCommand = getPutObjectCommand(fileName,bucketName,contentType);
        return await getSignedUrl(client,putObjectCommand,{expiresIn:300});
    } catch (error) {
        console.log("error in the pre sign url helper");
        return null;
    }
};