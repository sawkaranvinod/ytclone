import { kafkaProducer } from "../config/kafkaProducer.config.js";
import { replyHandler } from "../helper/reply.helper.js";

export async function handleComment(requestAnimationFrame,reply) {
    try {
        const producer = kafkaProducer.getKafkaProducer();
        const {comment,videoId,userId,communityPostId,commentId} = req.body;

        await producer.send({
            topic : "comment",
            messages : [
                {
                    value : JSON.stringify({
                        comment,
                        videoId,
                        userId,
                        communityPostId,
                        commentId
                    })
                }
            ]
        })
        replyHandler(reply,200,"success");
    } catch (error) {
        console.log(error.messages)
    }
}