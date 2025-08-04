import {uploadVideoMiddleware} from "../middlewares/uploadVideo.middleware.js";
import {handleUploadVideo} from "../controllers/uploadVideo.controller.js";

export function uploadVideoRoute(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{
                body: {
                    type: "object",
                    required: ["fileName","contentType","duration","description","title","region","category"],
                    properties: {
                        fileName: { 
                            type: "string",
                        },
                        contentType:{
                            type:"string",
                        },
                        duration:{
                            type:"string",
                        },
                        description:{
                            type:"string",
                        },
                        title:{
                            type:"string",
                        },
                        region:{
                            type:"string",
                        },
                        category:{
                            type:["string"]
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
            preHandler:uploadVideoMiddleware,
            handler:handleUploadVideo,
        }
    )
};
