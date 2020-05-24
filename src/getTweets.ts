import Twitter = require("twitter");

/**
 * Configure Twitter client
 */
const config = {
  consumer_key: process.env["CONSUMER_KEY"],
  consumer_secret: process.env["CONSUMER_SECRET"],
  access_token_key: process.env["ACCESS_TOKEN_KEY"],
  access_token_secret: process.env["ACCESS_TOKEN_SECRET"],
};
const client = new Twitter(config);

function getLatestTweets(): Promise<Twitter.Tweet[]> {
  return client.get("statuses/home_timeline", {
    exclude_replies: true,
    include_entities: true,
    trim_user: false,
  });
}

async function getTweetsWithLinks(): Promise<Twitter.Tweet[]> {
  const tweets = await getLatestTweets();

  return tweets.filter((tweet): boolean => !!tweet.entities.urls.length);
}

async function run(): Promise<void> {
  try {
    const tweets = await getTweetsWithLinks();

    tweets.forEach((tweet) => {
      console.log(JSON.stringify(tweet, null, 4));
    });
  } catch (error) {
    console.error(error);
  }
}

run();
