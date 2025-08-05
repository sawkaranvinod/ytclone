import { spawn } from 'child_process';



export function runContainer(accessKeyId, secretAccessKey, region, key, tempBucketName, productionBucketName, redisPort, redisHost, redisUserName, redisPassword, redisVideoProcessingFaultQueue, redisPostVideoProcessingQueue,imageName) {
  try {

    let envVars = {
      AWS_ACCESS_KEY_ID: accessKeyId,
      AWS_SECRET_ACCESS_KEY: secretAccessKey,
      KEY: key,
      AWS_PRODUCTION_BUCKET_NAME: productionBucketName,
      AWS_TEMP_BUCKET_NAME: tempBucketName,
      REDIS_PORT: redisPort,
      REDIS_HOST: redisHost,
      REDIS_USERNAME: redisUserName,
      REDIS_PASSWORD: redisPassword,
      REDIS_VIDEO_PROCESSING_FAULT_QUEUE: redisVideoProcessingFaultQueue,
      REDIS_POST_VIDEO_PROCESSING_QUEUE: redisPostVideoProcessingQueue,
      AWS_REGION: region,
    };

    const envArgs = Object.entries(envVars).flatMap(([key, value]) => ['-e', `${key}=${value}`]);


    const image = imageName;
    const args = ['run', '--rm','-d', ...envArgs, image];

    const dockerProcess = spawn('docker', args, {
      stdio: 'ignore',
      detached: true
    });
    return dockerProcess;
  } catch (error) {
    console.log("Error starting container:", error);
  }
}

