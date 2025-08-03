import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";


export function reciveMessageCommand(queueLink) {
    return new ReceiveMessageCommand(
        {
            QueueUrl:queueLink,
            MaxNumberOfMessages:1,
            WaitTimeSeconds:1,
        }
    )
};