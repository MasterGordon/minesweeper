import type { Theme } from "./Theme";

export const halliGalliTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/halli-galli/mine.png"),
  tile: () => import("../assets/themes/halli-galli/tile.png"),
  revealed: () => import("../assets/themes/halli-galli/revealed.png"),
  flag: () => import("../assets/themes/halli-galli/flag.png"),
  questionMark: () => import("../assets/themes/halli-galli/question-mark.png"),
  lastPos: () => import("../assets/themes/halli-galli/last-pos.png"),
  1: () => import("../assets/themes/halli-galli/1.png"),
  2: () => import("../assets/themes/halli-galli/2.png"),
  3: () => import("../assets/themes/halli-galli/3.png"),
  4: () => import("../assets/themes/halli-galli/4.png"),
  5: () => import("../assets/themes/halli-galli/5.png"),
  6: () => import("../assets/themes/halli-galli/6.png"),
  7: () => import("../assets/themes/halli-galli/7.png"),
  8: () => import("../assets/themes/halli-galli/8.png"),
};
