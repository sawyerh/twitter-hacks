import React from "react";
import twitter from "twitter-text";

function Tweet({ full_text }): JSX.Element {
  return (
    <article
      dangerouslySetInnerHTML={{
        __html: twitter.autoLink(twitter.htmlEscape(full_text)),
      }}
    />
  );
}

export default Tweet;
