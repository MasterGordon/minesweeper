import type { Theme } from "./Theme";

export const flowersTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/flowers/mine.png"),
  tile: () => import("../assets/themes/flowers/tile.png"),
  revealed: () => import("../assets/themes/flowers/revealed.png"),
  flag: () => import("../assets/themes/flowers/flag.png"),
  questionMark: () => import("../assets/themes/flowers/question-mark.png"),
  lastPos: () => import("../assets/themes/flowers/last-pos.png"),
  1: () => import("../assets/themes/flowers/1.png"),
  2: () => import("../assets/themes/flowers/2.png"),
  3: () => import("../assets/themes/flowers/3.png"),
  4: () => import("../assets/themes/flowers/4.png"),
  5: () => import("../assets/themes/flowers/5.png"),
  6: () => import("../assets/themes/flowers/6.png"),
  7: () => import("../assets/themes/flowers/7.png"),
  8: () => import("../assets/themes/flowers/8.png"),
};
