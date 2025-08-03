import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";


export function getReciveMessageCommand(queueLink) {
    return new ReceiveMessageCommand(
        {
            QueueUrl:queueLink,
            MaxNumberOfMessages:1,
            WaitTimeSeconds:1,
        }
    )
};