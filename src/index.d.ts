type Link = string;

interface Tweet {
  id: number;
  entities: {
    urls: any[];
  };
  extended_entities: {
    media: any[];
  };
  user: {
    name: string;
    profile_background_color: string; // hex without #
    profile_image_url_https: Link;
    screen_name: string;
  };
  text: string;
}

interface TweetMedia {
  media_url_https: Link;
  sizes: {
    thumb: TweetMediaSizeEntry;
  };
  type: "photo" | string;
}

interface TweetMediaSizeEntry {
  w: number;
  h: number;
  resize: "crop" | "fit";
}
