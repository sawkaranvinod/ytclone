import {configClient} from "../client/client.js";

export function getHmacKey(){
    return new Promise((resolve, reject) => {
        configClient.hmacKey({}, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}