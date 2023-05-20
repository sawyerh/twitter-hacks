import Head from "next/head";
import { jsx } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

interface TweetEmbedProps {
  id_str: string;
}

interface TwitterAPI {
  widgets: { createTweet: any };
}

declare let twttr: TwitterAPI;

function Tweet(props: TweetEmbedProps): JSX.Element {
  const { id_str } = props;
  const [isLoading, setLoading] = useState(true);
  const embedContainerRef = useRef();

  useEffect(() => {
    twttr.widgets
      .createTweet(id_str, embedContainerRef.current, {})
      .then(() => {
        setLoading(false);
      });
  }, [embedContainerRef.current]);

  return (
    <article
      css={{
        marginBottom: 16,
        textAlign: "center",
      }}
    >
      <Head>
        <script src="/twitter.js"></script>
      </Head>
      {isLoading && <p>Loading&hellip;</p>}
      <div ref={embedContainerRef} />
    </article>
  );
}

export default Tweet;
