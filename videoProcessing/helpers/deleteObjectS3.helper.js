import {getS3Client} from "./clients3.helper.js";
import {getDeleteObjectCommand} from "./deleteObjectCommandS3.helper.js";


export async function deleteObject(region,accessKeyId,secretAccessKey,bucketName,key) {
    try {
        const client = getS3Client(region,accessKeyId,secretAccessKey);
        const deleteCommand = getDeleteObjectCommand(bucketName,key);
        await client.send(deleteCommand);
        return true;
    } catch (error) {
        console.log("error is on the deleteint the object from the s3 bucket",error.message);
        return false;
    }
}