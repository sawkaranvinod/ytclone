import {getHistoryMiddleware} from "../middlewares/getHistory.middleware.js";
import {getHistory} from "../controller/getHistory.controller.js";

export function getHistoryRoute(fastify,opts) {
    fastify.route(
        {
            method:"POST",
            url:"/",
            schema:{
                body: {
                    type: "object",
                    required: ["userId"],
                    properties: {
                        userId : {
                            type:"string"
                        },
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
            preHandler:getHistoryMiddleware,
            handler:getHistory,
        }
    )
};
