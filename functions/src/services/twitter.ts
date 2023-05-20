/**
 * @file Twitter API methods
 */
import * as functions from "firebase-functions";
import { DateTime } from "luxon";
import Twitter = require("twitter");
import { writeLog } from "./logger";
import tweetsToSaveForever from "../tweets-to-save";

const twitter = new Twitter({
  consumer_key: functions.config().twitter.consumer_key || "",
  consumer_secret: functions.config().twitter.consumer_secret || "",
  access_token_key: functions.config().twitter.access_token_key || "",
  access_token_secret: functions.config().twitter.access_token_secret || "",
});

const username = functions.config().twitter.username || "";
const maxCount = 200;
// anything older than this is deleted
const oldestAllowedDate = DateTime.local().minus({ days: 14 }).toISO();

/**
 * Get latest tweets from the people I follow
 * @param since_id - Return results with an ID greater than (that is, more recent than) the specified ID.
 */
async function getLatestTweets(since_id?: string): Promise<Twitter.Tweet[]> {
  const tweets = await twitter.get("statuses/home_timeline", {
    since_id,
    count: 200,
    // Include replies because some people include a link in a follow-up in their threads
    exclude_replies: false,
    include_entities: true,
    trim_user: false,
    // Prevent truncation, which messes up which URL entities are returned
    tweet_mode: "extended",
  });

  writeLog("getLatestTweets", `Received ${tweets.length} tweets`, {
    count: tweets.length,
    since_id,
  });

  return tweets.map((tweet): Twitter.Tweet => {
    // Store a JS date so we can query/sort database records by this timestamp
    tweet.created_at_timestamp = new Date(tweet.created_at);
    return tweet;
  });
}

/**
 * Get latest tweets from the people I follow, returning
 * only those that include at least one external link
 * @param since_id - Return results with an ID greater than (that is, more recent than) the specified ID.
 */
export async function getTweetsThatIncludeLinks(
  since_id?: string
): Promise<Twitter.Tweet[]> {
  const tweets = await getLatestTweets(since_id);
  const tweetURLRegex = RegExp(/^https:\/\/twitter.com/);

  const tweetsWithLinks = tweets.filter((tweet): boolean => {
    let { urls } = tweet.entities;

    // Exclude Twitter URLs which are used for quoted tweets and threads
    if (tweet.is_quote_status) {
      urls = urls.filter(
        (url): boolean => !tweetURLRegex.test(url.expanded_url)
      );
    }

    return !!urls.length;
  });

  writeLog(
    "getTweetsThatIncludeLinks",
    `Found ${tweetsWithLinks.length} tweets with links`,
    {
      count: tweetsWithLinks.length,
    }
  );

  return tweetsWithLinks;
}

/**
 * Get all of {username}'s tweets and retweets
 * @param maxId - Returns results with an ID less than (that is, older than) or equal to the specified ID.
 */
async function getAllTweets(maxId?: string | number): Promise<Twitter.Tweet[]> {
  const params = {
    count: maxCount,
    screen_name: username,
    trim_user: true,
    max_id: maxId,
  };
  let tweets = await twitter.get("statuses/user_timeline", params);

  if (tweets.length) {
    // Make another request to ensure we get every single tweet
    const lastTweetId = tweets[tweets.length - 1].id;
    const nextPagesTweets = await getAllTweets(lastTweetId);
    if (nextPagesTweets.length) tweets = tweets.concat(nextPagesTweets);
  }

  return tweets;
}

/**
 * Get the latest 200 of {username}'s likes
 */
async function getLikes() {
  return twitter.get("favorites/list", {
    count: maxCount,
    include_entities: false,
  });
}

/**
 * Delete all tweets not safelisted and older than the max age
 * TODO: Create unit test for this
 */
export async function deleteTweets(): Promise<void> {
  writeLog("deleteTweets", "Deleting tweets...", { oldestAllowedDate });
  if (!oldestAllowedDate) throw new Error("oldestAllowedDate was null");

  if (!tweetsToSaveForever || tweetsToSaveForever.length === 0) {
    throw new Error("No tweets to save forever, this seems wrong.");
  }

  const tweets = await getAllTweets();
  const deletableTweets = tweets.filter(
    (tweet) =>
      !tweetsToSaveForever.includes(tweet.id) &&
      new Date(tweet.created_at).toISOString() < oldestAllowedDate
  );

  writeLog("deleteTweets", `Deleting ${deletableTweets.length} tweets`, {
    ids: deletableTweets.map((tweet) => tweet.id),
  });

  const deletedTweets = await Promise.all(deletableTweets.map(deleteTweet));
  writeLog(
    "deleteTweets",
    `Deleted ${deletedTweets.length} tweets out of ${tweets.length} total tweets`
  );
}

/**
 * Delete a tweet
 */
export async function deleteTweet(
  tweet: Twitter.Tweet
): Promise<string | undefined> {
  const id = tweet.id_str;

  try {
    const res = await twitter.post(`statuses/destroy`, { id, trim_user: true });
    writeLog(`Deleted tweet (${id}) from ${res.created_at}: `, res.text);
    return id;
  } catch (error) {
    writeLog("deleteTweet", error instanceof Error ? error.message : "", {
      id,
    });
  }
  return;
}

/**
 * Delete all likes older than the max age
 * TODO: Create unit test for this
 */
export async function deleteLikes(): Promise<void> {
  writeLog("deleteLikes", "Deleting likes...");
  if (!oldestAllowedDate) throw new Error("oldestAllowedDate was null");

  const tweets = await getLikes();
  const deletableTweets = tweets.filter(
    (tweet) => new Date(tweet.created_at).toISOString() < oldestAllowedDate
  );

  await Promise.all(deletableTweets.map(deleteLike));

  writeLog(
    "deleteLikes",
    `Deleted ${deletableTweets.length} likes out of ${tweets.length} total likes`
  );
}

/**
 * Delete a tweet
 * @param {Object} tweet
 * @returns {Promise<String>}
 */
export async function deleteLike(
  tweet: Twitter.Tweet
): Promise<string | undefined> {
  const id = tweet.id_str;

  try {
    const res = await twitter.post(`favorites/destroy`, {
      id,
      include_entities: false,
    });
    writeLog("deleteLike", `Deleted like (${id}) from ${res.created_at}: `, {
      text: res.text,
    });
    return id;
  } catch (error) {
    writeLog("deleteLike", error instanceof Error ? error.message : "", { id });
  }
  return;
}

/**
 * Disable retweets for everyone I follow
 */
export async function disableRetweets(): Promise<void> {
  const { ids } = await twitter.get<{ ids: number[] }>("friends/ids", {
    stringify_ids: true,
    screen_name: username,
  });

  let count = 0;

  try {
    await Promise.all(
      ids.map(async (user_id) => {
        writeLog("disableRetweets", "Disabling retweets for", { user_id });
        await twitter.post("friendships/update", { user_id, retweets: false });
        count++;
      })
    );

    writeLog("disableRetweets", "Disabled retweets", { totalDisabled: count });
  } catch (error) {
    writeLog("disableRetweets", "Error disabling retweets", {
      totalDisabled: count,
    });
    throw error;
  }
}
