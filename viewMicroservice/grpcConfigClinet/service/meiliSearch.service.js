import {configClient} from "../client/client.js";

export function getMeiliSearchConfig(){
    return new Promise((resolve, reject) => {
        configClient.meiliSearchConfig({}, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}