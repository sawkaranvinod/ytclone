import { kafkaProducer } from "../config/kafkaProducer.config.js";
import { replyHandler } from "../helper/reply.helper.js";


export async function handleReaction(req,reply) {
    try {
        const producer = kafkaProducer.getKafkaProducer();
        const {reaction,videoId,userId,commentId,communityPostId} = req.body;

        await producer.send({
            topic : "reaction",
            messages : [
                {
                    value : JSON.stringify({
                        reaction,
                        videoId,
                        userId,
                        commentId,
                        communityPostId
                    })
                }
            ]
        })
        replyHandler(reply,200,"success");
    } catch (error) {
        console.log(error.messages)
    }
}