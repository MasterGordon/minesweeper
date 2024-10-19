import type { Theme } from "../Theme";

export const zombieTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/halloween/zombie/mine.png"),
  tile: () => import("../../assets/themes/halloween/zombie/tile.png"),
  revealed: () => import("../../assets/themes/halloween/zombie/revealed.png"),
  flag: () => import("../../assets/themes/halloween/zombie/flag.png"),
  questionMark: () =>
    import("../../assets/themes/halloween/zombie/question-mark.png"),
  lastPos: () => import("../../assets/themes/halloween/zombie/last-pos.png"),
  1: () => import("../../assets/themes/halloween/zombie/1.png"),
  2: () => import("../../assets/themes/halloween/zombie/2.png"),
  3: () => import("../../assets/themes/halloween/zombie/3.png"),
  4: () => import("../../assets/themes/halloween/zombie/4.png"),
  5: () => import("../../assets/themes/halloween/zombie/5.png"),
  6: () => import("../../assets/themes/halloween/zombie/6.png"),
  7: () => import("../../assets/themes/halloween/zombie/7.png"),
  8: () => import("../../assets/themes/halloween/zombie/8.png"),
};
