import getTweetsThatIncludeLinks from "./getTweetsThatIncludeLinks";

async function run(): Promise<void> {
  try {
    const tweets = await getTweetsThatIncludeLinks();

    tweets.forEach((tweet) => {
      console.log(JSON.stringify(tweet, null, 4));
    });
  } catch (error) {
    console.error(error);
  }
}

run();
