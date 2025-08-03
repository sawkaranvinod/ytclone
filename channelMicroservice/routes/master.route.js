import {uploadVideoRoute} from "./uploadVideo.route.js";

export function masterRoute(fastify,opts) {
    fastify.register(uploadVideoRoute,{prefix:"/uploadvideo"});
}