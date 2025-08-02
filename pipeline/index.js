import { sqsClient } from "./command/client.js";
import { reciveMessageCommand } from "./command/reciveMessage.js";
import { deleteMessageCommand } from "./command/deleteMessage.js";

;(async () => {
    try {
        while (true) {
            const response = await sqsClient.send(reciveMessageCommand);
            const messages = response.Messages;
            if (!messages || messages.length === 0) {
                console.log("No messages received");
                continue;
            }
            for (const message of messages) {
                console.log("Received message:", message.Body);
                // Delete the message after processing
                const deleteCmd = deleteMessageCommand(message);
                await sqsClient.send(deleteCmd);
                console.log("Deleted message:", message.MessageId);
            }
        }
    } catch (error) {
        console.log("Error in the main handler:", error.message);
    }
})();