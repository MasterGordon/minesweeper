import type { Theme } from "./Theme";

export const mineDogsTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/mine-dogs/mine.png"),
  tile: () => import("../assets/themes/mine-dogs/tile.png"),
  revealed: () => import("../assets/themes/mine-dogs/revealed.png"),
  flag: () => import("../assets/themes/mine-dogs/flag-2.png"),
  questionMark: () => import("../assets/themes/mine-dogs/question-mark.png"),
  lastPos: () => import("../assets/themes/mine-dogs/last-pos.png"),
  1: () => import("../assets/themes/mine-dogs/1.png"),
  2: () => import("../assets/themes/mine-dogs/2.png"),
  3: () => import("../assets/themes/mine-dogs/3.png"),
  4: () => import("../assets/themes/mine-dogs/4.png"),
  5: () => import("../assets/themes/mine-dogs/5.png"),
  6: () => import("../assets/themes/mine-dogs/6.png"),
  7: () => import("../assets/themes/mine-dogs/7.png"),
  8: () => import("../assets/themes/mine-dogs/8.png"),
};
