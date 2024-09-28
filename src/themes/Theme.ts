import { useEffect, useState } from "react";

type Png = typeof import("*.png");
type LazySprite = () => Promise<Png>;

export interface Theme {
  size: number;
  mine: LazySprite;
  tile: LazySprite;
  revealed: LazySprite;
  flag: LazySprite;
  questionMark: LazySprite;
  lastPos: LazySprite;
  1: LazySprite;
  2: LazySprite;
  3: LazySprite;
  4: LazySprite;
  5: LazySprite;
  6: LazySprite;
  7: LazySprite;
  8: LazySprite;
}

export type LoadedTheme = Record<Exclude<keyof Theme, "size">, string> & {
  size: number;
};

export const useTheme = (theme: Theme) => {
  const [loadedTheme, setLoadedTheme] = useState<LoadedTheme | undefined>(
    undefined,
  );
  useEffect(() => {
    const loadTheme = async () => {
      const loadedEntries = await Promise.all(
        Object.entries(theme).map(async ([key, value]) => {
          const loaded =
            typeof value === "function" ? (await value()).default : value;
          return [key, loaded] as const;
        }),
      );
      setLoadedTheme(Object.fromEntries(loadedEntries) as LoadedTheme);
    };
    loadTheme();
  }, [theme]);
  return loadedTheme;
};
