import type { Theme } from "../Theme";

export const pumpkinTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/halloween/pumpkin/mine.png"),
  tile: () => import("../../assets/themes/halloween/pumpkin/tile.png"),
  revealed: () => import("../../assets/themes/halloween/pumpkin/revealed.png"),
  flag: () => import("../../assets/themes/halloween/pumpkin/flag.png"),
  questionMark: () =>
    import("../../assets/themes/halloween/pumpkin/question-mark.png"),
  lastPos: () => import("../../assets/themes/halloween/pumpkin/last-pos.png"),
  1: () => import("../../assets/themes/halloween/pumpkin/1.png"),
  2: () => import("../../assets/themes/halloween/pumpkin/2.png"),
  3: () => import("../../assets/themes/halloween/pumpkin/3.png"),
  4: () => import("../../assets/themes/halloween/pumpkin/4.png"),
  5: () => import("../../assets/themes/halloween/pumpkin/5.png"),
  6: () => import("../../assets/themes/halloween/pumpkin/6.png"),
  7: () => import("../../assets/themes/halloween/pumpkin/7.png"),
  8: () => import("../../assets/themes/halloween/pumpkin/8.png"),
};
