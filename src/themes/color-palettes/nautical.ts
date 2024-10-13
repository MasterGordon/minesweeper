import { Theme } from "../Theme";

export const nauticalTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/color-palettes/nautical/mine.png"),
  tile: () => import("../../assets/themes/color-palettes/nautical/tile.png"),
  revealed: () => import("../../assets/themes/color-palettes/nautical/revealed.png"),
  flag: () => import("../../assets/themes/color-palettes/nautical/flag.png"),
  questionMark: () =>
    import("../../assets/themes/color-palettes/nautical/question-mark.png"),
  lastPos: () => import("../../assets/themes/color-palettes/nautical/last-pos.png"),
  1: () => import("../../assets/themes/color-palettes/nautical/1.png"),
  2: () => import("../../assets/themes/color-palettes/nautical/2.png"),
  3: () => import("../../assets/themes/color-palettes/nautical/3.png"),
  4: () => import("../../assets/themes/color-palettes/nautical/4.png"),
  5: () => import("../../assets/themes/color-palettes/nautical/5.png"),
  6: () => import("../../assets/themes/color-palettes/nautical/6.png"),
  7: () => import("../../assets/themes/color-palettes/nautical/7.png"),
  8: () => import("../../assets/themes/color-palettes/nautical/8.png"),
};
