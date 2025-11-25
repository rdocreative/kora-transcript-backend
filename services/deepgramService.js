const { createClient } = require("@deepgram/sdk");
const fs = require("fs");

async function transcreverDeepgram(audioPath) {
  const apiKey = process.env.DEEPGRAM_API_KEY;

  if (!apiKey) {
    throw new Error("A chave DEEPGRAM_API_KEY não está configurada.");
  }

  const deepgram = createClient(apiKey);
  const audioBuffer = fs.readFileSync(audioPath);

  const response = await deepgram.listen.prerecorded.transcribeFile(audioBuffer, {
    model: "nova-3",
    smart_format: true,
    language: "pt",
  });

  return (
    response.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
    "(nenhum texto encontrado)"
  );
}

module.exports = { transcreverDeepgram };