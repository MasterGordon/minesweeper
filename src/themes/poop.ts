import { Theme } from "./Theme";

export const poopTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/poop/mine.png"),
  tile: () => import("../assets/themes/poop/tile.png"),
  revealed: () => import("../assets/themes/poop/revealed.png"),
  flag: () => import("../assets/themes/poop/flag.png"),
  questionMark: () => import("../assets/themes/poop/question-mark.png"),
  lastPos: () => import("../assets/themes/poop/last-pos.png"),
  1: () => import("../assets/themes/poop/1.png"),
  2: () => import("../assets/themes/poop/2.png"),
  3: () => import("../assets/themes/poop/3.png"),
  4: () => import("../assets/themes/poop/4.png"),
  5: () => import("../assets/themes/poop/5.png"),
  6: () => import("../assets/themes/poop/6.png"),
  7: () => import("../assets/themes/poop/7.png"),
  8: () => import("../assets/themes/poop/8.png"),
};
