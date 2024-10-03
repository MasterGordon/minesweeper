import { Theme } from "./Theme";

export const minecraftOverworldTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/minecraft-overworld/mine.png"),
  tile: () => import("../assets/themes/minecraft-overworld/tile.png"),
  revealed: () => import("../assets/themes/minecraft-overworld/revealed.png"),
  flag: () => import("../assets/themes/minecraft-overworld/flag.png"),
  questionMark: () => import("../assets/themes/minecraft-overworld/question-mark.png"),
  lastPos: () => import("../assets/themes/minecraft-overworld/last-pos.png"),
  1: () => import("../assets/themes/minecraft-overworld/1.png"),
  2: () => import("../assets/themes/minecraft-overworld/2.png"),
  3: () => import("../assets/themes/minecraft-overworld/3.png"),
  4: () => import("../assets/themes/minecraft-overworld/4.png"),
  5: () => import("../assets/themes/minecraft-overworld/5.png"),
  6: () => import("../assets/themes/minecraft-overworld/6.png"),
  7: () => import("../assets/themes/minecraft-overworld/7.png"),
  8: () => import("../assets/themes/minecraft-overworld/8.png"),
};
