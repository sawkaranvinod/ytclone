import { kafkaProducer } from "../config/kafkaProducer.config.js";
import { replyHandler } from "../helper/reply.helper.js";


export async function handleSubscribe(req,reply){
    try {
        const producer = kafkaProducer.getKafkaProducer();
        const {channelId,userId,subscribe} = req.body;

        await producer.send({
            topic : "subscribe",
            messages : [
                {
                    value : JSON.stringify({
                        channelId,
                        userId,
                        subscribe
                    })
                }
            ]
        })     
        replyHandler(reply,200,"success");
    } catch (error) {
        console.log(error.messages)
    }
}