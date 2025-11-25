export async function getAudioStreamUrl(youtubeUrl) {
  const id = youtubeUrl.includes("v=")
    ? youtubeUrl.split("v=")[1].split("&")[0]
    : youtubeUrl.split("/").pop();

  const apiUrl = `https://piped.video/streams/${id}`;

  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Falha ao acessar Piped API");

  const data = await response.json();
  if (!data.audioStreams || data.audioStreams.length === 0)
    throw new Error("Nenhum áudio disponível");

  return data.audioStreams[0].url;
}
