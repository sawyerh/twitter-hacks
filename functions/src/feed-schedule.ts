/**
 * @file PubSub scheduled functions to manage the timeline on twitter.sawyer.soy
 */
import * as functions from "firebase-functions";
import { DateTime } from "luxon";
import admin = require("firebase-admin");
import { getTweetsThatIncludeLinks } from "./services/twitter";
import { writeLog } from "./services/logger";

const db = admin.firestore();
const collection = db.collection("tweets");

/**
 * Get the latest tweets that include an external link
 */
exports.getTweets = functions.pubsub
  .schedule("every 15 minutes")
  .onRun(async () => {
    // Get the latest tweet so we can query only tweets posted after it
    const existingTweets = await collection
      .orderBy("created_at_timestamp", "desc")
      .limit(1)
      .select("id_str")
      .get();
    const latestTweetId: string = existingTweets.empty
      ? undefined
      : existingTweets.docs[0].get("id_str");

    // Get the newest tweets
    const tweets = await getTweetsThatIncludeLinks(latestTweetId);

    // Save the latest tweets to our database
    await Promise.all(
      tweets.map(async (tweet) => {
        try {
          await collection.doc(tweet.id_str).set(tweet);
        } catch (error) {
          console.error(`Encountered error saving a tweet`, { tweet });
          throw error;
        }
      })
    );
  });

/**
 * Remove any tweets older than 2 weeks so that we don't accrue millions of tweets
 */
exports.removeOldTweets = functions.pubsub
  .schedule("every 14 days")
  .onRun(async () => {
    const twoWeeksAgo = DateTime.local().minus({ days: 14 });
    const tweets = await collection
      .where("created_at_timestamp", "<", twoWeeksAgo.toJSDate())
      .get();

    writeLog(
      "removeOldTweets",
      `Found ${
        tweets.docs.length
      } that are older than ${twoWeeksAgo.toISO()} to delete`
    );

    if (tweets.empty) return;

    await Promise.all(
      tweets.docs.map((doc) => collection.doc(doc.id).delete())
    );
  });
