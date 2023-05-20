import { jsx } from "@emotion/react";
import theme from "../theme";

function LoadingIcon(): JSX.Element {
  return (
    <div
      css={{
        margin: `${theme.spacer * 2}px 0`,
        textAlign: "center",
      }}
    >
      <img src="/loader.svg" alt="Loading" />
    </div>
  );
}

export default LoadingIcon;
