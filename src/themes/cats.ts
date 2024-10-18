import type { Theme } from "./Theme";

export const catsTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/cats/mine-2.png"),
  tile: () => import("../assets/themes/cats/tile.png"),
  revealed: () => import("../assets/themes/cats/revealed.png"),
  flag: () => import("../assets/themes/cats/flag.png"),
  questionMark: () => import("../assets/themes/cats/question-mark.png"),
  lastPos: () => import("../assets/themes/cats/last-pos.png"),
  1: () => import("../assets/themes/cats/1.png"),
  2: () => import("../assets/themes/cats/2.png"),
  3: () => import("../assets/themes/cats/3.png"),
  4: () => import("../assets/themes/cats/4.png"),
  5: () => import("../assets/themes/cats/5.png"),
  6: () => import("../assets/themes/cats/6.png"),
  7: () => import("../assets/themes/cats/7.png"),
  8: () => import("../assets/themes/cats/8.png"),
};
