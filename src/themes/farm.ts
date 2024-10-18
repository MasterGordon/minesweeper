import type { Theme } from "./Theme";

export const farmTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/farm/mine.png"),
  tile: () => import("../assets/themes/farm/tile.png"),
  revealed: () => import("../assets/themes/farm/revealed.png"),
  flag: () => import("../assets/themes/farm/flag.png"),
  questionMark: () => import("../assets/themes/farm/question-mark.png"),
  lastPos: () => import("../assets/themes/farm/last-pos.png"),
  1: () => import("../assets/themes/farm/1.png"),
  2: () => import("../assets/themes/farm/2.png"),
  3: () => import("../assets/themes/farm/3.png"),
  4: () => import("../assets/themes/farm/4.png"),
  5: () => import("../assets/themes/farm/5.png"),
  6: () => import("../assets/themes/farm/6.png"),
  7: () => import("../assets/themes/farm/7.png"),
  8: () => import("../assets/themes/farm/8.png"),
};
