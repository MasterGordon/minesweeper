import { Theme } from "../Theme";

export const purpleTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/colors/purple/mine.png"),
  tile: () => import("../../assets/themes/colors/purple/tile.png"),
  revealed: () => import("../../assets/themes/colors/purple/revealed.png"),
  flag: () => import("../../assets/themes/colors/purple/flag.png"),
  questionMark: () => import("../../assets/themes/colors/purple/question-mark.png"),
  lastPos: () => import("../../assets/themes/colors/purple/last-pos.png"),
  1: () => import("../../assets/themes/colors/purple/1.png"),
  2: () => import("../../assets/themes/colors/purple/2.png"),
  3: () => import("../../assets/themes/colors/purple/3.png"),
  4: () => import("../../assets/themes/colors/purple/4.png"),
  5: () => import("../../assets/themes/colors/purple/5.png"),
  6: () => import("../../assets/themes/colors/purple/6.png"),
  7: () => import("../../assets/themes/colors/purple/7.png"),
  8: () => import("../../assets/themes/colors/purple/8.png"),
};
