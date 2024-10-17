import { Theme } from "../Theme";

export const orangeTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/colors/orange/mine.png"),
  tile: () => import("../../assets/themes/colors/orange/tile.png"),
  revealed: () => import("../../assets/themes/colors/orange/revealed.png"),
  flag: () => import("../../assets/themes/colors/orange/flag.png"),
  questionMark: () => import("../../assets/themes/colors/orange/question-mark.png"),
  lastPos: () => import("../../assets/themes/colors/orange/last-pos.png"),
  1: () => import("../../assets/themes/colors/orange/1.png"),
  2: () => import("../../assets/themes/colors/orange/2.png"),
  3: () => import("../../assets/themes/colors/orange/3.png"),
  4: () => import("../../assets/themes/colors/orange/4.png"),
  5: () => import("../../assets/themes/colors/orange/5.png"),
  6: () => import("../../assets/themes/colors/orange/6.png"),
  7: () => import("../../assets/themes/colors/orange/7.png"),
  8: () => import("../../assets/themes/colors/orange/8.png"),
};
