/** @jsx jsx */
import { jsx } from "@emotion/react";
import theme from "../theme";

function LoadingMoreButton(props: LoadingMoreButtonProps): JSX.Element {
  return (
    <div
      css={{
        /**
         * Add extra spacing towards bottom to address weird iOS behavior where it
         * shows the browser chrome when you tap the button because it's so close
         * to the bottom of the screen
         */
        marginBottom: theme.spacer * 8,
        textAlign: "center",
      }}
    >
      <button
        css={{
          borderRadius: 3,
          fontWeight: "bold",
          padding: theme.spacer * 2,
          width: "100%",
        }}
        onClick={props.onClick}
        type="button"
      >
        Load more
      </button>
    </div>
  );
}

interface LoadingMoreButtonProps {
  onClick: () => void;
}

export default LoadingMoreButton;
