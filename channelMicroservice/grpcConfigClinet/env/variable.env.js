export class ENV {
    constructor() {
        this.region = null;
        this.tempBucketName = null;
        this.accessKeyId = null;
        this.secretAccessKey = null;
        this.productionBucketName = null;
        this.sqsQueueLink = null;
        this.videoProcessingFaultQueue = null;
        this.postVideoProcessingQueue = null;
        this.uri = null;
        this.port = null;
        this.host = null;
        this.username = null;
        this.password = null;
        this.brokers = null;
        this.clientId = null;
        this.hmacKey = null;
        this.meiliSearchHost = null;
        this.meiliSearchApiKey = null;
    }

    setAwsCredentials({ region, productionBucketName, tempBucketName, accessKeyId, secretAccessKey }) {
        this.region = region;
        this.tempBucketName = tempBucketName;
        this.productionBucketName = productionBucketName;
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

    setSqsQueueLink({ queueLink }) {
        this.sqsQueueLink = queueLink;
    }

    setRedisQueue({ postVideoProcessingQueue, videoProcessingFaultQueue }) {
        this.postVideoProcessingQueue = postVideoProcessingQueue;
        this.videoProcessingFaultQueue = videoProcessingFaultQueue;
    }

    setMeiliSearch({host,apikey}){
        this.meiliSearchHost = host;
        this.meiliSearchApiKey = apikey;
    }
    
    setHmacKey({hmacKey}){
        this.hmacKey = hmacKey;
    }

    awsCredentials() {
        return {
            region: this.region,
            tempBucketName: this.tempBucketName,
            productionBucketName: this.productionBucketName,
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

    sqsQueueLink() {
        return {
            sqsQueueLink: this.sqsQueueLink,
        };
    }

    redisQueue() {
        return {
            videoProcessingFaultQueue: this.videoProcessingFaultQueue,
            postVideoProcessingQueue: this.postVideoProcessingQueue,
        }
    }

}


export let envVariable = new ENV();
