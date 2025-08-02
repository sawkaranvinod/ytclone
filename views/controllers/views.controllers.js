import { kafkaProducer } from "./config/kafkaProducer.config.js";
import { replyHandler } from "../helper/reply.helper.js";

export async function handleViews(req,reply) {
    try {

        const producer = kafkaProducer();
        const {videoId,userId} = req.body;
    
        await producer.send({
            topic : "views",
            messages : [
                {
                    value : JSON.stringify({
                        videoId,
                        userId
                    })
                }
            ]
        })
        replyHandler(reply,200,"success");
    } catch (error) {
        console.log(error.message);
    }
}