import merge from "lodash/merge";

import { Theme } from "@mui/material/styles";

import { defaultProps } from "./default-props";
import { cssBaseline } from "./components/css-baseline";
import { button } from "./components/button";
import { link } from "./components/link";

export function componentsOverrides(theme: Theme) {
  const components = merge(
    defaultProps(),
    cssBaseline(),
    button(theme),
    link(theme),
  );

  return components;
}
