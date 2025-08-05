import { createSqsClient,createS3Client} from "./helpers/client.helper.js";
import { deleteMessageCommand } from "./helpers/deleteMessage.helper.js";
import { envVariable } from "./grpcConfigClinet/env/variable.env.js";
import { getReciveMessageCommand } from "./helpers/reciveMessage.helper.js";
import {dataCache} from "./config/redis.config.js";
import {getDeleteObjectCommand} from "./helpers/deleteObjectCommand.helper.js";
import {runContainer} from "./container/run.container.js";

export async function processMessageFromSqs() {
    try {
        const sqsClient = createSqsClient(envVariable.region,envVariable.accessKeyId,envVariable.secretAccessKey);
        const reciveMessageCommand = getReciveMessageCommand(envVariable.sqsQueueLink);
        
        while (true) {
            const cache = dataCache.getCache();
            try {
                const response = await sqsClient.send(reciveMessageCommand);
                const messages = response.Messages;
                if (!messages || messages.length === 0) {
                    console.log("No messages received");
                    continue;
                }
                for (const message of messages) {
                    let body;
                    try {
                        body = JSON.parse(message.Body);
                    } catch (e) {
                        console.log("Failed to parse message body:", message.Body);
                        continue;
                    }
                    const record = body?.Records?.[0];
                    const objectKey = record?.s3?.object?.key;
                    console.log(record)
                    console.log(objectKey);
                    if (!objectKey) {
                        console.log("Invalid message format, missing s3.object.key:", body);
                        continue;
                    }
                    await cache.persist(`processingVideo:${decodeURIComponent(objectKey)}`);
                    // Now you can safely access objectKey
                    const imageName = `videoprocessing:latest`;
                    const container = runContainer(
                        envVariable.accessKeyId,
                        envVariable.secretAccessKey,
                        envVariable.region,
                        decodeURIComponent(objectKey), // error to replace
                        envVariable.tempBucketName,
                        envVariable.productionBucketName,
                        `${envVariable.port}`,
                        'host.docker.internal',
                        envVariable.username,
                        envVariable.password,
                        envVariable.videoProcessingFaultQueue,
                        envVariable.postVideoProcessingQueue,
                        imageName
                    );
                    container.unref();
                    console.log("container started");
                    const deleteCmd = deleteMessageCommand(envVariable.sqsQueueLink, message);
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