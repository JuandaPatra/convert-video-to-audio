const express = require('express');
const path = require('path');
const multer = require('multer');

const { convertVideoToAudioController } = require("../controllers/convertController");

const route = express.Router();
const upload = multer({
    dest: "uploads/"
});


route.post('/', upload.single('video'),  convertVideoToAudioController);

module.exports = route;