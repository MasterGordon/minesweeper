import { Theme } from "./Theme";

export const romanceTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/romance/mine.png"),
  tile: () => import("../assets/themes/romance/tile.png"),
  revealed: () => import("../assets/themes/romance/revealed.png"),
  flag: () => import("../assets/themes/romance/flag.png"),
  questionMark: () => import("../assets/themes/romance/question-mark.png"),
  lastPos: () => import("../assets/themes/romance/last-pos.png"),
  1: () => import("../assets/themes/romance/1.png"),
  2: () => import("../assets/themes/romance/2.png"),
  3: () => import("../assets/themes/romance/3.png"),
  4: () => import("../assets/themes/romance/4.png"),
  5: () => import("../assets/themes/romance/5.png"),
  6: () => import("../assets/themes/romance/6.png"),
  7: () => import("../assets/themes/romance/7.png"),
  8: () => import("../assets/themes/romance/8.png"),
};
