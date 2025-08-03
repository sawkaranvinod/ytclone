import {S3Client} from "@aws-sdk/client-s3";

export function getS3Client(region,accessKeyId,secretAccessKey) {
    return new S3Client(
        {
            region:region,
            credentials:{
                accessKeyId:accessKeyId,
                secretAccessKey:secretAccessKey,
            }
        }
    );
};
