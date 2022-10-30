import Head from "next/head";
import { AwaitThenable } from "../components/AwaitThenable";
import { NoFloatingPromises } from "../components/NoFloatingPromises";
import { NoMisusedPromises } from "../components/NoMisusedPromises";
import styles from "../styles/Home.module.css";

function exampleActionSync() {
  document.body.style.backgroundColor = `rgb(${[
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255,
  ].join()})`;
}

async function exampleActionAsync() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  exampleActionSync();
}

async function exampleActionAsyncRisky() {
  if (Math.random() > 0.5) {
    throw new Error("Gotcha!");
  }

  await exampleActionAsync();
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript-ESLint React Demo</title>
        <meta
          name="description"
          content="Demo showing TypeScript-ESLint rules with React."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TypeScript-ESLint React Demo</h1>
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
        </ol>
      </main>
    </div>
  );
}
