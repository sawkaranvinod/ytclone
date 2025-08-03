import {configClient} from "../client/client.js"

export  function getAwsCredentials() {
    return new Promise((resolve, reject) => {
        configClient.awsCredentials({}, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}