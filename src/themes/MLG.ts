import { Theme } from "./Theme";

export const MLGTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/MLG/mine.png"),
  tile: () => import("../assets/themes/MLG/tile.png"),
  revealed: () => import("../assets/themes/MLG/revealed.png"),
  flag: () => import("../assets/themes/MLG/flag-2.png"),
  questionMark: () => import("../assets/themes/MLG/question-mark.png"),
  lastPos: () => import("../assets/themes/MLG/last-pos.png"),
  1: () => import("../assets/themes/MLG/1.png"),
  2: () => import("../assets/themes/MLG/2.png"),
  3: () => import("../assets/themes/MLG/3.png"),
  4: () => import("../assets/themes/MLG/4.png"),
  5: () => import("../assets/themes/MLG/5.png"),
  6: () => import("../assets/themes/MLG/6.png"),
  7: () => import("../assets/themes/MLG/7.png"),
  8: () => import("../assets/themes/MLG/8.png"),
};
