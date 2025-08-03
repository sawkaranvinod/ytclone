import { SQSClient } from "@aws-sdk/client-sqs";


export function createSqsClient(region,accessKeyId,secretAccessKey) {
    return new SQSClient({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        }
    });
}
