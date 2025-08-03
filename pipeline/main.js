import { createSqsClient,createS3Client } from "./helpers/client.helper.js";
import { deleteMessageCommand } from "./helpers/deleteMessage.helper.js";
import { envVariable } from "./grpcConfigClinet/env/variable.env.js";
import { getReciveMessageCommand } from "./helpers/reciveMessage.helper.js";
import {dataCache} from "./config/redis.config.js";
import {envVariable} from "./grpcConfigClinet/env/variable.env.js";
import {getDeleteObjectCommand} from "./helpers/deleteObjectCommand.helper.js";
import {runDockerContainer} from "./container/run.container.js";

export async function processMessageFromSqs() {
    try {
        const cache = dataCache.getCache();
        const sqsClient = createSqsClient(envVariable.region,envVariable.accessKeyId,envVariable.secretAccessKey);
        const reciveMessageCommand = getReciveMessageCommand(envVariable.sqsQueueLink);

        while (true) {
            try {
                const response = await sqsClient.send(reciveMessageCommand);
                const messages = response.Messages;
                if (!messages || messages.length === 0) {
                    console.log("No messages received");
                    continue;
                }
                for (const message of messages) {
                    const body = message.Body;
                    const data = await cache.get(`processingVideo:${body.object.key}`);
                    if (!data) {
                        const s3Client = createS3Client(envVariable.region,envVariable.accessKeyId,envVariable.secretAccessKey);
                        const deleteObjectCommand = getDeleteObjectCommand(body.s3.object.key,body.s3.bucket.name);
                        await s3Client.send(deleteObjectCommand);
                    };
                    await cache.persist(`processingVideo:${body.s3.object.key}`);
                    const variable = [`AWS_ACCESS_KEY_ID=${envVariable.accessKeyId}`,`AWS_SECRET_ACCESS_KEY=${envVariable.secretAccessKey}`,`KEY=${body.s3.object.key}`,`AWS_TEMP_BUCKET_NAME=${body.s3.bucket.name}`,`AWS_PRODUCTION_BUCKET_NAME=${envVariable.productionBucketName}`];
                    const imageName = `videoprocessing:latest`;
                    const containerName = body.s3.object.key;
                    await runDockerContainer(variable,imageName,containerName);
                    const deleteCmd = deleteMessageCommand(envVariable.sqsQueueLink,message);
                    await sqsClient.send(deleteCmd);
                    console.log("Deleted message:", message.MessageId);
                }
            } catch (error) {
                console.log("error in the infinite loop",error.message);
            }
        }
    } catch (error) {
        console.log("Error in the main handler:", error.message);
    }
}