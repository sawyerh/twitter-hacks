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
      <html>
        <Head>
          <title>Tweets with links, for @sawyerh</title>
          <meta
            name="description"
            content="Only Tweets with links, from accounts followed by @sawyerh"
          />
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
