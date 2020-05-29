🏡 **A serverless web app for archiving and viewing tweets with links from accounts I follow.**

## Overview

- Firebase Function runs on a recurring schedule to fetch the latest tweets from accounts I follow
- Firestore database stores the tweets
- Firebase Hosting serves the Next.js frontend, which queries tweets using a Firebase Function as the API endpoint

## Tips

### Run in dev mode

From the root of the repo, run:

```
npm run dev
```

### Watch for changes

Run `build:watch` in a Terminal or through [VS Code's "Build task" runner](https://code.visualstudio.com/docs/typescript/typescript-compiling#_step-2-run-the-typescript-build)

### Locally trigger a function

From `functions/`, run:

1. `npm run shell`
1. Call the function name:

   ```sh
   pubsub.getTweets()
   ```

   ```sh
   api.tweets.get('?lastId=123')
   ```

```

### View logs

View detailed logs in [StackDriver](https://console.cloud.google.com/project/_/logs?service=cloudfunctions.googleapis.com&advancedFilter=resource.type%3D%22cloud_function%22%0A)

In the StackDriver Logging UI, use the advanced filter field to narrow the log scope to the function you want to analyze, then click Submit Filter to filter the logs. For example, you could analyze only logs from a single function matching a custom event:

```

resource.type="cloud_function"
resource.labels.function_name="CustomMetrics"
jsonPayload.event="my-event"

````

- [View or create dashboards](https://console.cloud.google.com/monitoring/dashboards)

## Environment configuration

See the `set-env` script in `functions/package.json`

### Required environment keys

```js
{
  "twitter": {
    "access_token_key": string,
    "access_token_secret": string,
    "consumer_secret": string,
    "consumer_key": string
  }
}
````

### Set Functions environment config

```
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
```
