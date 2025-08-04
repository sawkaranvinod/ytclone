import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function updateTitleMiddleware(req, reply, done) {
    const sanitizedInput = {
        videoId : deepSanitize(req.body.videoId),
        title : deepSanitize(req.body.title)
    };
    if (!sanitizedInput.videoId || !sanitizedInput.title) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}