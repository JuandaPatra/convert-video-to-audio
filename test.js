import { spawn } from "child_process";

const ffmpeg = spawn("ffmpeg", ["-version"]);

ffmpeg.stdout.on("data", data => {
  console.log(data.toString());
});
