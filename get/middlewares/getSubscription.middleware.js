import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function getSubscriptionMiddleware(req, reply, done) {
    const sanitizedInput = {
        userId : "userid",
    };
    if (!sanitizedInput.userId) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}