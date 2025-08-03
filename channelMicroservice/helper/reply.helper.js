export function replyHandler200(reply,message = "Success", data = null) {
    return reply.code(200).send({ message, data });
}

export function replyHandler404(reply, message = "Not Found") {
    return reply.code(404).send({ message });
}

export function replyHandler500(reply, message = "Server Error") {
    return reply.code(500).send({ message });
}

export function replyHandler400(reply, message = "Bad Request") {
    return reply.code(400).send({ message });
}
