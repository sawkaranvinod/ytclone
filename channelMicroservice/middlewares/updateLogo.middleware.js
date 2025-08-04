import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function updateLogoMiddleware(req, reply, done) {
    const sanitizedInput = {
        channelId : deepSanitize(req.body.channelId),
        "userId" : "theuserid"
    };
    if (!sanitizedInput.channelId) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}