import { createSqsClient } from "./helpers/client.js";
import { deleteMessageCommand } from "./helpers/deleteMessage.js";
import { envVariable } from "./grpcConfigClinet/env/variable.env.js";
import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import {dataCache} from "./config/redis.config.js";

export async function processMessageFromSqs() {
    try {
        const cache = dataCache.getCache();
        const sqsClient = createSqsClient(envVariable.region,envVariable.accessKeyId,envVariable.secretAccessKey);
        const reciveMessageCommand = new ReceiveMessageCommand({
            QueueUrl: envVariable.sqsQueueLink,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 1
        });

        while (true) {
            const response = await sqsClient.send(reciveMessageCommand);
            const messages = response.Messages;
            if (!messages || messages.length === 0) {
                console.log("No messages received");
                continue;
            }
            for (const message of messages) {
                const body = message.Body;
                const object = body.Object;
                const deleteCmd = deleteMessageCommand(envVariable.sqsQueueLink,message);
                await sqsClient.send(deleteCmd);
                console.log("Deleted message:", message.MessageId);
            }
        }
    } catch (error) {
        console.log("Error in the main handler:", error.message);
    }
}