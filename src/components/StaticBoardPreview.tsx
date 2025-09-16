import { useEffect, useState } from "react";
import { Application, Container, Sprite, Texture } from "pixi.js";
import type { ServerGame, ClientGame } from "../../shared/game";
import { useTheme } from "../themes/useTheme";
import { themes } from "../themes";
import { getValue, isServerGame } from "../../shared/game";
import type { LoadedTexture, LoadedTheme } from "../themes/Theme";
import { weightedPickRandom } from "../../shared/utils";
import gen from "random-seed";

// Cache for static board previews with size limit
const MAX_CACHE_SIZE = 250;
const previewCache = new Map<string, string>();

// Helper function to manage cache size
const addToCache = (key: string, value: string) => {
  // If cache is at max size, remove the oldest entry
  if (previewCache.size >= MAX_CACHE_SIZE) {
    const firstKey = previewCache.keys().next().value;
    if (firstKey) {
      previewCache.delete(firstKey);
    }
  }
  previewCache.set(key, value);
};

interface StaticBoardPreviewProps {
  game: ServerGame | ClientGame;
  width: number;
  height: number;
  className?: string;
}

const StaticBoardPreview: React.FC<StaticBoardPreviewProps> = ({
  game,
  width,
  height,
  className,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const theme = useTheme(themes.find((t) => t.id === game.theme)!.theme);

  useEffect(() => {
    if (!theme) return;

    // Generate a cache key based on game state and dimensions
    const cacheKey = `${game.theme}-${game.uuid}-${width}x${height}`;

    // Check if we have a cached image
    const cachedImage = previewCache.get(cacheKey);
    if (cachedImage) {
      setImageUrl(cachedImage);
      return;
    }

    const generateStaticImage = async () => {
      // Create a temporary Pixi application for rendering
      const app = new Application();
      await app.init({
        width,
        height,
        backgroundAlpha: 0,
        preference: "webgl",
      });

      const container = new Container();
      app.stage.addChild(container);

      // Helper function to resolve sprites
      const resolveSprite = (lt: LoadedTexture, x: number, y: number) => {
        if (Array.isArray(lt)) {
          const rng = gen.create(game.uuid + ";" + x + ";" + y);
          return weightedPickRandom(
            lt,
            (i) => i.weight,
            (tw) => rng.floatBetween(0, tw),
          ).sprite;
        }
        return lt;
      };

      // Render all tiles
      for (let i = 0; i < game.width; i++) {
        for (let j = 0; j < game.height; j++) {
          const isRevealed = game.isRevealed[i][j];
          const value = isServerGame(game)
            ? getValue(game.mines, i, j)
            : game.values[i][j];
          const isMine = isServerGame(game) ? game.mines[i][j] : false;
          const isFlagged = game.isFlagged[i][j];
          const isQuestionMark = game.isQuestionMark[i][j];

          // Base tile
          const baseTexture =
            isRevealed || (isMine && !isFlagged)
              ? resolveSprite(theme.revealed, i, j)
              : resolveSprite(theme.tile, i, j);

          const baseSprite = new Sprite(baseTexture);
          baseSprite.x = i * theme.size;
          baseSprite.y = j * theme.size;
          container.addChild(baseSprite);

          // Content overlay
          let contentTexture: Texture | null = null;
          if (isFlagged) {
            contentTexture = resolveSprite(theme.flag, i, j);
          } else if (isMine) {
            contentTexture = resolveSprite(theme.mine, i, j);
          } else if (value !== -1 && isRevealed) {
            const numberTexture = theme[
              value.toString() as keyof LoadedTheme
            ] as Texture;
            if (numberTexture) {
              contentTexture = numberTexture;
            }
          } else if (isQuestionMark) {
            contentTexture = resolveSprite(theme.questionMark, i, j);
          }

          if (contentTexture) {
            const contentSprite = new Sprite(contentTexture);
            contentSprite.x = i * theme.size + theme.size * 0.5;
            contentSprite.y = j * theme.size + theme.size * 0.5;
            contentSprite.anchor.set(0.5);
            container.addChild(contentSprite);
          }
        }
      }

      // Render to canvas and create data URL
      app.renderer.render(container);
      const canvas = app.canvas;
      const dataUrl = canvas.toDataURL();

      // Cache the generated image
      addToCache(cacheKey, dataUrl);
      setImageUrl(dataUrl);

      // Clean up
      app.destroy(true);
    };

    generateStaticImage().catch(console.error);
  }, [game, theme, width, height]);

  if (!imageUrl) {
    return (
      <div
        className={className}
        style={{ width, height, backgroundColor: "#1a1a1a" }}
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt="Board preview"
      className={className}
      style={{ width, height, imageRendering: "pixelated" }}
    />
  );
};

export default StaticBoardPreview;

