import type { Theme } from "../Theme";

export const shadowWarriorTheme: Theme = {
  size: 32,
  mine: () =>
    import("../../assets/themes/color-palettes/shadow-warrior/mine.png"),
  tile: () =>
    import("../../assets/themes/color-palettes/shadow-warrior/tile.png"),
  revealed: () =>
    import("../../assets/themes/color-palettes/shadow-warrior/revealed.png"),
  flag: () =>
    import("../../assets/themes/color-palettes/shadow-warrior/flag.png"),
  questionMark: () =>
    import(
      "../../assets/themes/color-palettes/shadow-warrior/question-mark.png"
    ),
  lastPos: () =>
    import("../../assets/themes/color-palettes/shadow-warrior/last-pos.png"),
  1: () => import("../../assets/themes/color-palettes/shadow-warrior/1.png"),
  2: () => import("../../assets/themes/color-palettes/shadow-warrior/2.png"),
  3: () => import("../../assets/themes/color-palettes/shadow-warrior/3.png"),
  4: () => import("../../assets/themes/color-palettes/shadow-warrior/4.png"),
  5: () => import("../../assets/themes/color-palettes/shadow-warrior/5.png"),
  6: () => import("../../assets/themes/color-palettes/shadow-warrior/6.png"),
  7: () => import("../../assets/themes/color-palettes/shadow-warrior/7.png"),
  8: () => import("../../assets/themes/color-palettes/shadow-warrior/8.png"),
};
