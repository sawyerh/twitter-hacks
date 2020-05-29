/** @jsx jsx */
import { Global, jsx } from "@emotion/react";
import theme from "../theme";

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <main
      css={{
        maxWidth: "55ch",
        margin: `${theme.spacer * 4}px auto`,
      }}
    >
      <Global
        styles={{
          body: {
            background: theme.colors.lighterGray,
            color: theme.colors.gray,
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSizes.body,
            lineHeight: 1.5,
          },
          a: {
            color: theme.colors.blue,
          },
        }}
      />
      <Component {...pageProps} />
    </main>
  );
}
