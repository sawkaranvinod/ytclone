import { deepSanitize } from "../helper/sanitize.helper.js";
import {replyHandler400} from "../helper/reply.helper.js";

export function uploadVideoMiddleware(req, reply, done) {
    const sanitizedInput = {
        fileName: deepSanitize(req.body.fileName),
        duration: deepSanitize(req.body.duration),
        contentType:deepSanitize(req.body.contentType),
        userId:"theuserid"
    };
    if (!sanitizedInput.contentType || !sanitizedInput.duration || !sanitizedInput.fileName) {
        return replyHandler400(reply,"insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}