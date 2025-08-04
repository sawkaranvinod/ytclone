import { getS3Client } from "./client.helper.js";
import { getHeadObjectCommand } from "./headObjectCommand.helper.js"


export async function checkObjectInS3(region, accessKeyId, secretAccessKey, bucketName, key) {
    try {
        const client = getS3Client(region,accessKeyId,secretAccessKey);
        const command = getHeadObjectCommand(bucketName,key);
        await client.send(command);
        return true;
    } catch (error) {
        if (err.name === "NotFound") {
            return false;
        } else {
            console.error("Error checking object:", err);
            throw new err; 
        }
    }
}