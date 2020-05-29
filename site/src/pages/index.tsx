/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import LoadingIcon from "../components/LoadingIcon";
import TweetsList from "../components/TweetsList";
import theme from "../theme";

// Hack to allow us to run the Firebase Hosting emulator on a separate port from the Next.js server.
const apiRoot =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

function Index(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  const getTweets = async (lastId?: string) => {
    setIsLoading(true);
    const scrollY = window.scrollY;
    let url = `${apiRoot}/api/tweets`;

    if (lastId) {
      url = `${url}?lastId=${lastId}`;
    }

    const response = await fetch(url.toString());
    const body = await response.json();

    setTweets(tweets.concat(body));
    setIsLoading(false);
    window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    getTweets();
  }, []);

  function handleNextPageClick() {
    getTweets(tweets[tweets.length - 1].id_str);
  }

  return (
    <main>
      <Head>
        <title>Tweets with links, for @sawyerh</title>
      </Head>
      <TweetsList tweets={tweets} />
      {isLoading && <LoadingIcon />}
      {!isLoading && (
        <div
          css={{
            /**
             * Add extra spacing towards bottom to address weird iOS behavior where it
             * shows the browser chrome when you tap the button because it's so close
             * to the bottom of the screen
             */
            marginBottom: theme.spacer * 8,
            textAlign: "center",
          }}
        >
          <button
            css={{
              appearance: "none",
              background: theme.colors.blue,
              border: 0,
              borderRadius: 3,
              color: theme.colors.white,
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSizes.body,
              fontWeight: "bold",
              padding: theme.spacer * 2,
              width: "100%",

              ":hover": {
                background: theme.colors.darkBlue,
              },
            }}
            onClick={handleNextPageClick}
            type="button"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  );
}

export default Index;
