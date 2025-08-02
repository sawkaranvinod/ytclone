import { DeleteMessageCommand } from "@aws-sdk/client-sqs";

export const deleteMessageCommand = (message) =>
    new DeleteMessageCommand({
        ReceiptHandle: message.ReceiptHandle,
    });