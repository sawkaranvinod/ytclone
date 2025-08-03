import {configClient} from "../client/client.js";

export  function getRedisQueue() {
    return new Promise((resolve, reject) => {
        configClient.redisQueue({}, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}