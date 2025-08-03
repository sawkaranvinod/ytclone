import crypto from "crypto";
export function createHmac(key, data) {
    return crypto.createHmac("sha256", key).update(data).digest("hex");
}