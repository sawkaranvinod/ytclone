import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import path from "path";
import {services} from "../services/configManager.services.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(path.join(__dirname,"../proto/config.proto"));
const proto = grpc.loadPackageDefinition(packageDefination);

export function startServer(port) {
    try {
        const server = new grpc.Server();
        server.addService(proto.config.videostreame.v1.VideoStreaming.service,services);
        server.bindAsync(`0.0.0.0:${port}`,grpc.ServerCredentials.createInsecure(),(err,address)=>{
            if (err) {
                console.log("error in the grpc server",err.message);
                process.exit(-1);
            };
            console.log(`server started at port ${port}`)
        })
    } catch (error) {
        console.log("error in the starting the grpc server of the config manager grpc server",error);
        process.exit(-1);
    }
}