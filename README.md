## Tips

### Locally trigger a scheduled function

1. `npm run shell`
1. Call the function name:
    ```sh
    getTweets()
    ```

### View logs

View detailed logs in [StackDriver](https://console.cloud.google.com/project/_/logs?service=cloudfunctions.googleapis.com&advancedFilter=resource.type%3D%22cloud_function%22%0A)

In the StackDriver Logging UI, use the advanced filter field to narrow the log scope to the function you want to analyze, then click Submit Filter to filter the logs. For example, you could analyze only logs from a single function matching a custom event:

```
resource.type="cloud_function"
resource.labels.function_name="CustomMetrics"
jsonPayload.event="my-event"
```

- [View or create dashboards](https://console.cloud.google.com/monitoring/dashboards)

## Scripts

### Root `package.json`

- `deploy` - Deploy all Firebase services
- `login` - Log into Firebase
- `lint`

### `functions/package.json`

- `build` - Compile Typescript
- `build:watch` - Compile Typescript and watch for changes
- `serve` - Run the Firebase Functions emulator
- `set-env` - Create a local copy of the Firebase environment configuration to support local development
- `shell`
- `start`
- `logs`

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
```

### Set Functions environment config

```
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
```