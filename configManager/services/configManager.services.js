export const services = {
    credentials: async (call, callback) => {
        try {
            const data = {
                accessKeyId: "AKIAWGALG5GA6BNVUGA6",
                secretAccessKey: "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",
                bucketName: "chilandu",
                region: "ap-south-1",
            };
            return callback(null,data)
        } catch (error) {
            console.log("error in the main fuction of the configmanager of the grpc server", error.message);
            return callback(
                {
                    code: 15,
                    message: "internal server error",
                }
            )
        }
    }
};