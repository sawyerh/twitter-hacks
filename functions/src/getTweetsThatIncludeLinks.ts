import * as functions from "firebase-functions";
import Twitter = require("twitter");

const twitter = new Twitter({
  consumer_key: functions.config().twitter.consumer_key || "",
  consumer_secret: functions.config().twitter.consumer_secret || "",
  access_token_key: functions.config().twitter.access_token_key || "",
  access_token_secret: functions.config().twitter.access_token_secret || "",
});

/**
 * Get latest tweets from the people I follow
 * @param since_id - Return results with an ID greater than (that is, more recent than) the specified ID.
 */
function getLatestTweets(since_id?: number): Promise<Twitter.Tweet[]> {
  return twitter.get("statuses/home_timeline", {
    since_id,
    count: 200,
    // Include replies because some people include a link in a follow-up in their threads
    exclude_replies: false,
    include_entities: true,
    trim_user: false,
    // Prevent truncation, which messes up which URL entities are returned
    tweet_mode: "extended",
  });
}

/**
 * Get latest tweets from the people I follow, returning
 * only those that include at least one external link
 * @param since_id - Return results with an ID greater than (that is, more recent than) the specified ID.
 */
async function getTweetsThatIncludeLinks(
  since_id?: number
): Promise<Twitter.Tweet[]> {
  const tweets = await getLatestTweets(since_id);
  const tweetURLRegex = RegExp(/^https:\/\/twitter.com/);

  return tweets.filter((tweet): boolean => {
    let { urls } = tweet.entities;

    // Exclude Twitter URLs which are used for quoted tweets and threads
    if (tweet.is_quote_status) {
      urls = urls.filter(
        (url): boolean => !tweetURLRegex.test(url.expanded_url)
      );
    }

    return !!urls.length;
  });
}

export default getTweetsThatIncludeLinks;
