import {PutObjectCommand} from "@aws-sdk/client-s3";

export function getPutObjectCommand(fileName,bucketName,contentType) {
    return new PutObjectCommand(
        {
            Bucket:bucketName,
            Key:fileName,
            ContentType:contentType,
        }
    );
};