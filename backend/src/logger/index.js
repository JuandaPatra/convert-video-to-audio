const pino = require("pino");
const fs = require("fs");
const path = require("path");

const logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = pino({
    level : process.env.LOG_LEVEL || "info",
    timestamp : pino.stdTimeFunctions.isoTime,
    base : {
        service : "video-to-audio-app",
        env : process.env.NODE_ENV || "development"
    }
}, pino.destination({
    dest : path.join(logDir, "app.log"),
    sync : false
}));

module.exports = logger;