import { deepSanitize } from "../helper/sanitize.helper.js";

export function commentMiddleware(req,reply,done) {
    const sanitizeInput = {
        comment : deepSanitize(req.body.comment),
        videoId : deepSanitize(req.body.videoId),
        communityPostId : deepSanitize(req.body.communityPostId),
        commentId : deepSanitize(req.body.commentId)
    }
    if(!sanitizeInput.comment && (!sanitizeInput.videoId || !sanitizeInput.communityPostId || !sanitizeInput.commentId)){
        return replyHandler400(reply,"Bad Request : comment or videoId or comunitPostId or commentId is null"); 
    }
    req.body = sanitizeInput;
    return done();
}