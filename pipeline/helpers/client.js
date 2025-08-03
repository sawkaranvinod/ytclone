import { SQSClient } from "@aws-sdk/client-sqs";
import {S3Client} from "@aws-sdk/client-s3";
export function createSqsClient(region,accessKeyId,secretAccessKey) {
    return new SQSClient({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        }
    });
}

export function createS3Client(region,accessKeyId,secretAccessKey) {
    return new S3Client({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        }
    });
};