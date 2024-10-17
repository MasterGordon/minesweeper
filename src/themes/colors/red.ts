import { Theme } from "../Theme";

export const redTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/colors/red/mine.png"),
  tile: () => import("../../assets/themes/colors/red/tile.png"),
  revealed: () => import("../../assets/themes/colors/red/revealed.png"),
  flag: () => import("../../assets/themes/colors/red/flag.png"),
  questionMark: () => import("../../assets/themes/colors/red/question-mark.png"),
  lastPos: () => import("../../assets/themes/colors/red/last-pos.png"),
  1: () => import("../../assets/themes/colors/red/1.png"),
  2: () => import("../../assets/themes/colors/red/2.png"),
  3: () => import("../../assets/themes/colors/red/3.png"),
  4: () => import("../../assets/themes/colors/red/4.png"),
  5: () => import("../../assets/themes/colors/red/5.png"),
  6: () => import("../../assets/themes/colors/red/6.png"),
  7: () => import("../../assets/themes/colors/red/7.png"),
  8: () => import("../../assets/themes/colors/red/8.png"),
};
