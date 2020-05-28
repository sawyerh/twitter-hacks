/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
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
    const url = new URL(`${apiRoot}/api/tweets`);

    if (lastId) {
      url.search = new URLSearchParams({ lastId }).toString();
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
      <TweetsList tweets={tweets} />
      {isLoading && <LoadingIcon />}
      {!isLoading && (
        <div css={{ textAlign: "center" }}>
          <button
            css={{
              appearance: "none",
              background: theme.colors.blue,
              border: 0,
              borderRadius: 3,
              color: theme.colors.white,
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSizes.small,
              fontWeight: "bold",
              padding: theme.spacer,

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
