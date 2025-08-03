import { deepSanitize } from "../helper/sanitize.helper.js";
import { booleanCheck } from "../helper/booleanCheck.helper.js";
import {replyHandler400} from "../helper/reply.helper.js"

export function reactionMiddleware(req,reply,done) {
    const sanitizeInput = {
        channelId : deepSanitize(req.body.channelId),
        subscribe : booleanCheck(req.body.subscribe)
    }
    if(!sanitizeInput.subscribe && !sanitizeInput.channelId){
        return replyHandler400(reply,"Bad Request : channelId or subcribe or not subcribe is null"); 
    }
    req.body = sanitizeInput;
    return done();
}