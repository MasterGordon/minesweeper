import type { Theme } from "./Theme";

export const circuitBinaryTheme: Theme = {
  size: 32,
  mine: () => import("../assets/themes/circuit/mine.png"),
  tile: () => import("../assets/themes/circuit/tile.png"),
  revealed: () => import("../assets/themes/circuit/revealed.png"),
  flag: () => import("../assets/themes/circuit/flag.png"),
  questionMark: () => import("../assets/themes/circuit/question-mark.png"),
  lastPos: () => import("../assets/themes/circuit/last-pos.png"),
  1: () => import("../assets/themes/circuit/binary/5.png"),
  2: () => import("../assets/themes/circuit/binary/6.png"),
  3: () => import("../assets/themes/circuit/binary/7.png"),
  4: () => import("../assets/themes/circuit/binary/8.png"),
  5: () => import("../assets/themes/circuit/binary/5.png"),
  6: () => import("../assets/themes/circuit/binary/6.png"),
  7: () => import("../assets/themes/circuit/binary/7.png"),
  8: () => import("../assets/themes/circuit/binary/8.png"),
};
