/**
 * @file Cloud Functions logs are backed by StackDriver Logging. We use the
 * StackDriver Logging library to log events with structured data, enabling
 * easier analysis and monitoring.
 * @see https://firebase.google.com/docs/functions/writing-and-viewing-logs
 */
const { Logging } = require("@google-cloud/logging");

const logging = new Logging();
const log = logging.log("app");

// This metadata is attached to each log entry. This specifies a fake
// Cloud Function called 'Custom Metrics' in order to make our custom
// log entries appear in the Cloud Functions logs viewer.
const metadata = {
  resource: {
    type: "cloud_function",
    labels: {
      function_name: "CustomMetrics",
      region: "us-central1",
    },
  },
};

/**
 * @param event - Event name
 * @param message - Event message. Will show in the Firebase console & other human-readable logging surfaces
 * @param payload - Event payload
 */
export function writeLog(
  event: string,
  message?: string | number,
  payload?: Record<string, unknown>
): void {
  // Data to write to the log. This can be a JSON object with any properties
  // of the event you want to record.
  const data = {
    event,
    message: `${event}: ${message}`,
    ...payload,
  };

  const entry = log.entry(metadata, data);
  log.write(entry);
}
