import {commentRoute} from "./comment.route.js"
import {reactionRoute} from "./reaction.route.js"
import {subscribeRoute} from "./subscribe.route.js"
export function masterRoute(fastify, opts) {
    fastify.register(commentRoute,{prefix:"/comment"});
    fastify.register(reactionRoute,{prefix:"/reaction"});
    fastify.register(subscribeRoute,{prefix:"/subscribe"});
};