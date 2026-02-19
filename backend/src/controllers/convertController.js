const path = require("path");
const { convertVideoToAudio } = require("../service/ffmpeg");
 const convertVideoToAudioController =  async (req, res) => {
    try{
        // Logic to convert video to audio
        const input = req.file.path;
        const outputsDir = path.resolve(__dirname, "../../outputs");
        const output = path.join(outputsDir, req.file.filename + ".mp3");
        await convertVideoToAudio(input, output);
        res.download(output, (err) => {
            if (err) {
                console.error("Error sending file:", err);
            }
        });

    }catch(error){
        res.status(500).json({ error: error.message });
    }

    

}

module.exports = {
    convertVideoToAudioController
}