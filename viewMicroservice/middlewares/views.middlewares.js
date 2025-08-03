import { deepSanitize } from "../helper/sanitize.helper.js";
import { replyHandler400 } from "../helper/reply.helper.js"
export function viewsMiddleware(req,reply,done) {
    const sanitizeInput = {
        videoId : deepSanitize(req.body.videoId),
    }
    if(!sanitizeInput.videoId){
        return replyHandler400(reply,"Bad Request : videoId is null"); 
    }
    req.body = sanitizeInput;
    return done();
}