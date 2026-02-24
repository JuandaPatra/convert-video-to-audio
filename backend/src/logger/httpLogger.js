const crypto = require("crypto");

module.exports = function requestMiddleware(req,res,next){
    const requestId = crypto.randomUUID();
    req.requestId = requestId;
    next();
}