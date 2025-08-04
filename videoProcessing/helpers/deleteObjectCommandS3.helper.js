import {DeleteObjectCommand} from "@aws-sdk/client-s3"


export function getDeleteObjectCommand(bucketName,key) {
    return new DeleteObjectCommand(
        {
            Bucket:bucketName,
            Key:key
        }
    )
}