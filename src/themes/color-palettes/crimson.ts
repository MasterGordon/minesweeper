import type { Theme } from "../Theme";

export const crimson: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/color-palettes/crimson/mine.png"),
  tile: () => import("../../assets/themes/color-palettes/crimson/tile.png"),
  revealed: () =>
    import("../../assets/themes/color-palettes/crimson/revealed.png"),
  flag: () => import("../../assets/themes/color-palettes/crimson/flag.png"),
  questionMark: () =>
    import("../../assets/themes/color-palettes/crimson/question-mark.png"),
  lastPos: () =>
    import("../../assets/themes/color-palettes/crimson/last-pos.png"),
  1: () => import("../../assets/themes/color-palettes/crimson/1.png"),
  2: () => import("../../assets/themes/color-palettes/crimson/2.png"),
  3: () => import("../../assets/themes/color-palettes/crimson/3.png"),
  4: () => import("../../assets/themes/color-palettes/crimson/4.png"),
  5: () => import("../../assets/themes/color-palettes/crimson/5.png"),
  6: () => import("../../assets/themes/color-palettes/crimson/6.png"),
  7: () => import("../../assets/themes/color-palettes/crimson/7.png"),
  8: () => import("../../assets/themes/color-palettes/crimson/8.png"),
};
