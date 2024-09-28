import { Theme } from "./Theme";

export const defaultTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/default/mine.png"),
  tile: () => import("../assets/themes/default/tile.png"),
  revealed: () => import("../assets/themes/default/revealed.png"),
  flag: () => import("../assets/themes/default/flag.png"),
  questionMark: () => import("../assets/themes/default/question-mark.png"),
  lastPos: () => import("../assets/themes/default/last-pos.png"),
  1: () => import("../assets/themes/default/1.png"),
  2: () => import("../assets/themes/default/2.png"),
  3: () => import("../assets/themes/default/3.png"),
  4: () => import("../assets/themes/default/4.png"),
  5: () => import("../assets/themes/default/5.png"),
  6: () => import("../assets/themes/default/6.png"),
  7: () => import("../assets/themes/default/7.png"),
  8: () => import("../assets/themes/default/8.png"),
};
