import { even, type Theme } from "./Theme";

export const rainbowTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/colors/rainbow/mine.png"),
  tile: even(
    () => import("../assets/themes/colors/blue/tile.png"),
    () => import("../assets/themes/colors/green/tile.png"),
    () => import("../assets/themes/colors/orange/tile.png"),
    () => import("../assets/themes/colors/pink/tile.png"),
    () => import("../assets/themes/colors/red/tile.png"),
    () => import("../assets/themes/colors/turquoise/tile.png"),
    () => import("../assets/themes/colors/yellow/tile.png")
  ),
  revealed: even(
    () => import("../assets/themes/colors/blue/revealed.png"),
    () => import("../assets/themes/colors/green/revealed.png"),
    () => import("../assets/themes/colors/orange/revealed.png"),
    () => import("../assets/themes/colors/pink/revealed.png"),
    () => import("../assets/themes/colors/red/revealed.png"),
    () => import("../assets/themes/colors/turquoise/revealed.png"),
    () => import("../assets/themes/colors/yellow/revealed.png")
  ),
  flag: even(
    () => import("../assets/themes/colors/blue/flag.png"),
    () => import("../assets/themes/colors/green/flag.png"),
    () => import("../assets/themes/colors/orange/flag.png"),
    () => import("../assets/themes/colors/pink/flag.png"),
    () => import("../assets/themes/colors/red/flag.png"),
    () => import("../assets/themes/colors/turquoise/flag.png"),
    () => import("../assets/themes/colors/yellow/flag.png")
  ),
  questionMark: even(
    () => import("../assets/themes/colors/blue/question-mark.png"),
    () => import("../assets/themes/colors/green/question-mark.png"),
    () => import("../assets/themes/colors/orange/question-mark.png"),
    () => import("../assets/themes/colors/pink/question-mark.png"),
    () => import("../assets/themes/colors/red/question-mark.png"),
    () => import("../assets/themes/colors/turquoise/question-mark.png"),
    () => import("../assets/themes/colors/yellow/question-mark.png")
  ),
  lastPos: () => import("../assets/themes/colors/rainbow/last-pos.png"),
  1: () => import("../assets/themes/colors/blue/1.png"),
  2: () => import("../assets/themes/colors/green/2.png"),
  3: () => import("../assets/themes/colors/orange/3.png"),
  4: () => import("../assets/themes/colors/pink/4.png"),
  5: () => import("../assets/themes/colors/red/5.png"),
  6: () => import("../assets/themes/colors/turquoise/6.png"),
  7: () => import("../assets/themes/colors/yellow/7.png"),
  8: () => import("../assets/themes/default/8.png"),
};
