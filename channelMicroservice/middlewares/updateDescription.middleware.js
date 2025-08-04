import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function updateDescrptionMiddleware(req, reply, done) {
    const sanitizedInput = {
        videoId : deepSanitize(req.body.videoId),
        description : deepSanitize(req.body.description)
    };
    if (!sanitizedInput.videoId || !sanitizedInput.description) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}