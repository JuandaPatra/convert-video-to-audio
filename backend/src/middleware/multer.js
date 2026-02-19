const multer = require("multer");
const path = require("path");
const multerConfig = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../uploads"));
  },

  filename: function (req, file, cb) {

    const ext = path.extname(file.originalname);

    const filename = Date.now() + ext;

    cb(null, filename);

  },

});

const upload = multer({ storage: multerConfig });

module.exports = {
  upload,
  multerConfig
};