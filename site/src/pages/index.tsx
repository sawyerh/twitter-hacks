import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import LoadingIcon from "../components/LoadingIcon";
import LoadMoreButton from "../components/LoadMoreButton";
import RefreshButton from "../components/RefreshButton";
import TweetsList from "../components/TweetsList";

// Hack to allow us to run the Firebase Hosting emulator on a separate port from the Next.js server.
const apiRoot =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

function Index(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const apiUrl = `${apiRoot}/api/tweets`;

  const getTweets = async () => {
    setIsLoading(true);
    const scrollY = window.scrollY;
    const url = nextPage ? nextPage : apiUrl;
    const response = await fetch(url.toString());
    const body = await response.json();
    const lastId = body.length ? body[body.length - 1].id_str : null;

    setTweets(tweets.concat(body));
    setIsLoading(false);

    if (lastId) setNextPage(`${apiUrl}?lastId=${lastId}`);

    window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    getTweets();
  }, []);

  function loadNextPage() {
    getTweets();
  }

  return (
    <main>
      <Head>
        <title>Tweets with links</title>
        <link rel="preload" href={apiUrl} as="fetch" type="application/json" />

        {nextPage && (
          <link rel="prefetch" href={nextPage} type="application/json" />
        )}
      </Head>

      {!isLoading && <RefreshButton />}
      <TweetsList tweets={tweets} />
      {isLoading && <LoadingIcon />}
      {!isLoading && <LoadMoreButton onClick={loadNextPage} />}
    </main>
  );
}

export default Index;
