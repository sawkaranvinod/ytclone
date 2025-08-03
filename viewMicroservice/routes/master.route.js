import {viewRoute} from "./view.route.js";
export function masterRoute(fastify, opts) {
    fastify.register(viewRoute,{prefix:"/views"});
};