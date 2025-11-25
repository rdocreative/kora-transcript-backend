const { createClient } = require("@deepgram/sdk");
const ytdl = require("yt-dlp-exec");
const fs = require("fs");
const path = require("path");

const DEEPGRAM_API_KEY = "1c108d5d19fae95aaaf1a0ae0d906a48f02de69a"; // gere outra key no console

async function extrairAudioYoutube(url) {
  console.log("🎬 URL recebida:", url);
  console.log("🔍 Extraindo áudio do YouTube...");

  const output = "audio.mp3";

  await ytdl(url, {
    format: "bestaudio",
    extractAudio: true,
    audioFormat: "mp3",
    audioQuality: "0",
    output,
    quiet: false,
  });

  console.log("🎧 Áudio extraído:", output);
  return output;
}

async function transcreverComDeepgram(audioPath) {
  console.log("🧠 Enviando para Deepgram (modelo público)...");

  const deepgram = createClient(DEEPGRAM_API_KEY);
  const audioBuffer = fs.readFileSync(audioPath);

  const response = await deepgram.listen.prerecorded.transcribeFile(
    audioBuffer,
    {
      model: "nova-3",
      language: "pt",
      smart_format: true,
      utterances: true,
    }
  );

  // Se quiser ver o JSON inteiro, descomenta:
  // console.dir(response, { depth: null });

  const transcript =
    response.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
    response.result?.results?.utterances?.map(u => u.transcript).join(" ") ||
    "(nenhum texto retornado)";

  return transcript;
}

async function transcreverYoutube(url) {
  try {
    const audioFile = await extrairAudioYoutube(url);
    const transcricao = await transcreverComDeepgram(audioFile);

    console.log("\n📄 TRANSCRIÇÃO FINAL:\n");
    console.log(transcricao);

    // ✅ criar pasta transcripts se não existir
    const outDir = path.join(__dirname, "transcripts");
    fs.mkdirSync(outDir, { recursive: true });

    // ✅ criar arquivo test1.txt e salvar tudo
    const outPath = path.join(outDir, "test1.txt");
    fs.writeFileSync(outPath, transcricao, "utf8");

    console.log(`\n✅ Transcrição salva em: ${outPath}\n`);
  } catch (e) {
    console.error("\n❌ ERRO GERAL:", e);
  }
}

const video = "https://youtu.be/P8ZSrn849oM?si=UHvw85U9feLPEPQ7";
transcreverYoutube(video);