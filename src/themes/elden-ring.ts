import type { Theme } from "./Theme";

export const eldenRingTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/elden-ring/mine.png"),
  tile: () => import("../assets/themes/elden-ring/tile.png"),
  revealed: () => import("../assets/themes/elden-ring/revealed.png"),
  flag: () => import("../assets/themes/elden-ring/flag.png"),
  questionMark: () => import("../assets/themes/elden-ring/question-mark.png"),
  lastPos: () => import("../assets/themes/elden-ring/last-pos.png"),
  1: () => import("../assets/themes/elden-ring/1.png"),
  2: () => import("../assets/themes/elden-ring/2.png"),
  3: () => import("../assets/themes/elden-ring/3.png"),
  4: () => import("../assets/themes/elden-ring/4.png"),
  5: () => import("../assets/themes/elden-ring/5.png"),
  6: () => import("../assets/themes/elden-ring/6.png"),
  7: () => import("../assets/themes/elden-ring/7.png"),
  8: () => import("../assets/themes/elden-ring/8.png"),
};
