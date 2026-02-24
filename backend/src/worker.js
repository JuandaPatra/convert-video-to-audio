const path = require("path");
const { spawn } = require("child_process");
const { setProgress, setOutput, setError } = require("./progress");

const queue = [];
let active = 0;
const MAX = 2;

function addJob(job) {
  queue.push(job);
  process();
}

function process() {
  if (active >= MAX) return;
  if (queue.length === 0) return;

  const job = queue.shift();

  active++;

  job().finally(() => {
    active--;
    process();
  });
}

function getDuration(input) {
  return new Promise((resolve) => {
    const ffprobe = spawn("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      input,
    ]);

    let output = "";

    ffprobe.stdout.on("data", (d) => (output += d));

    ffprobe.on("close", () => {
      resolve(parseFloat(output));
    });
  });
}

function convert(jobId, input, output) {
  addJob(async () => {
    const duration = await getDuration(input);

    return new Promise((resolve, reject) => {
      const ffmpeg = spawn(
        "ffmpeg",
        [
          "-i",
          input,
          "-vn",
          "-acodec",
          "libmp3lame",
          "-ab",
          "192k",
          "-y",
          output,
        ],
        {
          shell: true,
        },
      );

      ffmpeg.stderr.on("data", (data) => {
        console.error("FFmpeg:", data.toString());
      });

      ffmpeg.stdout.on("data", (data) => {
        const str = data.toString();

        const match = str.match(/out_time_ms=(\d+)/);

        if (match) {
          const ms = parseInt(match[1]);
          const progress = (ms / (duration * 1000000)) * 100;

          setProgress(jobId, Math.min(progress, 100));
        }
      });

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          setProgress(jobId, 100);
          setOutput(jobId, output);

          resolve();
        } else {
          console.log(jobId, "Conversion failed");
          // reject(new Error("FFmpeg failed with code " + code));
          setError(jobId, code);
        }
      });
    });
  });
}

module.exports = {
  convert,
};
