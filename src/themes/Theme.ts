import type { Texture } from "pixi.js";

type Png = typeof import("*.png");
type LazySprite = () => Promise<Png>;

export interface WeightedLazySprites {
  weight: number;
  sprite: LazySprite;
}

export interface Theme {
  size: number;
  mine: LazySprite | WeightedLazySprites[];
  tile: LazySprite | WeightedLazySprites[];
  revealed: LazySprite | WeightedLazySprites[];
  flag: LazySprite | WeightedLazySprites[];
  questionMark: LazySprite | WeightedLazySprites[];
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
    ...specials.map((sprite) => ({ weight: 0.05, sprite })),
  ];
};
