import {configClient} from "../client/client.js"

export  function getRedisConfig() {
    return new Promise((resolve, reject) => {
        configClient.redisConfig({}, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}