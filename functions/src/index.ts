import admin = require("firebase-admin");

admin.initializeApp();

exports.api = require("./api");
exports.pubsub = require("./pubsub");
