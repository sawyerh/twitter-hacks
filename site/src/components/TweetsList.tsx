import React from "react";
import Tweet from "./Tweet";

function TweetsList({ tweets }): JSX.Element {
  return tweets.map((tweet) => <Tweet key={tweet.id_str} {...tweet} />);
}

export default TweetsList;
