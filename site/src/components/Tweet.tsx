/** @jsx jsx */
import TweetBody from "./TweetBody";
import TweetMedia from "./TweetMedia";
import TweetHeader from "./TweetHeader";
import { jsx } from "@emotion/react";
import theme from "../theme";

function Tweet(props: TweetProps): JSX.Element {
  return (
    <article
      css={{
        background: theme.colors.white,
        borderRadius: 10,
        padding: theme.spacer * 3,
        marginBottom: theme.spacer * 3,
      }}
    >
      <TweetHeader id_str={props.id_str} user={props.user} />
      <TweetBody full_text={props.full_text} entities={props.entities} />
      {props.extended_entities && (
        <TweetMedia media={props.extended_entities.media} />
      )}
    </article>
  );
}

interface TweetProps {
  id_str: string;
  full_text: string;
  entities: {
    urls: Array<{
      url: string;
      // URL pasted/typed into Tweet (e.g. github.com/samccone/bundl…)
      display_url: string;
      // Expanded version of display_url (e.g. https://github.com/samccone/bundle-buddy)
      expanded_url: string;
    }>;
  };
  extended_entities?: {
    media: Array<{
      id: number;
      expanded_url: string;
      media_url_https: string;
      type: "animated_gif" | "photo" | "video";
      sizes: {
        [name in "thumb" | "small" | "medium" | "large"]: {
          w: number;
          h: number;
          resize: "crop" | "fit";
        };
      };
    }>;
  };
  user: {
    name: string;
    screen_name: string;
    followers_count: number;
    profile_background_color: string; // hex without #
    profile_image_url_https: string;
  };
}

export default Tweet;
