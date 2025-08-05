import { getAwsCredentials } from "../service/awsCredentials.service.js";
import { getDatabaseConfig } from "../service/databaseConfig.service.js";
import { getRedisConfig } from "../service/redisConfig.service.js";
import { getKfkaConfig } from "../service/kafkaConfig.service.js";
import {getSqsQueueLink} from "../service/sqsQueueLink.service.js";
import {getRedisQueue} from "../service/redisQueue.service.js";
import {envVariable } from "./variable.env.js";
import {getHmacKey} from "../service/hmacKey.service.js";
import {getMeiliSearchConfig} from "../service/meiliSearch.service.js";

export async function injectEnvVariables() {
    try {
        const awsCredentials = await getAwsCredentials();
        const databaseConfig = await getDatabaseConfig();
        const redisConfig = await getRedisConfig();
        const kafkaConfig = await getKfkaConfig();
        const sqsQueueLink = await getSqsQueueLink();
        const redisQueue = await getRedisQueue();
        const hmacKey = await getHmacKey();
        const meiliSearchConfig = await getMeiliSearchConfig();
        console.log(meiliSearchConfig)
        envVariable.setAwsCredentials(awsCredentials);
        envVariable.setDatabaseConfig(databaseConfig);
        envVariable.setRedisConfig(redisConfig);
        envVariable.setKafkaConfig(kafkaConfig);
        envVariable.setSqsQueueLink(sqsQueueLink);
        envVariable.setRedisQueue(redisQueue);
        envVariable.setHmacKey(hmacKey);
        envVariable.setMeiliSearch(meiliSearchConfig);
        console.log("✅ Environment variables injected successfully.");
    } catch (error) {
        console.error("❌ Error injecting environment variables:", error.message);
        process.exit(-1);
    }
}
