import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js";

export function deleteVideoInPlaylistMiddleware(req, reply, done) {
    const sanitizedInput = {
        videoId : deepSanitize(req.body.videoId),
        playlistId : deepSanitize(req.body.playlistId)
    };
    if (!sanitizedInput.videoId || !sanitizedInput.playlistId) {
        return replyHandler400(reply, "insufficient data");
    };
    req.body = sanitizedInput;
    return done();
}