/** @jsx jsx */
import { jsx } from "@emotion/react";
import theme from "../theme";

/**
 * Individual tweet's body text
 */
function TweetMedia(props: TweetMediaProps): JSX.Element {
  const { media } = props;

  if (!media.length) return null;

  return (
    <div
      css={{
        marginTop: theme.spacer * 2,
      }}
    >
      {media.map((entity) => {
        return (
          <a
            href={entity.expanded_url}
            key={entity.id}
            title={`View ${entity.type.replace("_", " ")} on Twitter`}
          >
            <img
              alt=""
              css={{
                maxWidth: "100%",
              }}
              src={`${entity.media_url_https}?name=small`}
            />
          </a>
        );
      })}
    </div>
  );
}

interface TweetMediaProps {
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
}

export default TweetMedia;
