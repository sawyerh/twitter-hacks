/** @jsx jsx */
import { CacheProvider, Global, jsx } from "@emotion/react";
import { cache } from "@emotion/css";
import theme from "../theme";

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <main
      css={{
        maxWidth: "55ch",
        margin: `${theme.spacer & 6} auto`,
      }}
    >
      <Global
        styles={{
          body: {
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSizes.body,
            lineHeight: 1.5,
          },
          a: {
            color: theme.colors.blue,
          },
        }}
      />
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </main>
  );
}
