const express = require("express");
const router = express.Router();
const { baixarAudioYoutube } = require("../services/youtubeService");
const { transcreverDeepgram } = require("../services/deepgramService");

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "YouTube URL é obrigatória" });
    }

    const audioPath = await baixarAudioYoutube(url);
    const transcript = await transcreverDeepgram(audioPath);

    return res.json({
      success: true,
      transcript,
    });
  } catch (err) {
    console.error("❌ ERRO:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;