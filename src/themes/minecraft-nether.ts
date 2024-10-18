import type { Theme } from "./Theme";

export const minecraftNetherTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/minecraft-nether/mine.png"),
  tile: () => import("../assets/themes/minecraft-nether/tile.png"),
  revealed: () => import("../assets/themes/minecraft-nether/revealed.png"),
  flag: () => import("../assets/themes/minecraft-nether/flag.png"),
  questionMark: () =>
    import("../assets/themes/minecraft-nether/question-mark.png"),
  lastPos: () => import("../assets/themes/minecraft-nether/last-pos.png"),
  1: () => import("../assets/themes/minecraft-nether/1.png"),
  2: () => import("../assets/themes/minecraft-nether/2.png"),
  3: () => import("../assets/themes/minecraft-nether/3.png"),
  4: () => import("../assets/themes/minecraft-nether/4.png"),
  5: () => import("../assets/themes/minecraft-nether/5.png"),
  6: () => import("../assets/themes/minecraft-nether/6.png"),
  7: () => import("../assets/themes/minecraft-nether/7.png"),
  8: () => import("../assets/themes/minecraft-nether/8.png"),
};
