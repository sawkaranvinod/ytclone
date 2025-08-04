import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function getPresignUrlForUploadImageMiddleware(req, reply, done) {
    const sanitizedInput = {
        fileName: deepSanitize(req.body.fileName),
        contentType : deepSanitize(req.body.contentType),
        userId: "theuserid",
    };
    if (!sanitizedInput.contentType || !sanitizedInput.fileName) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}