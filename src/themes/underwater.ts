import { Theme } from "./Theme";

export const underwaterTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/underwater/mine.png"),
  tile: () => import("../assets/themes/underwater/tile.png"),
  revealed: () => import("../assets/themes/underwater/revealed.png"),
  flag: () => import("../assets/themes/underwater/flag.png"),
  questionMark: () => import("../assets/themes/underwater/question-mark.png"),
  lastPos: () => import("../assets/themes/underwater/last-pos.png"),
  1: () => import("../assets/themes/underwater/1.png"),
  2: () => import("../assets/themes/underwater/2.png"),
  3: () => import("../assets/themes/underwater/3.png"),
  4: () => import("../assets/themes/underwater/4.png"),
  5: () => import("../assets/themes/underwater/5.png"),
  6: () => import("../assets/themes/underwater/6.png"),
  7: () => import("../assets/themes/underwater/7.png"),
  8: () => import("../assets/themes/underwater/8.png"),
};
