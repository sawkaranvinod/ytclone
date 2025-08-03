import { handleReaction } from "../controllers/reaction.controllers.js";
import { reactionMiddleware } from "../middlewares/reaction.middlewares.js";

export function reactionRoute(fastify,opts) {
    fastify.route(
            {
                method:"POST",
                url:"/",
                schema:{
                    body: {
                        type: "object",
                        required: ["reaction"],
                        properties: {
                            reaction: { 
                                type: "string" 
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
                preHandler:reactionMiddleware,
                handler:handleReaction,
            }
        )
}