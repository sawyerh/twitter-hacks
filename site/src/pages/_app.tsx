import "../styles.css";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import React from "react";

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <main className="wrapper">
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </main>
  );
}
