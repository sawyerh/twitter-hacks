import admin = require("firebase-admin");

admin.initializeApp();

exports.api = require("./api");
exports.feed_schedule = require("./feed-schedule");
