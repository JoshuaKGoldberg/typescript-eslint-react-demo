import Head from "next/head";
import { useState } from "react";
import { AwaitThenable } from "../components/AwaitThenable";
import { FixedPromises } from "../components/Fixed";
import { NoFloatingPromises } from "../components/NoFloatingPromises";
import { NoMisusedPromises } from "../components/NoMisusedPromises";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [customColor, setCustomColor] = useState<string>();

  function exampleActionSync() {
    const color = `rgb(${[
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
    ].join(", ")})`;

    setCustomColor(color);

    return color;
  }

  async function exampleActionAsync() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    exampleActionSync();
  }

  async function exampleActionAsyncRisky() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const color = exampleActionSync();

    if (Math.random() > 0.5) {
      throw new Error(`Gotcha: ${color}!`);
    }
  }
  return (
    <>
      <Head>
        <title>TypeScript-ESLint React Demo</title>
        <meta
          name="description"
          content="Demo showing TypeScript-ESLint rules with React."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={{ background: customColor }}>
        <div className={styles.contents}>
          <h1 className={styles.title}>TypeScript-ESLint React Demo</h1>
          <p aria-live="assertive">Custom color: {customColor ?? "(none)"}</p>
          <ol>
            <li>
              <AwaitThenable action={exampleActionSync}>
                Violate <code>await-thenable</code>
              </AwaitThenable>
            </li>
            <li>
              <NoFloatingPromises action={exampleActionAsync}>
                Violate <code>no-floating-promises</code>
              </NoFloatingPromises>
            </li>
            <li>
              <NoMisusedPromises action={exampleActionAsyncRisky}>
                Violate <code>no-misused-promises</code>
              </NoMisusedPromises>
            </li>
            <li>
              <FixedPromises action={exampleActionAsyncRisky}>
                This may fail, safely
              </FixedPromises>
            </li>
          </ol>
        </div>
      </main>
    </>
  );
}
