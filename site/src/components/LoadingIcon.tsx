/** @jsx jsx */
import { jsx } from "@emotion/react";

function LoadingIcon(): JSX.Element {
  return (
    <div
      css={{
        textAlign: "center",
      }}
    >
      <img src="/loader.svg" alt="Loading" />
    </div>
  );
}

export default LoadingIcon;
