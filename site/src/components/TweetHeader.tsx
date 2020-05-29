/** @jsx jsx */
import { jsx } from "@emotion/react";
import theme from "../theme";

function TweetHeader(props: TweetHeaderProps): JSX.Element {
  const { id_str, user } = props;
  const tweetLink = `https://twitter.com/${user.screen_name}/status/${id_str}`;

  return (
    <div
      css={{
        alignItems: "center",
        display: "flex",
        lineHeight: 1,
        marginBottom: theme.spacer,
      }}
    >
      <a
        css={{
          marginRight: theme.spacer,
        }}
        href={tweetLink}
        title="View original tweet"
      >
        <img
          alt={`Avatar for ${user.name}`}
          css={{
            borderRadius: "50%",
            verticalAlign: "bottom",
          }}
          src={user.profile_image_url_https}
          width="24"
          height="24"
        />
      </a>
      <a
        css={{
          color: theme.colors.gray,
          fontWeight: "bold",
          textDecoration: "none",
          ":hover": {
            textDecoration: "underline",
          },
        }}
        href={tweetLink}
        title="View original tweet"
      >
        {user.name}
      </a>
    </div>
  );
}

interface TweetHeaderProps {
  id_str: string;
  user: {
    name: string;
    screen_name: string;
    followers_count: number;
    profile_background_color: string; // hex without #
    profile_image_url_https: string;
  };
}

export default TweetHeader;
