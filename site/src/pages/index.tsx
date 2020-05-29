import { useEffect, useState } from "react";
import Head from "next/head";
import LoadingIcon from "../components/LoadingIcon";
import LoadMoreButton from "../components/LoadMoreButton";
import React from "react";
import TweetsList from "../components/TweetsList";

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

  function loadNextPage() {
    getTweets(tweets[tweets.length - 1].id_str);
  }

  return (
    <main>
      <Head>
        <title>Tweets with links, for @sawyerh</title>
      </Head>
      <TweetsList tweets={tweets} />
      {isLoading && <LoadingIcon />}
      {!isLoading && <LoadMoreButton onClick={loadNextPage} />}
    </main>
  );
}

export default Index;
