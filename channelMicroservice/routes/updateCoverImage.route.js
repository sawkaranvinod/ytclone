import {updateCoverImageMiddleware} from "../middlewares/updateCoverImage.middleware.js";
import {handleUpdateCoverImage} from "../controllers/updateCoverImage.controller.js";

export function updateCoverImageRoute(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{
                body: {
                    type: "object",
                    required: ["channelId"],
                    properties: {
                        channelId:{
                            type : "string"
                        }
                    },
                },
                response: {
                    200: {
                        type: "object",
                        properties: {
                            message: { 
                                type: "string" 
                            },
                            data:{
                                type:"object",
                                properties:{
                                    url:{
                                        type:"string"
                                    }
                                }
                            }
                        },
                    },
                    400: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    500: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    404: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    401: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                },
            },
            preHandler:updateCoverImageMiddleware,
            handler:handleUpdateCoverImage,
        }
    )
};
