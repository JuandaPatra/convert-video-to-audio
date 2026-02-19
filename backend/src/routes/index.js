const express = require('express');
const path = require('path');
const { upload } = require("../middleware/multer");

const { convertVideoToAudioController, progressController, downloadController } = require("../controllers/convertController");

const route = express.Router();


route.post('/', upload.single('video'),  convertVideoToAudioController);
route.get("/progress/:jobId", progressController);

route.get("/download/:jobId", downloadController);

module.exports = route;