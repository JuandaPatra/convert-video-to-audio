const progressMap = new Map();
const outputMap = new Map();

function setProgress(jobId, progress) {
  progressMap.set(jobId, progress);
}

function getProgress(jobId) {
  return progressMap.get(jobId) || 0;
}

function setOutput(jobId, path) {
  outputMap.set(jobId, path);
}

function getOutput(jobId) {
  return outputMap.get(jobId);
}

function deleteJob(jobId) {
  progressMap.delete(jobId);
  outputMap.delete(jobId);
}

function setError(jobId, error){
  progressMap.set(jobId, -1);
  outputMap.set(jobId, error);
}

module.exports = {
  setProgress,
  getProgress,
  setOutput,
  getOutput,
  deleteJob,
  setError
};
