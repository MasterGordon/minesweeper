import { Theme } from "../Theme";

export const dwarfFortressTheme: Theme = {
  size: 32,
  mine: () => import("../../assets/themes/color-palettes/dwarf-fortress/mine.png"),
  tile: () => import("../../assets/themes/color-palettes/dwarf-fortress/tile.png"),
  revealed: () => import("../../assets/themes/color-palettes/dwarf-fortress/revealed.png"),
  flag: () => import("../../assets/themes/color-palettes/dwarf-fortress/flag.png"),
  questionMark: () =>
    import("../../assets/themes/color-palettes/dwarf-fortress/question-mark.png"),
  lastPos: () => import("../../assets/themes/color-palettes/dwarf-fortress/last-pos.png"),
  1: () => import("../../assets/themes/color-palettes/dwarf-fortress/1.png"),
  2: () => import("../../assets/themes/color-palettes/dwarf-fortress/2.png"),
  3: () => import("../../assets/themes/color-palettes/dwarf-fortress/3.png"),
  4: () => import("../../assets/themes/color-palettes/dwarf-fortress/4.png"),
  5: () => import("../../assets/themes/color-palettes/dwarf-fortress/5.png"),
  6: () => import("../../assets/themes/color-palettes/dwarf-fortress/6.png"),
  7: () => import("../../assets/themes/color-palettes/dwarf-fortress/7.png"),
  8: () => import("../../assets/themes/color-palettes/dwarf-fortress/8.png"),
};
