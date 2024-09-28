import { ReactNode, useEffect, useRef, useState } from "react";
import { LoadedTheme, Theme, useTheme } from "../themes/Theme";
import { Container, Sprite, Stage } from "@pixi/react";
import Viewport from "./pixi/PixiViewport";
import {
  ClientGame,
  getValue,
  isServerGame,
  ServerGame,
} from "../../shared/game";
import { useWSQuery } from "../hooks";

interface BoardProps {
  theme: Theme;
  game: ServerGame | ClientGame;
  onLeftClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
}

const Board: React.FC<BoardProps> = (props) => {
  const { game } = props;
  const { data: user } = useWSQuery("user.getSelf", null);
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const showLastPos = game.user !== user || isServerGame(game);

  useEffect(() => {
    if (!ref.current) return;
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
      }
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);
  const theme = useTheme(props.theme);
  const boardWidth = game.width * (theme?.size || 0);
  const boardHeight = game.height * (theme?.size || 0);

  return (
    <div
      className="w-full h-[70vh] overflow-hidden border-red-500 border-2 flex select-none"
      ref={ref}
    >
      {theme && (
        <Stage
          options={{ hello: true, antialias: false }}
          width={width}
          height={height}
        >
          <Viewport
            worldWidth={boardWidth}
            worldHeight={boardHeight}
            width={width}
            height={height}
            clamp={{
              left: -theme.size,
              right: boardWidth + theme.size,
              top: -theme.size,
              bottom: boardHeight + theme.size,
            }}
          >
            {game.isRevealed.map((_, i) => {
              return game.isRevealed[0].map((_, j) => {
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
                  />
                );
              });
            })}
          </Viewport>
        </Stage>
      )}
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
}

const Tile = ({
  game,
  x,
  y,
  theme,
  showLastPos,
  onRightClick,
  onLeftClick,
}: TileProps) => {
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
  const base = isRevealed ? (
    <Sprite image={theme.revealed} />
  ) : (
    <Sprite image={theme.tile} />
  );
  let content: ReactNode = null;
  if (isMine) {
    content = <Sprite image={theme.mine} />;
  } else if (value !== -1 && isRevealed) {
    const img = theme[value.toString() as keyof Theme] as string;
    content = img ? <Sprite image={img} /> : null;
  } else if (isFlagged) {
    content = <Sprite image={theme.flag} />;
  } else if (isQuestionMark) {
    content = <Sprite image={theme.questionMark} />;
  }
  const extra = isLastPos ? <Sprite image={theme.lastPos} /> : null;
  const touchStart = useRef<number>(0);
  const isMove = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

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
