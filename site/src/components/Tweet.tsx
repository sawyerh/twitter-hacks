/** @jsx jsx */
import { jsx } from "@emotion/react";
import theme from "../theme";
import twitter from "twitter-text";

interface TweetProps {
  id_str: string;
  full_text: string;
  entities: {
    urls: Array<{
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
  const { id_str, full_text, user } = props;

  return (
    <article
      css={{
        border: `1px solid ${theme.colors.lightGray}`,
        borderRadius: 10,
        padding: theme.spacer * 3,
        marginBottom: theme.spacer * 3,
      }}
    >
      <div
        className="tweet__text"
        dangerouslySetInnerHTML={{
          __html: twitter.autoLink(twitter.htmlEscape(full_text)),
        }}
      />
      <div className="tweet__details">
        <a href={`https://twitter.com/${user.screen_name}`} rel="nofollow">
          <img src={user.profile_image_url_https} width="20" height="20" />
        </a>
        <a
          href={`https://twitter.com/${user.screen_name}/status/${id_str}`}
          title="View original Tweet"
        >
          🔗
        </a>
      </div>
    </article>
  );
}

export default Tweet;
