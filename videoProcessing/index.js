import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "node:fs/promises";
import path from "node:path";
import { createWriteStream, createReadStream } from "node:fs";
import ffmpeg from "fluent-ffmpeg";
import { config } from "dotenv";
config();

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = "chilandu";
const key = process.env.KEY;

const RESOLUTIONS = [
  { name: "144p", width: 256, height: 144 },
  { name: "240p", width: 426, height: 240 },
  { name: "360p", width: 640, height: 360 },
  { name: "480p", width: 854, height: 480 },
  { name: "720p", width: 1280, height: 720 },
];

function getEstimatedBandwidth(height) {
  if (height <= 144) return 150000;
  if (height <= 240) return 300000;
  if (height <= 360) return 600000;
  if (height <= 480) return 1000000;
  if (height <= 720) return 2000000;
  return 4000000;
}

async function downloadOriginalVideo(localPath) {
  console.log("⏬ Downloading from S3...");
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const data = await s3Client.send(command);
  const writeStream = createWriteStream(localPath);
  await new Promise((resolve, reject) => {
    data.Body.pipe(writeStream)
      .on("finish", () => {
        console.log("✅ Download complete:", localPath);
        resolve();
      })
      .on("error", reject);
  });
}

async function generateVariants(originalPath) {
  await fs.mkdir("output", { recursive: true });

  const variants = await Promise.all(
    RESOLUTIONS.map(({ name, width, height }) => {
      const folderPath = path.join("output", name);
      const playlistPath = path.join(folderPath, `${name}.m3u8`);
      return new Promise((resolve, reject) => {
        fs.mkdir(folderPath, { recursive: true }).then(() => {
          ffmpeg(originalPath)
            .videoCodec("libx264")
            .audioCodec("aac")
            .size(`${width}x${height}`)
            .outputOptions([
              "-preset veryfast",
              "-g 48",
              "-sc_threshold 0",
              `-hls_time 4`,
              `-hls_segment_filename ${folderPath}/${name}_chunk%d.ts`,
              "-hls_playlist_type vod",
            ])
            .output(playlistPath)
            .on("end", () => {
              console.log(`✅ Created variant: ${name}`);
              resolve({ name, playlistPath, folderPath, width, height });
            })
            .on("error", (err) => {
              console.error(`❌ Failed variant: ${name}`, err);
              reject(err);
            })
            .run();
        });
      });
    })
  );

  return variants;
}

async function generateMasterPlaylist(variants) {
  const masterPath = path.join("output", "master.m3u8");

  const lines = variants.map(({ name, width, height }) => {
    const bandwidth = getEstimatedBandwidth(height);
    return (
      `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${width}x${height},CODECS="avc1.42e01e,mp4a.40.2"\n` +
      `${name}/${name}.m3u8`
    );
  });

  const content = "#EXTM3U\n" + lines.join("\n") + "\n";
  await fs.writeFile(masterPath, content);
  console.log("🎬 Master playlist generated.");
  return masterPath;
}

async function uploadToS3(folder) {
  const files = await fs.readdir(folder);
  for (const file of files) {
    const filePath = path.join(folder, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await uploadToS3(filePath); // recursive upload
    } else {
      const fileStream = createReadStream(filePath);
      const s3Key = path.relative("output", filePath).replace(/\\/g, "/");
      const ext = path.extname(filePath);

      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: `${key}5/${s3Key}`,
          Body: fileStream,
          ContentType:
            ext === ".m3u8"
              ? "application/vnd.apple.mpegurl"
              : ext === ".ts"
              ? "video/MP2T"
              : "application/octet-stream",
        })
      );

      console.log(`☁️ Uploaded: ${s3Key}`);
    }
  }
}

(async () => {
  try {
    const originalPath = path.join("output", "original.mp4");

    await downloadOriginalVideo(originalPath);
    const variants = await generateVariants(originalPath);
    await generateMasterPlaylist(variants);
    await uploadToS3("output");

    console.log("✅ ABR encoding & upload complete.");
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
