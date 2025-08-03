import {handleSubscribe} from "../controllers/subscribe.controllers.js";
import { subscribeMiddleware } from "../middlewares/subscribe.middlewares.js";

export function subscribeRoute(fastify,opts) {
    fastify.route(
            {
                method:"POST",
                url:"/",
                schema:{
                    body: {
                        type: "object",
                        required: ["channelId","subscribe"],
                        properties: {
                            channelId: { 
                                type: "string" 
                            },
                            subscribe :{
                                type:"boolean"
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
                preHandler:subscribeMiddleware,
                handler:handleSubscribe,
            }
        )
}