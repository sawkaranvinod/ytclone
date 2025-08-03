import Docker from 'dockerode';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export async function runDockerContainer(variable, imageName, containerName) {
  const container = await docker.createContainer({
    Image: imageName,
    name: containerName,
    Cmd: ['node', 'index.js'],
    Env: variable,
    HostConfig: {
      AutoRemove: true,
    },
  });
  await container.start();
  console.log(`Container started from image: ${imageName}`);
};
