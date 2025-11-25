import express from "express";
import { getAudioStreamUrl } from "../services/pipedService.js";
import { transcreverDeepgram } from "../services/deepgramService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL é obrigatória" });

    const audioUrl = await getAudioStreamUrl(url);
    const transcript = await transcreverDeepgram(audioUrl);

    return res.json({ success: true, transcript });
  } catch (err) {
    console.error("❌ ERRO:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
