import Image from "next/image";
// import styles from "./page.module.css";

import WhisperUI from "./components/WhisperUI";
import WhisperAPI from "./components/WhisperAPI";

export default function Home() {
  return (
    <main>
      <WhisperAPI />
      {/* <WhisperUI /> */}
    </main>
  );
}
