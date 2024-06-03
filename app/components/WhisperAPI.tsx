import fs from "fs";
import path from "path";
import OpenAI from "openai";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const filePath = path.join(process.cwd(), "public", "disclaimer.mp3");

export default async function WhisperAPI() {
  const openai = new OpenAI({ apiKey });

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-1",
  });

  return (
    <>
      <h2>Hi from the server component</h2>
      <p>{transcription.text}</p>
    </>
  );
}
