/**
 * @file Override the Next.js Document component. We're only doing this
 * to setup the Emotion critical CSS, so I'm not loving all of this.
 */
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import { extractCritical } from "@emotion/server";

interface StyledDocumentProps {
  ids: Array<string>;
  css: string;
}

export default class MyDocument extends Document<StyledDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(page.html);

    return { ...initialProps, ...page, ...styles };
  }

  render(): JSX.Element {
    return (
      <Html lang="en-US">
        <Head>
          <meta
            name="description"
            content="Only Tweets with links, from accounts I follow."
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/app-icon.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
