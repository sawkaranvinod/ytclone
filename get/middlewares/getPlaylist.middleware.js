import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function getPlaylistMiddleware(req, reply, done) {
    const sanitizedInput = {
        playlistId : deepSanitize(req.body.videoId),
    };
    if (!sanitizedInput.playlistId) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}