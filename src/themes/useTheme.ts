import { Assets, Texture } from "pixi.js";
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
            const texture = await Assets.load<Texture>((await value()).default);
            texture.source.scaleMode = "nearest";
            loaded = texture;
          }
          if (Array.isArray(value)) {
            loaded = await Promise.all(
              loaded.map(async (sprite: WeightedLazySprites) => {
                const texture = await Assets.load<Texture>(
                  (await sprite.sprite()).default,
                );
                texture.source.scaleMode = "nearest";
                return {
                  weight: sprite.weight,
                  sprite: texture,
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
