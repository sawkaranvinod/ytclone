import { replyHandler200, replyHandler400 } from "../helper/reply.helper";
import {Subscribe} from "../schema/subscribe.modle"
export async function getSubscriptions(req, reply) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return replyHandler400(reply, "userId is required");
        }

        const subscriptions = await Subscribe.find({ userId }).populate("channelId");

        return replyHandler200(reply, "Fetched subscribed channels successfully", {
            subscriptions: subscriptions.map(s => s.channelId)
        });
    } catch (error) {
        console.log("Error in getSubscriptions controller:", error.message);
        return replyHandler500(reply);
    }
}
