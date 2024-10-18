import { even, mainWithSpecials, type Theme } from "./Theme";

export const techiesRadiantTheme: Theme = {
  size: 32,
  mine: even(
    () => import("../assets/themes/techies/radiant/mine-1.png"),
    () => import("../assets/themes/techies/radiant/mine-2.png")
  ),
  tile: mainWithSpecials(
    () => import("../assets/themes/techies/radiant/tile-1.png"),
    () => import("../assets/themes/techies/radiant/tile-2.png"),
    () => import("../assets/themes/techies/radiant/tile-3.png")
  ),
  revealed: () => import("../assets/themes/techies/radiant/revealed-1.png"),
  flag: () => import("../assets/themes/techies/flag.png"),
  questionMark: () =>
    import("../assets/themes/techies/radiant/question-mark.png"),
  lastPos: () => import("../assets/themes/techies/radiant/last-pos.png"),
  1: () => import("../assets/themes/techies/radiant/1.png"),
  2: () => import("../assets/themes/techies/radiant/2.png"),
  3: () => import("../assets/themes/techies/radiant/3.png"),
  4: () => import("../assets/themes/techies/radiant/4.png"),
  5: () => import("../assets/themes/techies/radiant/5.png"),
  6: () => import("../assets/themes/techies/radiant/6.png"),
  7: () => import("../assets/themes/techies/radiant/7.png"),
  8: () => import("../assets/themes/techies/radiant/8.png"),
};
