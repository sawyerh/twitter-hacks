import * as functions from "firebase-functions";
import getTweetsThatIncludeLinks from "./getTweetsThatIncludeLinks";
import admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const tweetsCollectionName = "tweets";

/**
 * Get the latest tweets that include an external link
 */
export const getTweets = functions.pubsub
  .schedule("every 15 minutes")
  .onRun(async () => {
    // Get the latest tweet so we can query only tweets posted after it
    const existingTweets = await db
      .collection(tweetsCollectionName)
      .orderBy("created_at_timestamp", "desc")
      .limit(1)
      .select("id_str")
      .get();
    const latestTweetId: string = existingTweets.empty
      ? undefined
      : existingTweets.docs[0].get("id_str");

    // Get the newest tweets
    console.log(`Checking for any tweets posted after Tweet ${latestTweetId}`);
    const tweets = await getTweetsThatIncludeLinks(latestTweetId);

    // Save the latest tweets to our database
    await Promise.all(
      tweets.map((tweet) =>
        db.collection(tweetsCollectionName).doc(tweet.id_str).set(tweet)
      )
    );

    console.log(`${tweets.length} tweets had links`);
  });
