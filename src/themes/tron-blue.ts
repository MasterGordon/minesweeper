import { Theme } from "./Theme";

export const tronBlueTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/tron/tron-blue/mine.png"),
  tile: () => import("../assets/themes/tron/tron-blue/tile.png"),
  revealed: () => import("../assets/themes/tron/tron-blue/revealed.png"),
  flag: () => import("../assets/themes/tron/tron-blue/flag.png"),
  questionMark: () =>
    import("../assets/themes/tron/tron-blue/question-mark.png"),
  lastPos: () => import("../assets/themes/tron/tron-blue/last-pos.png"),
  1: () => import("../assets/themes/tron/tron-blue/1.png"),
  2: () => import("../assets/themes/tron/tron-blue/2.png"),
  3: () => import("../assets/themes/tron/tron-blue/3.png"),
  4: () => import("../assets/themes/tron/tron-blue/4.png"),
  5: () => import("../assets/themes/tron/tron-blue/5.png"),
  6: () => import("../assets/themes/tron/tron-blue/6.png"),
  7: () => import("../assets/themes/tron/tron-blue/7.png"),
  8: () => import("../assets/themes/tron/tron-blue/8.png"),
};
