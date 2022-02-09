/**
 * @file PubSub scheduled functions to delete old tweets & likes, and disable retweets.
 */
import { pubsub } from "firebase-functions";
import { deleteLikes, deleteTweets, disableRetweets } from "./services/twitter";
import { writeLog } from "./services/logger";

/**
 * Get the latest tweets that include an external link
 */
exports.deleteSchedule = pubsub.schedule("every 24 hours").onRun(async () => {
  writeLog(
    `Deleting tweets and likes that occurred before and disabling all tweets.`
  );

  await deleteTweets();
  await deleteLikes();
  await disableRetweets();
});
