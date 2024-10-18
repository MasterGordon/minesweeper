import { even, type Theme } from "./Theme";

export const dinoTheme: Theme = {
  size: 32,
  mine: even(
    () => import("../assets/themes/dinos/mine-1.png"),
    () => import("../assets/themes/dinos/mine-2.png")
  ),
  tile: () => import("../assets/themes/dinos/tile.png"),
  revealed: () => import("../assets/themes/dinos/revealed-1.png"),
  flag: () => import("../assets/themes/dinos/flag.png"),
  questionMark: () => import("../assets/themes/dinos/question-mark.png"),
  lastPos: () => import("../assets/themes/dinos/last-pos.png"),
  1: () => import("../assets/themes/dinos/1.png"),
  2: () => import("../assets/themes/dinos/2.png"),
  3: () => import("../assets/themes/dinos/3.png"),
  4: () => import("../assets/themes/dinos/4.png"),
  5: () => import("../assets/themes/dinos/5.png"),
  6: () => import("../assets/themes/dinos/6.png"),
  7: () => import("../assets/themes/dinos/7.png"),
  8: () => import("../assets/themes/dinos/8.png"),
};
