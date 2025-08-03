import {configClient} from "../client/client.js";

export  function getSqsQueueLink() {
    return new Promise((resolve, reject) => {
        configClient.sqsQueueLink({}, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}