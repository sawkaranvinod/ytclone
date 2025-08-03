import { DeleteMessageCommand } from "@aws-sdk/client-sqs";


export function deleteMessageCommand(queueLink,message) {
    return new DeleteMessageCommand(
        {
            QueueUrl:queueLink,
            ReceiptHandle:message.ReceiptHandle
        }
    )
};