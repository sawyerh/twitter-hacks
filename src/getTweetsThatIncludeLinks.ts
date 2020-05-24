import Twitter, { Tweet } from "twitter";

const twitter = new Twitter({
  consumer_key: process.env["CONSUMER_KEY"],
  consumer_secret: process.env["CONSUMER_SECRET"],
  access_token_key: process.env["ACCESS_TOKEN_KEY"],
  access_token_secret: process.env["ACCESS_TOKEN_SECRET"],
});

function getLatestTweets(): Promise<Tweet[]> {
  return twitter.get("statuses/home_timeline", {
    exclude_replies: true,
    include_entities: true,
    trim_user: false,
  });
}

async function getTweetsThatIncludeLinks(): Promise<Tweet[]> {
  const tweets = await getLatestTweets();

  return tweets.filter((tweet): boolean => {
    let { urls } = tweet.entities;

    urls = urls.filter((url): boolean => {
      // Exclude tweets that just quote another tweet
      return !url.expanded_url.match(/https:\/\/twitter\.com\/\S+\/status/);
    });

    return !!urls.length;
  });
}

export default getTweetsThatIncludeLinks;
