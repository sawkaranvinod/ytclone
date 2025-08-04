import {updateDescrptionMiddleware} from "../middlewares/updateDescription.middleware.js";
import {handleUpdateDescription} from "../controllers/updateDescription.controller.js";

export function updateDescriptionRoute(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{
                body: {
                    type: "object",
                    required: ["videoId","description"],
                    properties: {
                        videoId : {
                            type:"string"
                        },
                        description:{
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
            preHandler:updateDescrptionMiddleware,
            handler:handleUpdateDescription,
        }
    )
};
