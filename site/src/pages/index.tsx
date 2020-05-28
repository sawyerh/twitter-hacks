import { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon";
import React from "react";
import TweetsList from "../components/TweetsList";

// Hack to allow us to run the Firebase Hosting emulator on a separate port from the Next.js server.
const apiRoot =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

function Index(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const response = await fetch(`${apiRoot}/api/tweets`);
    const body = await response.json();

    console.log(body);

    setTweets(body);
    setIsLoading(false);
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <main>{isLoading ? <LoadingIcon /> : <TweetsList tweets={tweets} />}</main>
  );
}

export default Index;
