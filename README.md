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