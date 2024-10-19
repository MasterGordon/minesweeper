import type { Theme } from "../Theme";

export const skeletonTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/halloween/skeleton/mine.png"),
  tile: () => import("../../assets/themes/halloween/skeleton/tile.png"),
  revealed: () => import("../../assets/themes/halloween/skeleton/revealed.png"),
  flag: () => import("../../assets/themes/halloween/skeleton/flag.png"),
  questionMark: () =>
    import("../../assets/themes/halloween/skeleton/question-mark.png"),
  lastPos: () => import("../../assets/themes/halloween/skeleton/last-pos.png"),
  1: () => import("../../assets/themes/halloween/skeleton/1.png"),
  2: () => import("../../assets/themes/halloween/skeleton/2.png"),
  3: () => import("../../assets/themes/halloween/skeleton/3.png"),
  4: () => import("../../assets/themes/halloween/skeleton/4.png"),
  5: () => import("../../assets/themes/halloween/skeleton/5.png"),
  6: () => import("../../assets/themes/halloween/skeleton/6.png"),
  7: () => import("../../assets/themes/halloween/skeleton/7.png"),
  8: () => import("../../assets/themes/halloween/skeleton/8.png"),
};
