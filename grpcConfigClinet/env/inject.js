import { getawsCredentials } from "../service/awsCredentials.service.js";
import { getDatabaseConfig } from "../service/databaseConfig.service.js";
import { getRedisConfig } from "../service/redisConfig.service.js";
import { getKfkaConfig } from "../service/kafkaConfig.service.js";
import {envVariable } from "./variable.env.js";

export async function injectEnvVariables() {
    try {
        const awsCredentials = await getawsCredentials();
        const databaseConfig = await getDatabaseConfig();
        const redisConfig = await getRedisConfig();
        const kafkaConfig = await getKfkaConfig();
        if (!awsCredentials || !databaseConfig || !redisConfig || !kafkaConfig) {
            throw new Error("Failed to retrieve one or more configuration settings.");
        };
        envVariable.setAwsCredentials(awsCredentials);
        envVariable.setDatabaseConfig(databaseConfig);
        envVariable.setRedisConfig(redisConfig);
        envVariable.setKafkaConfig(kafkaConfig);

        console.log("✅ Environment variables injected successfully.");
    } catch (error) {
        console.error("❌ Error injecting environment variables:", error.message);
        process.exit(-1);
    }
}
