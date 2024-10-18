import type { Theme } from "./Theme";

export const blackAndWhiteTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/black-and-white/mine.png"),
  tile: () => import("../assets/themes/black-and-white/tile.png"),
  revealed: () => import("../assets/themes/black-and-white/revealed.png"),
  flag: () => import("../assets/themes/black-and-white/flag.png"),
  questionMark: () =>
    import("../assets/themes/black-and-white/question-mark.png"),
  lastPos: () => import("../assets/themes/black-and-white/last-pos.png"),
  1: () => import("../assets/themes/black-and-white/1.png"),
  2: () => import("../assets/themes/black-and-white/2.png"),
  3: () => import("../assets/themes/black-and-white/3.png"),
  4: () => import("../assets/themes/black-and-white/4.png"),
  5: () => import("../assets/themes/black-and-white/5.png"),
  6: () => import("../assets/themes/black-and-white/6.png"),
  7: () => import("../assets/themes/black-and-white/7.png"),
  8: () => import("../assets/themes/black-and-white/8.png"),
};
