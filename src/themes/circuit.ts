import { Theme } from "./Theme";

export const circuitTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/circuit/mine.png"),
  tile: () => import("../assets/themes/circuit/tile.png"),
  revealed: () => import("../assets/themes/circuit/revealed.png"),
  flag: () => import("../assets/themes/circuit/flag.png"),
  questionMark: () => import("../assets/themes/circuit/question-mark.png"),
  lastPos: () => import("../assets/themes/circuit/last-pos.png"),
  1: () => import("../assets/themes/circuit/1.png"),
  2: () => import("../assets/themes/circuit/2.png"),
  3: () => import("../assets/themes/circuit/3.png"),
  4: () => import("../assets/themes/circuit/4.png"),
  5: () => import("../assets/themes/circuit/5.png"),
  6: () => import("../assets/themes/circuit/6.png"),
  7: () => import("../assets/themes/circuit/7.png"),
  8: () => import("../assets/themes/circuit/8.png"),
};
