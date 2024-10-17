import { Theme } from "./Theme";

export const tronOrangeTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/tron/tron-orange/mine.png"),
  tile: () => import("../assets/themes/tron/tron-orange/tile.png"),
  revealed: () => import("../assets/themes/tron/tron-orange/revealed.png"),
  flag: () => import("../assets/themes/tron/tron-orange/flag.png"),
  questionMark: () =>
    import("../assets/themes/tron/tron-orange/question-mark.png"),
  lastPos: () => import("../assets/themes/tron/tron-orange/last-pos.png"),
  1: () => import("../assets/themes/tron/tron-orange/1.png"),
  2: () => import("../assets/themes/tron/tron-orange/2.png"),
  3: () => import("../assets/themes/tron/tron-orange/3.png"),
  4: () => import("../assets/themes/tron/tron-orange/4.png"),
  5: () => import("../assets/themes/tron/tron-orange/5.png"),
  6: () => import("../assets/themes/tron/tron-orange/6.png"),
  7: () => import("../assets/themes/tron/tron-orange/7.png"),
  8: () => import("../assets/themes/tron/tron-orange/8.png"),
};
