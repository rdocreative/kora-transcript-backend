const ytdl = require("yt-dlp-exec");
const path = require("path");

async function baixarAudioYoutube(url) {
  const output = path.join("/tmp", "audio.mp3");

  await ytdl(url, {
    format: "bestaudio",
    extractAudio: true,
    audioFormat: "mp3",
    audioQuality: "0",
    output,
    quiet: true,
  });

  console.log("🎧 Áudio baixado:", output);
  return output;
}

module.exports = { baixarAudioYoutube };