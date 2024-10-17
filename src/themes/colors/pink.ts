import { Theme } from "../Theme";

export const pinkTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/colors/pink/mine.png"),
  tile: () => import("../../assets/themes/colors/pink/tile.png"),
  revealed: () => import("../../assets/themes/colors/pink/revealed.png"),
  flag: () => import("../../assets/themes/colors/pink/flag.png"),
  questionMark: () => import("../../assets/themes/colors/pink/question-mark.png"),
  lastPos: () => import("../../assets/themes/colors/pink/last-pos.png"),
  1: () => import("../../assets/themes/colors/pink/1.png"),
  2: () => import("../../assets/themes/colors/pink/2.png"),
  3: () => import("../../assets/themes/colors/pink/3.png"),
  4: () => import("../../assets/themes/colors/pink/4.png"),
  5: () => import("../../assets/themes/colors/pink/5.png"),
  6: () => import("../../assets/themes/colors/pink/6.png"),
  7: () => import("../../assets/themes/colors/pink/7.png"),
  8: () => import("../../assets/themes/colors/pink/8.png"),
};
