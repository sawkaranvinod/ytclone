export const services = {
    awsCredentials: async (call, callback) => {
        try {
            const data = {
                accessKeyId: "AKIAWGALG5GA6BNVUGA6",
                secretAccessKey: "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",
                bucketName: "chilandu",
                region: "ap-south-1",
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
            const uri = "mongodb+srv://project01072025:avinashkaran@youtubecloneproject.1bwp70u.mongodb.net";
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
                port:6379,
                host:"localhost",
                username:"",
                password:"",
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
                brokers:["localhost:19092"],
                clientId:"allClient"
            }
        } catch (error) {
            console.log("error in the main grpc server fuction of the config manager",error.message);
            return callback(
                {
                    code:15,
                    message:error.message,
                }
            )
        }
    }
};