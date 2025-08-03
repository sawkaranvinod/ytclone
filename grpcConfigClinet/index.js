import {injectEnvVariables} from "./env/inject.js";
import {envVariable} from "./env/variable.env.js";

;(async () => {
    await injectEnvVariables();
    console.log(envVariable)
})