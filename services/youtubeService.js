const ytdl = require("yt-dlp-exec");
const path = require("path");

async function baixarAudioYoutube(url) {
  const output = path.join("/tmp", "audio.mp3");
  const cookies = path.join(__dirname, "..", "cookies.txt");

  await ytdl(url, {
    format: "bestaudio",
    extractAudio: true,
    audioFormat: "mp3",
    audioQuality: "0",
    output,
    quiet: true,
    cookies: cookies
  });

  console.log("🎧 Áudio baixado com cookies:", output);
  return output;
}

module.exports = { baixarAudioYoutube };
