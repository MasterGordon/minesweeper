import { Theme } from "../Theme";

export const yellowTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/colors/yellow/mine.png"),
  tile: () => import("../../assets/themes/colors/yellow/tile.png"),
  revealed: () => import("../../assets/themes/colors/yellow/revealed.png"),
  flag: () => import("../../assets/themes/colors/yellow/flag.png"),
  questionMark: () =>
    import("../../assets/themes/colors/yellow/question-mark.png"),
  lastPos: () => import("../../assets/themes/colors/yellow/last-pos.png"),
  1: () => import("../../assets/themes/colors/yellow/1.png"),
  2: () => import("../../assets/themes/colors/yellow/2.png"),
  3: () => import("../../assets/themes/colors/yellow/3.png"),
  4: () => import("../../assets/themes/colors/yellow/4.png"),
  5: () => import("../../assets/themes/colors/yellow/5.png"),
  6: () => import("../../assets/themes/colors/yellow/6.png"),
  7: () => import("../../assets/themes/colors/yellow/7.png"),
  8: () => import("../../assets/themes/colors/yellow/8.png"),
};
