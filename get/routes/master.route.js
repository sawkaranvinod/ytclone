import {addVideoInPlaylistRoute} from "./addVideoInPlaylist.route"
import {createPlaylistRoute} from "./createPlaylist.route"
import {deleteVideoByChannelOwnerRoute} from "./deleteVideoFromChannel.route"
import {deleteVideoInPlaylistRoute} from "./deleteVideoInPlaylist.route"
import {getHistoryRoute} from "./getHistroy.route"
import {getPlaylistRoute} from "./getPlaylist.route"
import {getSubscriptionRoute} from "./getSubscription.route"
import {getVideoRoute} from "./getVideo.route"

export function masterRoute(fastify,opts) {
    fastify.register(addVideoInPlaylistRoute,{prefix:"/add-video-to-playlist"});
    fastify.register(createPlaylistRoute,{prefix : "/create-playlist"});
    fastify.register(deleteVideoByChannelOwnerRoute,{prefix : "/delete-video-by-owner"});
    fastify.register(deleteVideoInPlaylistRoute,{prefix:"/delete-video-in-playlist"});
    fastify.register(getHistoryRoute,{prefix:"/get-history"});
    fastify.register(getPlaylistRoute,{prefix : "/get-playlist"});
    fastify.register(getSubscriptionRoute,{prefix : "/get-subscription"});
    fastify.register(getVideoRoute,{prefix : "/get-video"});
}
