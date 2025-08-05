import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function createPlaylistMiddleware(req, reply, done) {
    const sanitizedInput = {
        playlistName : deepSanitize(req.body.playlistName)
    };
    if (!sanitizedInput.playlistName) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}