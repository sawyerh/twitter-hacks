import * as functions from "firebase-functions";
import admin = require("firebase-admin");
// import { writeLog } from "./services/logger";

const db = admin.firestore();
const collection = db.collection("tweets");

/**
 * Get the latest tweets that include an external link
 */
exports.tweets = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    return res.status(403).send("Forbidden!");
  }

  try {
    const { lastId } = req.query;
    const invalidIdRegex = new RegExp(/\D/);
    let query = collection.orderBy("created_at_timestamp", "desc").limit(20);

    // Paginate if the request included the lastId and conforms to the expected ID format
    if (typeof lastId === "string" && !invalidIdRegex.test(lastId)) {
      const lastDoc = await collection.doc(lastId).get();
      query = query.startAfter(lastDoc.get("created_at_timestamp"));
    }

    const queryResults = await query.get();
    const tweets = queryResults.docs.map((doc) => doc.data());

    return res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
});
