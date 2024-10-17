import { Theme } from "../Theme";

export const turquoiseTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/colors/turquoise/mine.png"),
  tile: () => import("../../assets/themes/colors/turquoise/tile.png"),
  revealed: () => import("../../assets/themes/colors/turquoise/revealed.png"),
  flag: () => import("../../assets/themes/colors/turquoise/flag.png"),
  questionMark: () => import("../../assets/themes/colors/turquoise/question-mark.png"),
  lastPos: () => import("../../assets/themes/colors/turquoise/last-pos.png"),
  1: () => import("../../assets/themes/colors/turquoise/1.png"),
  2: () => import("../../assets/themes/colors/turquoise/2.png"),
  3: () => import("../../assets/themes/colors/turquoise/3.png"),
  4: () => import("../../assets/themes/colors/turquoise/4.png"),
  5: () => import("../../assets/themes/colors/turquoise/5.png"),
  6: () => import("../../assets/themes/colors/turquoise/6.png"),
  7: () => import("../../assets/themes/colors/turquoise/7.png"),
  8: () => import("../../assets/themes/colors/turquoise/8.png"),
};
