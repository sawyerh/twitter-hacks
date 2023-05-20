import { Global } from "@emotion/react";
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
            background: theme.colors.darkerBlue,
            color: theme.colors.gray,
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSizes.body,
            lineHeight: 1.5,
          },
          a: {
            color: theme.colors.blue,
          },
          button: {
            appearance: "none",
            backgroundColor: theme.colors.blue,
            border: 0,
            color: theme.colors.white,
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSizes.body,
            lineHeight: 1,

            ":hover": {
              background: theme.colors.darkBlue,
            },
          },
        }}
      />
      <Component {...pageProps} />
    </main>
  );
}
