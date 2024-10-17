import { Theme } from "../Theme";

export const upInSmokeTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/color-palettes/up-in-smoke/mine.png"),
  tile: () => import("../../assets/themes/color-palettes/up-in-smoke/tile.png"),
  revealed: () =>
    import("../../assets/themes/color-palettes/up-in-smoke/revealed.png"),
  flag: () => import("../../assets/themes/color-palettes/up-in-smoke/flag.png"),
  questionMark: () =>
    import("../../assets/themes/color-palettes/up-in-smoke/question-mark.png"),
  lastPos: () =>
    import("../../assets/themes/color-palettes/up-in-smoke/last-pos.png"),
  1: () => import("../../assets/themes/color-palettes/up-in-smoke/1.png"),
  2: () => import("../../assets/themes/color-palettes/up-in-smoke/2.png"),
  3: () => import("../../assets/themes/color-palettes/up-in-smoke/3.png"),
  4: () => import("../../assets/themes/color-palettes/up-in-smoke/4.png"),
  5: () => import("../../assets/themes/color-palettes/up-in-smoke/5.png"),
  6: () => import("../../assets/themes/color-palettes/up-in-smoke/6.png"),
  7: () => import("../../assets/themes/color-palettes/up-in-smoke/7.png"),
  8: () => import("../../assets/themes/color-palettes/up-in-smoke/8.png"),
};
