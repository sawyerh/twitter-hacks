/** @jsx jsx */
import { jsx } from "@emotion/react";
import theme from "../theme";
import twitter from "twitter-text";

interface TweetTextProps {
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
}

function TweetText(props: TweetTextProps): JSX.Element {
  let formattedText = twitter.autoLink(twitter.htmlEscape(props.full_text));

  // Replace t.co URL with display URL
  props.entities.urls.forEach((entity) => {
    formattedText = formattedText.replace(
      `${entity.url}</a>`,
      `${entity.display_url}</a>`
    );
  });

  return (
    <div
      className="tweet__text"
      css={{
        a: {
          backgroundColor: theme.colors.lightGray,
          borderRadius: 15,
          display: "inline-block",
          fontSize: theme.fontSizes.small,
          padding: theme.spacer / 2,
        },
      }}
      dangerouslySetInnerHTML={{
        __html: formattedText,
      }}
    />
  );
}

export default TweetText;
