import React from "react";
// Use TweetEmbed instead of Tweet to debug what the tweet looks like in Twitter
// import TweetEmbed from "./TweetEmbed";
import Tweet from "./Tweet";

function TweetsList({ tweets }): JSX.Element {
  return tweets.map((tweet) => <Tweet key={tweet.id_str} {...tweet} />);
}

export default TweetsList;
