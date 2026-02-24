const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const { getDuration, convert } = require("../worker");
const {
  setProgress,
  setOutput,
  getProgress,
  getOutput,
} = require("../progress");
const { convertVideoToAudio } = require("../service/ffmpeg");

const logger = require("../logger");

const convertVideoToAudioController = async (req, res) => {
  try {
    // Logic to convert video to audio
    const input = path.resolve(req.file.path);
    // console.log("Received file:", input);
    const outputsDir = path.resolve(__dirname, "../../outputs");
    if (!fs.existsSync(outputsDir)) {
      fs.mkdirSync(outputsDir, { recursive: true });
      logger.info(`Created outputs directory at ${outputsDir}`);
    }
    // const outputsDir = path.resolve(__dirname, "../../outputs", path.parse(req.file.filename).name + ".mp3");
    // console.log("Outputs directory:", outputsDir);
    const output = path.join(outputsDir, path.parse(req.file.filename).name + ".mp3");
    // console.log("Final output path:", output);

    const jobId = crypto.randomUUID();
    logger.info(`Starting conversion for job ${jobId} with input ${input} and output ${output}`);

    convert(jobId, input, output);
    logger.info(`Conversion job ${jobId} started successfully`);

    res.json({ jobId });

  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(`Error in convertVideoToAudioController: ${error.message}`);
  }
};

const progressController = (req, res) => {
  const jobId = req.params.jobId;
  const progress = getProgress(jobId);

  if(!jobId || progress == -1){
    logger.warn(`Progress requested for non-existent job ${jobId}`);
    return res.status(404).json({ error: "Job not found" });
  }


  logger.info(`Progress for job ${jobId}: ${progress}%`);
  res.json({
    jobId,
    progress,
  });
};

const downloadController = (req, res) => {
  const jobId = req.params.jobId;
  const output = getOutput(jobId);
  if (!output) {
    logger.warn(`Download requested for non-existent job ${jobId}`);
    return res.status(404).json({ error: "File not found" });
  }
  res.download(output);
  logger.info(`File for job ${jobId} downloaded successfully`);
};

module.exports = {
  convertVideoToAudioController,
  progressController,
  downloadController,
};
