/** @jsx jsx */
import { jsx } from "@emotion/react";
import theme from "../theme";

declare global {
  interface Navigator {
    standalone: boolean;
  }
}

function RefreshButton(): JSX.Element {
  if (typeof window === "undefined" || !window.navigator.standalone) {
    return null;
  }

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div css={{ textAlign: "center" }}>
      <button
        css={{
          borderRadius: 20,
          fontSize: theme.fontSizes.small,
          marginBottom: theme.spacer * 2,
          padding: `${theme.spacer}px ${theme.spacer * 2}px`,
        }}
        onClick={handleClick}
        type="button"
      >
        Refresh
      </button>
    </div>
  );
}

export default RefreshButton;
