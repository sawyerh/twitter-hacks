import * as functions from "firebase-functions";
import getTweetsThatIncludeLinks from "./getTweetsThatIncludeLinks";

/**
 * Get the latest tweets that include an external link
 */
export const getTweets = functions.https.onRequest(
  async (_request, response) => {
    const tweets = await getTweetsThatIncludeLinks();
    console.log(`${tweets.length} tweets had links`);
    response.send(tweets);
  }
);
