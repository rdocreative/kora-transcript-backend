import { createClient } from "@deepgram/sdk";

export async function transcreverDeepgram(audioUrl) {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) throw new Error("DEEPGRAM_API_KEY não configurada.");

  const deepgram = createClient(apiKey);

  const response = await deepgram.listen.prerecorded.transcribeUrl(
    audioUrl,
    {
      model: "nova-3",
      smart_format: true,
      language: "pt"
    }
  );

  return (
    response.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
    "(nenhum texto encontrado)"
  );
}
