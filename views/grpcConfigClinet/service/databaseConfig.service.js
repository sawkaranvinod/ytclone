import {configClient} from "../client/client.js"

export function getDatabaseConfig(){
    return new Promise((resolve, reject) => {
        configClient.databaseConfig({}, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}