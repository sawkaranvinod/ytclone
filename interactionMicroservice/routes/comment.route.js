import { handleComment } from "../controllers/comment.contollers.js";
import { commentMiddleware } from "../middlewares/comment.middlewares.js";

export function commentRoute(fastify,opts) {
    fastify.route(
            {
                method:"POST",
                url:"/",
                schema:{
                    body: {
                        type: "object",
                        required: ["comment"],
                        properties: {
                            comment: { 
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
                preHandler:commentMiddleware,
                handler:handleComment,
            }
        )
}