/** @jsx jsx */
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";
import { jsx } from "@emotion/react";
import theme from "../theme";

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
  user: {
    name: string;
    screen_name: string;
    followers_count: number;
    profile_background_color: string; // hex without #
    profile_image_url_https: string;
  };
}

function Tweet(props: TweetProps): JSX.Element {
  return (
    <article
      css={{
        background: theme.colors.white,
        border: `1px solid ${theme.colors.lightGray}`,
        borderRadius: 10,
        padding: theme.spacer * 3,
        marginBottom: theme.spacer * 3,
      }}
    >
      <TweetHeader id_str={props.id_str} user={props.user} />
      <TweetBody full_text={props.full_text} entities={props.entities} />
    </article>
  );
}

export default Tweet;
