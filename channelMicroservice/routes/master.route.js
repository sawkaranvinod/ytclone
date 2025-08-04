import { getPresignUrlForUploadImageRoute } from "./getPresignUrlForUploadImage.route.js";
import { updateCoverImageRoute } from "./updateCoverImage.route.js";
import { updateDescriptionRoute } from "./updateDescription.route.js";
import { updateLogoRoute } from "./updateLogo.route.js";
import { updateThumbnailRoute } from "./updateThumbnail.route.js";
import { updateTitleRoute } from "./updateTitle.route.js";
import {uploadVideoRoute} from "./uploadVideo.route.js";

export function masterRoute(fastify,opts) {
    fastify.register(uploadVideoRoute,{prefix:"/uploadvideo"});
    fastify.register(getPresignUrlForUploadImageRoute,{prefix : "/getPresignUrlFOrUploadImage"});
    fastify.register(updateCoverImageRoute,{prefix : "/updateCoverImage"});
    fastify.register(updateDescriptionRoute,{prefix:"/updateDescription"});
    fastify.register(updateLogoRoute,{prefix:"/uploadLogo"});
    fastify.register(updateThumbnailRoute,{prefix : "/updateThumbnail"});
    fastify.register(updateTitleRoute,{prefix : "/updateTitleRoute"});
}
