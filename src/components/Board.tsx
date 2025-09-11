import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type LoadedTexture,
  type LoadedTheme,
  type Theme,
} from "../themes/Theme";
import { useTheme } from "../themes/useTheme";
import { Container, Sprite, Stage, useTick } from "@pixi/react";
import Viewport from "./pixi/PixiViewport";
import type { Viewport as PixiViewport } from "pixi-viewport";
import {
  type ClientGame,
  getValue,
  isServerGame,
  type ServerGame,
} from "../../shared/game";
import { useWSQuery } from "../hooks";
import { Texture } from "pixi.js";
import { useAtom } from "jotai";
import { cursorXAtom, cursorYAtom } from "../atoms";
import Coords from "./Coords";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { Maximize2, Minimize2, RotateCcw } from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import explosion from "../sound/explosion.mp3";
import "@pixi/canvas-display";
import "@pixi/canvas-extract";
import "@pixi/canvas-graphics";
import "@pixi/canvas-mesh";
import "@pixi/canvas-particle-container";
import "@pixi/canvas-prepare";
import "@pixi/canvas-renderer";
import "@pixi/canvas-sprite-tiling";
import "@pixi/canvas-sprite";
import "@pixi/canvas-text";
import { themes } from "../themes";
import { weightedPickRandom } from "../../shared/utils";
import gen from "random-seed";
import type { UserSettings } from "../../shared/user-settings";

interface BoardProps {
  className?: string;
  game: ServerGame | ClientGame;
  onLeftClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
  restartGame: () => void;
  width?: number;
  height?: number;
}

interface ViewportInfo {
  width: number;
  height: number;
  x: number;
  y: number;
}

const toViewportInfo = (viewport: PixiViewport) => {
  return {
    x: -viewport.x / viewport.scaled,
    y: -viewport.y / viewport.scaled,
    width: viewport.screenWidth / viewport.scaled,
    height: viewport.screenHeight / viewport.scaled,
  };
};

const Board: React.FC<BoardProps> = (props) => {
  const { game, restartGame } = props;
  const { data: user } = useWSQuery("user.getSelf", null);
  const { data: settings } = useWSQuery("user.getSettings", null);
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const showLastPos = game.user !== user || isServerGame(game);
  const [playSound] = useAudio(explosion, {
    volume: 0.5,
  });

  useEffect(() => {
    if (isServerGame(game) && game.finished > Date.now() - 100) {
      playSound();
    }
  }, [game, playSound]);

  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onViewportChange = useCallback((viewport: PixiViewport) => {
    setViewport((v) => {
      const { width, height, x, y } = toViewportInfo(viewport);
      if (v.width !== width || v.height !== height) {
        return { width, height, x, y };
      }
      if (Math.abs(v.x - x) > 16 || Math.abs(v.y - y) > 16) {
        return { width, height, x, y };
      }
      return v;
    });
  }, []);
  useEffect(() => {
    setInterval(() => {
      if (viewportRef.current) onViewportChange(viewportRef.current);
    }, 200);
  }, [game.width, game.height, onViewportChange]);
  useEffect(() => {
    if (!ref.current) return;
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
    if (viewportRef.current) onViewportChange(viewportRef.current);
    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
        if (viewportRef.current) onViewportChange(viewportRef.current);
      }
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [onViewportChange]);
  const theme = useTheme(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    themes.find((t) => t.id === (game.theme as any))!.theme,
  );
  const boardWidth = game.width * (theme?.size || 0);
  const boardHeight = game.height * (theme?.size || 0);

  const viewportRef = useRef<PixiViewport>(null);
  const [zenMode, setZenMode] = useState(false);
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("wheel", (e) => {
        e.preventDefault();
      });
    }
  }, [ref]);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZenMode(false);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div
        className={cn(
          "w-full h-[70vh] overflow-hidden outline-white/40 outline-2 flex flex-col",
          zenMode && "fixed top-0 left-0 z-50 right-0 bottom-0 h-[100vh]",
          props.className,
        )}
        style={{
          width: props.width ? `${props.width}px` : undefined,
          height: props.height ? `${props.height}px` : undefined,
        }}
        ref={ref}
      >
        <div className="relative">
          {!props.width && !props.height && (
            <div className="absolute right-4 top-4 text-white/70 flex gap-2">
              <Button variant="ghost" onClick={() => restartGame()} size="sm">
                <RotateCcw className="size-4" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setZenMode(!zenMode)}
                size="sm"
              >
                {!zenMode ? (
                  <Maximize2 className="size-4" />
                ) : (
                  <Minimize2 className="size-4" />
                )}
              </Button>
            </div>
          )}
          {zenMode && (
            <div className="absolute top-4 left-4 w-full h-full text-white/70 font-mono text-lg flex">
              {game.minesCount - game.isFlagged.flat().filter((f) => f).length}
              {" | "}
              Stage {game.stage}
            </div>
          )}
        </div>
        {theme && (
          <Stage
            options={{ hello: true, forceCanvas: !!props.width }}
            width={width}
            height={height}
            className="select-none"
          >
            <Viewport
              viewportRef={viewportRef}
              worldWidth={boardWidth}
              worldHeight={boardHeight}
              width={width}
              height={height}
              clamp={
                props.width || props.height
                  ? { left: 0, right: boardWidth, top: 0, bottom: boardHeight }
                  : {
                      left: -theme.size,
                      right: boardWidth + theme.size,
                      top: -theme.size,
                      bottom: boardHeight + theme.size,
                    }
              }
              clampZoom={{
                minScale: 1,
              }}
              onViewportChange={onViewportChange}
            >
              {Array.from({ length: game.width }).map((_, i) => {
                return Array.from({ length: game.height }).map((_, j) => {
                  const tollerance = theme.size * 3;
                  if (i * theme.size > viewport.x + viewport.width + tollerance)
                    return null;
                  if (i * theme.size < viewport.x - tollerance) return null;
                  if (
                    j * theme.size >
                    viewport.y + viewport.height + tollerance
                  )
                    return null;
                  if (j * theme.size < viewport.y - tollerance) return null;
                  return (
                    <Tile
                      key={`${i},${j}`}
                      x={i}
                      y={j}
                      game={game}
                      theme={theme}
                      showLastPos={showLastPos}
                      onLeftClick={props.onLeftClick}
                      onRightClick={props.onRightClick}
                      userSettings={settings}
                    />
                  );
                });
              })}
            </Viewport>
          </Stage>
        )}
      </div>
      {!props.width && !props.height && <Coords />}
    </div>
  );
};

interface TileProps {
  x: number;
  y: number;
  game: ServerGame | ClientGame;
  theme: LoadedTheme;
  showLastPos: boolean;
  onLeftClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
  userSettings?: UserSettings | undefined;
}

const Tile = ({
  game,
  x,
  y,
  theme,
  showLastPos,
  onRightClick,
  onLeftClick,
  userSettings,
}: TileProps) => {
  const resolveSprite = useCallback(
    (lt: LoadedTexture) => {
      if (Array.isArray(lt)) {
        const rng = gen.create(game.uuid + ";" + x + ";" + y);
        return weightedPickRandom(
          lt,
          (i) => i.weight,
          (tw) => rng.floatBetween(0, tw),
        ).sprite;
      }
      return lt;
    },
    [game.uuid, x, y],
  );
  const i = x;
  const j = y;
  const isRevealed = game.isRevealed[i][j];
  const value = isServerGame(game)
    ? getValue(game.mines, i, j)
    : game.values[i][j];
  const isMine = isServerGame(game) ? game.mines[i][j] : false;
  const isLastPos = showLastPos
    ? game.lastClick[0] === i && game.lastClick[1] === j
    : false;
  const isFlagged = game.isFlagged[i][j];
  const isQuestionMark = game.isQuestionMark[i][j];
  const base =
    isRevealed || (isMine && !isFlagged) ? (
      <Sprite key="b" texture={resolveSprite(theme.revealed)} />
    ) : (
      <Sprite key="b" texture={resolveSprite(theme.tile)} />
    );
  const extra = isLastPos ? (
    <Sprite key="e" texture={resolveSprite(theme.lastPos)} />
  ) : null;
  const touchStart = useRef<number>(0);
  const isMove = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const oldState = useRef<string>(`${isRevealed},${isMine},${value}`);
  const [scale, setScale] = useState(1);
  const [doTick, setDoTick] = useState(true);
  const frame = useRef<number>(0);
  useEffect(() => {
    if (userSettings?.showRevealAnimation === false) return;
    if (oldState.current !== `${isRevealed},${isMine},${value}`) {
      oldState.current = `${isRevealed},${isMine},${value}`;
      frame.current = 0;
      setDoTick(true);
    }
  }, [isMine, isRevealed, userSettings?.showRevealAnimation, value]);
  useTick((delta) => {
    frame.current += delta * 0.1;
    if (frame.current > 3) {
      setDoTick(false);
    }
    setScale(Math.max(1, -2 * Math.pow(frame.current - 0.5, 2) + 1.2));
  }, doTick);
  const baseProps = useMemo(
    () => ({
      scale,
      x: theme.size * 0.5,
      y: theme.size * 0.5,
      anchor: 0.5,
    }),
    [scale, theme.size],
  );
  let content: ReactNode = null;
  if (isFlagged) {
    content = (
      <Sprite key="c" texture={resolveSprite(theme.flag)} {...baseProps} />
    );
  } else if (isMine) {
    content = (
      <Sprite key="c" texture={resolveSprite(theme.mine)} {...baseProps} />
    );
  } else if (value !== -1 && isRevealed) {
    const img = theme[value.toString() as keyof Theme] as Texture;
    content = img ? <Sprite key="c" texture={img} {...baseProps} /> : null;
  } else if (isQuestionMark) {
    content = (
      <Sprite
        key="c"
        texture={resolveSprite(theme.questionMark)}
        {...baseProps}
      />
    );
  }
  const [, setCursorX] = useAtom(cursorXAtom);
  const [, setCursorY] = useAtom(cursorYAtom);

  return (
    <Container
      eventMode="static"
      interactive
      x={i * theme.size}
      y={j * theme.size}
      key={`${i},${j}`}
      onrightup={() => {
        onRightClick(i, j);
      }}
      onpointerup={(e) => {
        if (e.button !== 0) return;
        if (isMove.current) return;
        if (Date.now() - touchStart.current > 300) {
          onRightClick(i, j);
        } else {
          onLeftClick(i, j);
        }
      }}
      onpointerdown={(e) => {
        isMove.current = false;
        touchStart.current = Date.now();
        startX.current = e.global.x;
        startY.current = e.global.y;
      }}
      onpointerenter={() => {
        setCursorX(i);
        setCursorY(j);
      }}
      onpointermove={(e) => {
        if (
          Math.abs(startX.current - e.global.x) > 10 ||
          Math.abs(startY.current - e.global.y) > 10
        ) {
          isMove.current = true;
        }
      }}
    >
      {base}
      {content}
      {extra}
    </Container>
  );
};

export default Board;
