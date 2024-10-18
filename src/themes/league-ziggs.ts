import type { Theme } from "./Theme";

export const leagueZiggsTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/league/ziggs/mine.png"),
  tile: () => import("../assets/themes/league/tile-1.png"),
  revealed: () => import("../assets/themes/league/revealed.png"),
  flag: () => import("../assets/themes/league/ziggs/flag.png"),
  questionMark: () => import("../assets/themes/league/question-mark.png"),
  lastPos: () => import("../assets/themes/league/last-pos.png"),
  1: () => import("../assets/themes/league/1.png"),
  2: () => import("../assets/themes/league/2.png"),
  3: () => import("../assets/themes/league/3.png"),
  4: () => import("../assets/themes/league/4.png"),
  5: () => import("../assets/themes/league/5.png"),
  6: () => import("../assets/themes/league/6.png"),
  7: () => import("../assets/themes/league/7.png"),
  8: () => import("../assets/themes/league/8.png"),
};
