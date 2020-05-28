/**
 * Handler for /api route requests
 */
import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import cors = require("cors");
import express = require("express");

const db = admin.firestore();
const collection = db.collection("tweets");
const app = express();

/**
 * Middleware
 */
app.use(cors({ origin: true }));

/**
 * Get the latest tweets that include an external link
 */
app.get("/api/tweets", async (req, res) => {
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

    // Cache query for 10 minutes
    // https://firebase.google.com/docs/hosting/manage-cache
    res.set("Cache-Control", "public, max-age=600, s-maxage=600");

    return res.status(200).send(tweets);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
});

module.exports = functions.https.onRequest(app);
