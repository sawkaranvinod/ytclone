import {envVariable} from "./env/variable.env.js"
import {injectEnvVariables} from "./env/inject.js"

;(async () => {
    console.log("Injecting environment variables...");
    await injectEnvVariables();
})()