/**
 * @file Override the Next.js Document component. We're only doing this
 * to setup the Emotion critical CSS, so I'm not loving all of this.
 */
import Document, {
  DocumentInitialProps,
  Head,
  Main,
  NextScript,
} from "next/document";
import React from "react";
import { extractCritical } from "@emotion/server";

interface StyledDocumentProps {
  ids: Array<string>;
  css: string;
}

export default class MyDocument extends Document<StyledDocumentProps> {
  static getInitialProps({ renderPage }): Promise<DocumentInitialProps> {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  render(): JSX.Element {
    return (
      <html lang="en-US">
        <Head>
          <meta
            name="description"
            content="Only Tweets with links, from accounts I follow."
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/app-icon.png" />
          <meta name="apple-mobile-web-app-title" content="Tweet Links" />

          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
