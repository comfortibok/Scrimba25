"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "./globals.css";
import { useState } from "react";
import { translateText } from "./index.js";

export default function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("french");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTranslation("");
    try {
      const result = await translateText(text, language);
      setTranslation(result);
      setText(""); 
    } catch (err) {
      setError("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.appWrapper}>
      <header>
        <div>
          <h1>PollyGlot</h1>
          <p>Perfect Translation Every Time</p>
        </div>
        <Image src="/parrot.png" alt="PollyGlot Logo" width={95} height={85} />
      </header>

      <main>
        <h2>Text to translate 👇</h2>
        <form id="translation-form" onSubmit={handleSubmit}>
          <textarea
            name="question"
            aria-label="How are you?"
            placeholder="How are you?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>

          <h2>Select language 👇</h2>
          <section className={styles.radioSection}>
            <div className={styles.radioInput}>
              <label htmlFor="french">French </label>
              <input
                type="radio"
                name="language"
                value="french"
                id="french"
                checked={language === "french"}
                onChange={() => setLanguage("french")}
              />
              <Image
                src="/fr-flag.png"
                alt="French flag"
                width={30}
                height={20}
              />
            </div>

            <div className={styles.radioInput}>
              <label htmlFor="spanish">Spanish </label>
              <input
                type="radio"
                name="language"
                value="spanish"
                id="spanish"
                checked={language === "spanish"}
                onChange={() => setLanguage("spanish")}
              />
              <Image
                src="/sp-flag.png"
                alt="Spanish flag"
                width={30}
                height={20}
              />
            </div>

            <div className={styles.radioInput}>
              <label htmlFor="japanese">Japanese</label>
              <input
                type="radio"
                name="language"
                value="japanese"
                id="japanese"
                checked={language === "japanese"}
                onChange={() => setLanguage("japanese")}
              />
              <Image
                src="/jpn-flag.png"
                alt="Japanese flag"
                width={30}
                height={20}
              />
            </div>
          </section>

          <button
            type="submit"
            aria-label="Translate selected language"
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {translation && (
          <div className={styles.translationResult}>
            <h3>Translation:{translation}</h3>
          </div>
        )}
      </main>
    </div>
  );
}
