import { even, type Theme } from "./Theme";

export const insectsTheme: Theme = {
  size: 32,
  mine: even(
    () => import("../assets/themes/insects/mine-1.png"),
    () => import("../assets/themes/insects/mine-2.png")
  ),
  tile: () => import("../assets/themes/insects/tile.png"),
  revealed: () => import("../assets/themes/insects/revealed.png"),
  flag: () => import("../assets/themes/insects/flag.png"),
  questionMark: () => import("../assets/themes/insects/question-mark.png"),
  lastPos: () => import("../assets/themes/insects/last-pos.png"),
  1: () => import("../assets/themes/insects/1.png"),
  2: () => import("../assets/themes/insects/2.png"),
  3: () => import("../assets/themes/insects/3.png"),
  4: () => import("../assets/themes/insects/4.png"),
  5: () => import("../assets/themes/insects/5.png"),
  6: () => import("../assets/themes/insects/6.png"),
  7: () => import("../assets/themes/insects/7.png"),
  8: () => import("../assets/themes/insects/8.png"),
};
