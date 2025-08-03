import {DeleteObjectCommand} from "@aws-sdk/client-s3";

export function getDeleteObjectCommand(key,bucketName) {
    return new DeleteObjectCommand(
        {
            Key:key,
            Bucket:bucketName,
        }
    );
};
