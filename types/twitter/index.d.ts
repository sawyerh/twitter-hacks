declare module "twitter" {
  export = Twitter;

  class Twitter {
    constructor(options: Twitter.AuthOptions);

    /**
     * Send a GET API request
     */
    get(
      path: string,
      params?: Record<string, unknown>
    ): Promise<Twitter.Tweet[]>;
  }

  namespace Twitter {
    type Link = string;

    interface AuthOptions {
      consumer_key: string;
      consumer_secret: string;
      access_token_key: string;
      access_token_secret: string;
    }

    interface Tweet {
      id: number;
      id_str: string;
      created_at: string;
      created_at_timestamp: Date;
      full_text: string;
      entities: {
        urls: URLEntity[];
      };
      /**
       * All Tweets with attached photos, videos and animated GIFs will include
       * an extended_entities JSON object.
       */
      extended_entities: {
        media: MediaEntity[];
      };
      favorite_count: number;
      retweet_count: number;
      is_quote_status: boolean;
      user: {
        name: string;
        screen_name: string;
        followers_count: number;
        profile_background_color: string; // hex without #
        profile_image_url_https: Link;
      };
    }

    interface URLEntity {
      // URL pasted/typed into Tweet (e.g. github.com/samccone/bundl…)
      display_url: string;
      // Expanded version of display_url (e.g. https://github.com/samccone/bundle-buddy)
      expanded_url: string;
    }

    interface MediaEntity {
      id: number;
      expanded_url: string;
      media_url_https: string;
      type: "animated_gif" | "photo" | "video";
      sizes: {
        // https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/entities-object#media-size
        [name in "thumb" | "small" | "medium" | "large"]: {
          w: number;
          h: number;
          resize: "crop" | "fit";
        };
      };
    }
  }
}
