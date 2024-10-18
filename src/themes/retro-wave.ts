import type { Theme } from "./Theme";

export const retroWaveTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/retro-wave/mine.png"),
  tile: () => import("../assets/themes/retro-wave/tile.png"),
  revealed: () => import("../assets/themes/retro-wave/revealed.png"),
  flag: () => import("../assets/themes/retro-wave/flag.png"),
  questionMark: () => import("../assets/themes/retro-wave/question-mark.png"),
  lastPos: () => import("../assets/themes/retro-wave/last-pos.png"),
  1: () => import("../assets/themes/retro-wave/1.png"),
  2: () => import("../assets/themes/retro-wave/2.png"),
  3: () => import("../assets/themes/retro-wave/3.png"),
  4: () => import("../assets/themes/retro-wave/4.png"),
  5: () => import("../assets/themes/retro-wave/5.png"),
  6: () => import("../assets/themes/retro-wave/6.png"),
  7: () => import("../assets/themes/retro-wave/7.png"),
  8: () => import("../assets/themes/retro-wave/8.png"),
};
