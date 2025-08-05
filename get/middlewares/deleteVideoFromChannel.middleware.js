import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function deleteVideoFromChannelMiddleware(req, reply, done) {
    const sanitizedInput = {
        videoId : deepSanitize(req.body.videoId),
    };
    if (!sanitizedInput.videoId) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}