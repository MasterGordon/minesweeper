import { even, type Theme } from "./Theme";

export const techiesDireTheme: Theme = {
  size: 32,
  mine: even(
    () => import("../assets/themes/techies/dire/mine-1.png"),
    () => import("../assets/themes/techies/dire/mine-2.png"),
  ),
  tile: () => import("../assets/themes/techies/dire/tile-1.png"),
  revealed: () => import("../assets/themes/techies/dire/revealed.png"),
  flag: () => import("../assets/themes/techies/flag.png"),
  questionMark: () => import("../assets/themes/techies/dire/question-mark.png"),
  lastPos: () => import("../assets/themes/techies/dire/last-pos.png"),
  1: () => import("../assets/themes/techies/dire/1.png"),
  2: () => import("../assets/themes/techies/dire/2.png"),
  3: () => import("../assets/themes/techies/dire/3.png"),
  4: () => import("../assets/themes/techies/dire/4.png"),
  5: () => import("../assets/themes/techies/dire/5.png"),
  6: () => import("../assets/themes/techies/dire/6.png"),
  7: () => import("../assets/themes/techies/dire/7.png"),
  8: () => import("../assets/themes/techies/dire/8.png"),
};
