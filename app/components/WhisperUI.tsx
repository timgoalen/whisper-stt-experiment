"use client";

import { transcribe } from "../server-actions";

async function initRecorder() {
  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function convertBlobToObject(blob: Blob) {
    const base64String = await blobToBase64(blob);
    const plainObject = {
      type: blob.type,
      data: base64String,
    };
    return plainObject;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    const mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
      console.log("chunks", chunks);
    };

    mediaRecorder.onstop = () => {
      // NOTE: saves file as WebM, check Whisper can read it...
      const blob = new Blob(chunks, { type: "audio/webm" });

      convertBlobToObject(blob).then((plainObject) => {
        console.log("plainObject:", plainObject);
        const text = transcribe(plainObject);
        // Example output:
        // {
        //   type: "audio/webm",
        //   data: "data:audio/webm;base64,..."
        // }
      });

      const url = URL.createObjectURL(blob);

      // const text = transcribe(url);
      // console.log("whisper:", text)
      // const text = transcribe(blob);
      
      // console.log(text);

      // Play the recorded audio
      const audio = document.createElement("audio");
      audio.src = url;
      document.body.appendChild(audio);
      audio.play();
    };

    // Start recording
    mediaRecorder.start();

    // Stop recording after 5 seconds
    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);
  } catch (err) {
    console.error("Error accessing media devices:", err);
  }
}

initRecorder();

export default function Whisper() {
  // async function recordMediaStream() {
  //   console.log("recording");

  //   function stopRecorder() {
  //     mediaRecorder.stop();
  //   }
  // }
  return (
    <>
      <h1>Whisper recording</h1>
      {/* <button onClick={recordMediaStream}>Record</button> */}
      {/* <button onClick={stopRecorder}>Stop</button> */}
    </>
  );
}
