import {handleGetPresignUrlForUploadImage} from "../controllers/getPresignUrlForUploadImage.controller.js"
import {getPresignUrlForUploadImageMiddleware} from "../middlewares/getPresignUrlForUploadImage.middleware.js"

export function getPresignUrlForUploadImageRoute(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{
                body: {
                    type: "object",
                    required: ["fileName","contentType"],
                    properties: {
                        fileName: { 
                            type: "string",
                        },
                        contentType:{
                            type:"string",
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
            preHandler:getPresignUrlForUploadImageMiddleware,
            handler:handleGetPresignUrlForUploadImage,
        }
    )
};
