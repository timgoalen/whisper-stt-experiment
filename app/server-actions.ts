"use server";

import OpenAI from "openai";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// Function to convert a base64 string to a Blob
function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

// Example plain object
const plainObject = {
  type: "audio/webm",
  data: "data:audio/webm;base64,...",
};

export async function transcribe(plainObject) {
  // Convert the base64 string back to a Blob
  const webmBlob = base64ToBlob(plainObject.data, plainObject.type);

  // Create a URL for the Blob
  // audioElement.src = url;
  const url = URL.createObjectURL(webmBlob);

  const openai = new OpenAI({ apiKey });

  const transcription = await openai.audio.transcriptions.create({
    file: webmBlob,
    model: "whisper-1",
  });

  return transcription.text;
}
