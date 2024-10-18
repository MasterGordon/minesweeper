import type { Theme } from "../Theme";

export const blueTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/colors/blue/mine.png"),
  tile: () => import("../../assets/themes/colors/blue/tile.png"),
  revealed: () => import("../../assets/themes/colors/blue/revealed.png"),
  flag: () => import("../../assets/themes/colors/blue/flag.png"),
  questionMark: () =>
    import("../../assets/themes/colors/blue/question-mark.png"),
  lastPos: () => import("../../assets/themes/colors/blue/last-pos.png"),
  1: () => import("../../assets/themes/colors/blue/1.png"),
  2: () => import("../../assets/themes/colors/blue/2.png"),
  3: () => import("../../assets/themes/colors/blue/3.png"),
  4: () => import("../../assets/themes/colors/blue/4.png"),
  5: () => import("../../assets/themes/colors/blue/5.png"),
  6: () => import("../../assets/themes/colors/blue/6.png"),
  7: () => import("../../assets/themes/colors/blue/7.png"),
  8: () => import("../../assets/themes/colors/blue/8.png"),
};
