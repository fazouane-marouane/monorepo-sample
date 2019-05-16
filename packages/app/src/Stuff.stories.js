import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Stuff", module)
  .add("with text", () => <button>Hello Button</button>)
  .add("with emoji", () => (
    <button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </button>
  ));
