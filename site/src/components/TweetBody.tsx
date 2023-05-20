import theme from "../theme";
import twitter from "twitter-text";

/**
 * Individual tweet's body text
 */
function TweetBody(props: TweetBodyProps): JSX.Element {
  // Auto-link URLs, usernames, hashtags, and add line breaks
  let formattedText = twitter
    .autoLink(twitter.htmlEscape(props.full_text))
    // add line breaks
    .replace(/\n/g, "<br />")
    // remove parenthesis from around a link
    .replace("(<a", "<a")
    .replace("a>)", "a>");

  // Replace t.co URL with display URL
  props.entities.urls.forEach((entity) => {
    formattedText = formattedText.replace(
      `${entity.url}</a>`,
      `${entity.display_url}</a>`
    );
  });

  return (
    <div
      css={{
        "a:not(.username)": {
          backgroundColor: theme.colors.lighterGray,
          borderRadius: theme.spacer,
          display: "inline-block",
          fontSize: theme.fontSizes.small,
          padding: `${theme.spacer / 2}px ${theme.spacer}px`,

          ":hover": {
            backgroundColor: theme.colors.blue,
            color: theme.colors.white,
          },
        },
      }}
      dangerouslySetInnerHTML={{
        __html: formattedText,
      }}
    />
  );
}

interface TweetBodyProps {
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

export default TweetBody;
