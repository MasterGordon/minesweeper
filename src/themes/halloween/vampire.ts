import type { Theme } from "../Theme";

export const vampireTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/halloween/vampire/mine.png"),
  tile: () => import("../../assets/themes/halloween/vampire/tile.png"),
  revealed: () => import("../../assets/themes/halloween/vampire/revealed.png"),
  flag: () => import("../../assets/themes/halloween/vampire/flag.png"),
  questionMark: () =>
    import("../../assets/themes/halloween/vampire/question-mark.png"),
  lastPos: () => import("../../assets/themes/halloween/vampire/last-pos.png"),
  1: () => import("../../assets/themes/halloween/vampire/1.png"),
  2: () => import("../../assets/themes/halloween/vampire/2.png"),
  3: () => import("../../assets/themes/halloween/vampire/3.png"),
  4: () => import("../../assets/themes/halloween/vampire/4.png"),
  5: () => import("../../assets/themes/halloween/vampire/5.png"),
  6: () => import("../../assets/themes/halloween/vampire/6.png"),
  7: () => import("../../assets/themes/halloween/vampire/7.png"),
  8: () => import("../../assets/themes/halloween/vampire/8.png"),
};
