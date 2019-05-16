import { configure } from "@storybook/react";

function loadStories() {
  const storiesReq = require.context("../src", true, /\.stories\.js$/);
  storiesReq.keys().forEach(filename => storiesReq(filename));
}

configure(loadStories, module);
