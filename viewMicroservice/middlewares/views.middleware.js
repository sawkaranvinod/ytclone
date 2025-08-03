import { deepSanitize } from "../helper/sanitize.helper.js";

export function viewsMiddleware(req,reply,done) {
    req.body.videoId = deepSanitize(req.body.videoId);
    done();
}