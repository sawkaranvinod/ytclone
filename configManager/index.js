import {config} from "dotenv";
import {startServer} from "./server/configManager.server.js";
config();
const configManagerGrpcServerPort = process.env.CONFIG_MANAGER_GRPC_SERVER_PORT || 5005;

;(async (port) => {
    startServer(port);
})(configManagerGrpcServerPort);