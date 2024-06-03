"use client";

import Image from "next/image";
// import styles from "./page.module.css";

import WhisperUI from "./components/WhisperUI";
import WhisperAPI from "./components/WhisperAPI";
import { useState } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <main>
      {/* <WhisperAPI /> */}
      {isRecording && <WhisperUI />}

      <button onClick={() => setIsRecording(true)}>Start</button>
      <button onClick={() => setIsRecording(false)}>Stop</button>
    </main>
  );
}
