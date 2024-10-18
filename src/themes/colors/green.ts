import type { Theme } from "../Theme";

export const greenTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/colors/green/mine.png"),
  tile: () => import("../../assets/themes/colors/green/tile.png"),
  revealed: () => import("../../assets/themes/colors/green/revealed.png"),
  flag: () => import("../../assets/themes/colors/green/flag.png"),
  questionMark: () =>
    import("../../assets/themes/colors/green/question-mark.png"),
  lastPos: () => import("../../assets/themes/colors/green/last-pos.png"),
  1: () => import("../../assets/themes/colors/green/1.png"),
  2: () => import("../../assets/themes/colors/green/2.png"),
  3: () => import("../../assets/themes/colors/green/3.png"),
  4: () => import("../../assets/themes/colors/green/4.png"),
  5: () => import("../../assets/themes/colors/green/5.png"),
  6: () => import("../../assets/themes/colors/green/6.png"),
  7: () => import("../../assets/themes/colors/green/7.png"),
  8: () => import("../../assets/themes/colors/green/8.png"),
};
