import { deepSanitize } from "../helper/sanitize.helper";

export const viewMiddleware = (req, reply, done) => {
    req.body.videoId = deepSanitize(req.body.videoId);
    return done();
};