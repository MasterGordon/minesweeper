import type { Theme } from "./Theme";

export const isaacTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/isaac/mine-3.png"),
  tile: () => import("../assets/themes/isaac/tile.png"),
  revealed: () => import("../assets/themes/isaac/revealed.png"),
  flag: () => import("../assets/themes/isaac/flag.png"),
  questionMark: () => import("../assets/themes/isaac/question-mark.png"),
  lastPos: () => import("../assets/themes/isaac/last-pos.png"),
  1: () => import("../assets/themes/isaac/1.png"),
  2: () => import("../assets/themes/isaac/2.png"),
  3: () => import("../assets/themes/isaac/3.png"),
  4: () => import("../assets/themes/isaac/4.png"),
  5: () => import("../assets/themes/isaac/5.png"),
  6: () => import("../assets/themes/isaac/6.png"),
  7: () => import("../assets/themes/isaac/7.png"),
  8: () => import("../assets/themes/isaac/8.png"),
};
