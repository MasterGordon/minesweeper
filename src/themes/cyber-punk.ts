import { Theme } from "./Theme";

export const cyberPunkTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/cyber-punk/mine.png"),
  tile: () => import("../assets/themes/cyber-punk/tile.png"),
  revealed: () => import("../assets/themes/cyber-punk/revealed.png"),
  flag: () => import("../assets/themes/cyber-punk/flag.png"),
  questionMark: () => import("../assets/themes/cyber-punk/question-mark.png"),
  lastPos: () => import("../assets/themes/cyber-punk/last-pos.png"),
  1: () => import("../assets/themes/cyber-punk/1.png"),
  2: () => import("../assets/themes/cyber-punk/2.png"),
  3: () => import("../assets/themes/cyber-punk/3.png"),
  4: () => import("../assets/themes/cyber-punk/4.png"),
  5: () => import("../assets/themes/cyber-punk/5.png"),
  6: () => import("../assets/themes/cyber-punk/6.png"),
  7: () => import("../assets/themes/cyber-punk/7.png"),
  8: () => import("../assets/themes/cyber-punk/8.png"),
};
