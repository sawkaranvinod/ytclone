import {configClient} from "../client/client.js"

export  function getawsCredentials() {
    return new Promise((resolve, reject) => {
        configClient.awsCredentials({}, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}