import { deepSanitize } from "../helper/sanitize.helper.js";
import { booleanCheck } from "../helper/booleanCheck.helper.js";
import {replyHandler400} from "../helper/reply.helper.js"

export function reactionMiddleware(req,reply,done) {
    const sanitizeInput = {
        reaction : booleanCheck(req.body.reaction),
        videoId : deepSanitize(req.body.videoId),
        commentId : deepSanitize(req.body.commentId),
        communityPostId : deepSanitize(req.body.communityPostId)
    }
    if(!sanitizeInput.reaction && (!sanitizeInput.videoId || !sanitizeInput.commentId || sanitizeInput.communityPostId)){
        return replyHandler400(reply,"Bad Request : reaction or videoId or commentId is null"); 
    }
    req.body = sanitizeInput;
    return done();
}