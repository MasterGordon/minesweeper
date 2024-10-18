import type { Theme } from "./Theme";

export const basicTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/basic/mine.png"),
  tile: () => import("../assets/themes/basic/tile.png"),
  revealed: () => import("../assets/themes/basic/revealed.png"),
  flag: () => import("../assets/themes/basic/flag.png"),
  questionMark: () => import("../assets/themes/basic/question-mark.png"),
  lastPos: () => import("../assets/themes/basic/last-pos.png"),
  1: () => import("../assets/themes/basic/1.png"),
  2: () => import("../assets/themes/basic/2.png"),
  3: () => import("../assets/themes/basic/3.png"),
  4: () => import("../assets/themes/basic/4.png"),
  5: () => import("../assets/themes/basic/5.png"),
  6: () => import("../assets/themes/basic/6.png"),
  7: () => import("../assets/themes/basic/7.png"),
  8: () => import("../assets/themes/basic/8.png"),
};
