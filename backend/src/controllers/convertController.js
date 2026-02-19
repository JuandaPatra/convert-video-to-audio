const crypto = require("crypto");
const path = require("path");
const { getDuration, convert } = require("../worker");
const { setProgress, setOutput, getProgress, getOutput } = require("../progress");
const { convertVideoToAudio } = require("../service/ffmpeg");

const convertVideoToAudioController = async (req, res) => {
  try {
    // Logic to convert video to audio
    const input = path.resolve(req.file.path);
    console.log("Received file:", input);
    const outputsDir = path.resolve(__dirname, "../../outputs", path.parse(req.file.filename).name + ".mp3");
    console.log("Outputs directory:", outputsDir);

    const jobId = crypto.randomUUID();

    convert(jobId, input, outputsDir);

    res.json({ jobId });

    // const output = path.join(outputsDir, req.file.filename + ".mp3");
    // await convertVideoToAudio(input, output);
    // res.download(output, (err) => {
    //     if (err) {
    //         console.error("Error sending file:", err);
    //     }
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const progressController = (req, res) => {
  const jobId = req.params.jobId;

  const progress = getProgress(jobId);

  res.json({
    jobId,
    progress,
  });
};

const downloadController = (req, res) => {
  const jobId = req.params.jobId;
  const output = getOutput(jobId);
  if (!output) {
    return res.status(404).json({ error: "File not found" });
  }
  res.download(output);
};

module.exports = {
  convertVideoToAudioController,
  progressController,
  downloadController,
};
