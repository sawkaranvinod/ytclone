import { configClient } from "../client/client.js";

export function getKfkaConfig(){
    return new Promise((resolve,reject) => {
        configClient.kafkaConfig({},(err,res)=> {
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    });
};