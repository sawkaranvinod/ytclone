import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";

export const reciveMessageCommand = new ReceiveMessageCommand({
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 1
});