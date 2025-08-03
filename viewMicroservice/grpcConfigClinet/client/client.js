import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const packageDefinition = protoLoader.loadSync(path.join(__dirname,"../proto/config.proto"),{});

const proto = grpc.loadPackageDefinition(packageDefinition);

export const configClient = new proto.config.videostreame.v1.VideoStreaming('localhost:5005',grpc.credentials.createInsecure());
