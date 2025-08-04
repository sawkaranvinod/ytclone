import {HeadObjectCommand} from "@aws-sdk/client-s3";


export function getHeadObjectCommand(bucketName,key) {
    return new HeadObjectCommand(
        {
            Bucket:bucketName,
            Key:key,
        }
    );
};