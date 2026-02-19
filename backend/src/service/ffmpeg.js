const { spawn } = require("child_process");

function convertVideoToAudio(input, output) {
  return new Promise((resolve, reject) => {

    const ffmpeg = spawn("ffmpeg", [
      "-i",
      input,
      "-vn",
      "-acodec",
      "libmp3lame",
      output
    ]);

    // TAMBAHKAN INI
    ffmpeg.stderr.on("data", (data) => {
      console.log("FFmpeg stderr:", data.toString());
    });

    ffmpeg.on("close", (code) => {
      console.log("FFmpeg exit code:", code);

      if (code === 0) resolve();
      else reject(new Error("FFmpeg failed"));
    });

  });
}

module.exports = { convertVideoToAudio };
