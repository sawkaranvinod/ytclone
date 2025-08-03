import { injectEnvVariables } from "./grpcConfigClinet/env/inject.js";
import { processMessageFromSqs } from "./main.js";
import { createSqsClient } from "./command/client.js";

;(async () => {
    await injectEnvVariables();
    global.sqsClient = createSqsClient(); // set after env injection
    await processMessageFromSqs();
})();