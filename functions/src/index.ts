import admin = require("firebase-admin");

admin.initializeApp();

exports.pubsub = require("./pubsub");
