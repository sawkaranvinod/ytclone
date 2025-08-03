import {config} from "dotenv";
config();
export const services = {
    awsCredentials: async (call, callback) => {
        try {
            const data = {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                tempBucketName: process.env.AWS_TEMP_BUCKET_NAME,
                productionBucketName:process.env.AWS_PRODUCTION_BUCKET_NAME,
                region: process.env.AWS_REGION,
            };
            return callback(null,data);
        } catch (error) {
            console.log("error in the main fuction of the configmanager of the grpc server", error.message);
            return callback(
                {
                    code: 15,
                    message: error.message,
                }
            )
        }
    },
    databaseConfig:async (call,callback) => {
        try {
            const uri = process.env.MONGO_DB_URI;
            return callback(null,{uri});
        } catch (error) {
            console.log("error in the main handle function of the grpc service",error.message);
            return callback(
                {
                    code:15,
                    message:error.message
                }
            )
        }
    },
    redisConfig:async (call,callback) => {
        try {
            const data = {
                port:process.env.REDIS_PORT,
                host:process.env.REDIS_HOST,
                username:process.env.REDIS_USERNAME,
                password:process.env.REDIS_PASSWORD,
            };
            return callback(null,data);
        } catch (error) {
            console.log("error in the main handle function of the grpc server",error.message);
            return callback(
                {
                    code:15,
                    message:error.message,
                }
            )
        }
    },
    kafkaConfig:async (call,callback) => {
        try {
            const data = {
                brokers: [process.env.KAFKA_BROKERS], // <-- fix here
                clientId: process.env.KAFKA_CLIENT_ID
            };
            return callback(null,data);
        } catch (error) {
            console.log("error in the main grpc server fuction of the config manager",error.message);
            return callback(
                {
                    code:15,
                    message:error.message,
                }
            )
        }
    },
    sqsQueueLink:async (call,callback) => {
        try {
            const data = {
                queueLink:process.env.AWS_SQS_QUEUE_LINK,
            };
            return callback(null,data);
        } catch (error) {
            console.log("error in the main config manager function in config manager",error.message);
            return callback(
                {
                    code:15,
                    message:error.message,
                }
            )
        }
    },
    redisQueue:async (call,callback) => {
        try {
            const data = {
                videoProcessingFaultQueue:process.env.REDIS_VIDEO_PROCESSING_FAULT_QUEUE,
                postVideoProcessingQueue:process.env.REDIS_POST_VIDEO_PROCESSING_QUEUE,
            };
            return callback(null,data);
        } catch (error) {
            console.log("error in the main grpc function of redisQueue",error.message);
            return callback(
                {
                    code:15,
                    message:error.message,
                }
            )
        }
    }
};