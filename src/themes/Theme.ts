import { Assets, Texture } from "pixi.js";
import { useEffect, useState } from "react";

type Png = typeof import("*.png");
type LazySprite = () => Promise<Png>;

interface WeightedLazySprites {
  weight: number;
  sprite: LazySprite;
}

export interface Theme {
  size: number;
  mine: LazySprite | WeightedLazySprites[];
  tile: LazySprite | WeightedLazySprites[];
  revealed: LazySprite;
  flag: LazySprite | WeightedLazySprites[];
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

export type LoadedTexture =
  | Texture
  | {
      weight: number;
      sprite: Texture;
    }[];

export type LoadedTheme = Record<
  Exclude<keyof Theme, "size">,
  LoadedTexture
> & {
  size: number;
};

export const even = (...sprites: LazySprite[]): WeightedLazySprites[] => {
  return sprites.map((sprite) => ({ weight: 0.5, sprite }));
};

export const mainWithSpecials = (
  ...sprites: LazySprite[]
): WeightedLazySprites[] => {
  const [main, ...specials] = sprites;
  return [
    { weight: 1, sprite: main },
    ...specials.map((sprite) => ({ weight: 0.3, sprite })),
  ];
};

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
