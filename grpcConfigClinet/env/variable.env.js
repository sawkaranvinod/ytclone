export class ENV {
    constructor() {
        this.region = null;
        this.bucketName = null;
        this.accessKeyId = null;
        this.secretAccessKey = null;

        this.uri = null;

        this.port = null;
        this.host = null;
        this.username = null;
        this.password = null;

        this.brokers = null;
        this.clientId = null;
    }

    setAwsCredentials({ region, bucketName, accessKeyId, secretAccessKey }) {
        this.region = region;
        this.bucketName = bucketName;
        this.accessKeyId = accessKeyId;
        this.secretAccessKey = secretAccessKey;
    }

    setDatabaseConfig({ uri }) {
        this.uri = uri;
    }

    setRedisConfig({ port, host, username, password }) {
        this.port = port;
        this.host = host;
        this.username = username;
        this.password = password;
    }

    setKafkaConfig({ brokers, clientId }) {
        this.brokers = brokers;
        this.clientId = clientId;
    }

    awsCredentials() {
        return {
            region: this.region,
            bucketName: this.bucketName,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey
        };
    }

    databaseConfig() {
        return {
            URI: this.uri
        };
    }

    redisConfig() {
        return {
            port: this.port,
            host: this.host,
            username: this.username,
            password: this.password
        };
    }

    kafkaConfig() {
        return {
            brokers: this.brokers,
            clientId: this.clientId
        };
    }
}


export const envVariable = new ENV();
