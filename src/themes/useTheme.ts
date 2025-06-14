import { Assets } from "pixi.js";
import { useState, useEffect } from "react";
import type { Theme, LoadedTheme, WeightedLazySprites } from "./Theme";

export const useTheme = (theme: Theme) => {
  const [loadedTheme, setLoadedTheme] = useState<LoadedTheme | undefined>(
    undefined,
  );
  useEffect(() => {
    const loadTheme = async () => {
      const loadedEntries = await Promise.all(
        Object.entries(theme).map(async ([key, value]) => {
          let loaded = value;
          if (typeof value === "function") {
            loaded = await Assets.load((await value()).default);
          }
          if (Array.isArray(value)) {
            loaded = await Promise.all(
              loaded.map(async (sprite: WeightedLazySprites) => {
                return {
                  weight: sprite.weight,
                  sprite: await Assets.load((await sprite.sprite()).default),
                };
              }),
            );
          }

          return [key, loaded] as const;
        }),
      );
      setLoadedTheme(Object.fromEntries(loadedEntries) as LoadedTheme);
    };
    loadTheme();
  }, [theme]);
  return loadedTheme;
};
