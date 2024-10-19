import type { Theme } from "../Theme";

export const ghostTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/halloween/ghost/mine.png"),
  tile: () => import("../../assets/themes/halloween/ghost/tile.png"),
  revealed: () => import("../../assets/themes/halloween/ghost/revealed.png"),
  flag: () => import("../../assets/themes/halloween/ghost/flag.png"),
  questionMark: () =>
    import("../../assets/themes/halloween/ghost/question-mark.png"),
  lastPos: () => import("../../assets/themes/halloween/ghost/last-pos.png"),
  1: () => import("../../assets/themes/halloween/ghost/1.png"),
  2: () => import("../../assets/themes/halloween/ghost/2.png"),
  3: () => import("../../assets/themes/halloween/ghost/3.png"),
  4: () => import("../../assets/themes/halloween/ghost/4.png"),
  5: () => import("../../assets/themes/halloween/ghost/5.png"),
  6: () => import("../../assets/themes/halloween/ghost/6.png"),
  7: () => import("../../assets/themes/halloween/ghost/7.png"),
  8: () => import("../../assets/themes/halloween/ghost/8.png"),
};
