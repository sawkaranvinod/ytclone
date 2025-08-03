import Docker from 'dockerode';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const runContainer = async () => {
  try {
    const imageName = 'my-node-app';
    const envVars = [
      'NODE_ENV=production',
      'API_KEY=123456',
      'CUSTOM_VAR=hello'
    ];
    const container = await docker.createContainer({
      Image: imageName,
      name: 'my-local-container',
      Cmd: ['node', 'index.js'],
      Env: envVars,
      HostConfig: {
        AutoRemove: true,
      },
    });
    await container.start();
    console.log(`Container started from image: ${imageName}`);
  } catch (err) {
    console.error('Error starting container:', err);
  }
};
