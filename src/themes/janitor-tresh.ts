import type { Theme } from "./Theme";

export const janitorTreshTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/janitor-tresh/mine.png"),
  tile: () => import("../assets/themes/janitor-tresh/tile.png"),
  revealed: () => import("../assets/themes/janitor-tresh/revealed.png"),
  flag: () => import("../assets/themes/janitor-tresh/flag.png"),
  questionMark: () =>
    import("../assets/themes/janitor-tresh/question-mark.png"),
  lastPos: () => import("../assets/themes/janitor-tresh/last-pos.png"),
  1: () => import("../assets/themes/janitor-tresh/1.png"),
  2: () => import("../assets/themes/janitor-tresh/2.png"),
  3: () => import("../assets/themes/janitor-tresh/3.png"),
  4: () => import("../assets/themes/janitor-tresh/4.png"),
  5: () => import("../assets/themes/janitor-tresh/5.png"),
  6: () => import("../assets/themes/janitor-tresh/6.png"),
  7: () => import("../assets/themes/janitor-tresh/7.png"),
  8: () => import("../assets/themes/janitor-tresh/8.png"),
};
