import { ReactNode, useRef } from "react";
import { Bomb, Flag } from "lucide-react";
import useGameStore from "./GameState";
import { useLongPress } from "@uidotdev/usehooks";

interface ButtonProps {
  x: number;
  y: number;
}

export const colorMap: Record<string, string> = {
  "1": "#049494",
  "2": "#8c9440",
  "3": "#cc6666",
  "4": "#b294bb",
  "5": "#f7c530",
  "6": "#81a2be",
  "7": "#707880",
  "8": "#b5bd68",
};

export const Button = ({ x, y }: ButtonProps) => {
  const {
    isRevealed,
    isFlagged,
    isMine,
    getValue,
    reveal,
    flag,
    getNeighborFlags,
    isGameOver,
    getHasWon,
  } = useGameStore();

  let content: ReactNode = "";

  if (isRevealed[x][y]) {
    content = isMine(x, y) ? <Bomb /> : getValue(x, y).toString();
  }

  const attrs = useLongPress(
    () => {
      if (isRevealed[x][y]) return;
      flag(x, y);
    },
    {
      threshold: 400,
    },
  );

  if (isFlagged[x][y]) {
    content = <Flag fill="red" />;
  }
  if (content === "0") content = "";
  if (
    import.meta.env.DEV &&
    window.location.href.includes("xray") &&
    isMine(x, y) &&
    !isFlagged[x][y]
  )
    content = <Bomb />;

  const touchStart = useRef<number>(0);

  return (
    <div
      className="mine-button"
      {...attrs}
      style={{
        background: isRevealed[x][y] ? "#444" : undefined,
        borderRight: !isRevealed[x][y] ? "3px solid black" : undefined,
        borderTop: !isRevealed[x][y] ? "3px solid #999" : undefined,
        borderLeft: !isRevealed[x][y] ? "3px solid #999" : undefined,
        borderBottom: !isRevealed[x][y] ? "3px solid black" : undefined,
        color: isRevealed[x][y]
          ? colorMap[String(content)] ?? "#eee"
          : undefined,
        fontSize: Number(content) > 0 ? "1.75rem" : undefined,
        cursor: isRevealed[x][y] ? "default" : "pointer",
      }}
      onMouseDown={() => {
        touchStart.current = Date.now();
      }}
      onMouseUp={(e) => {
        if (Date.now() - touchStart.current > 400 && !isRevealed[x][y]) {
          flag(x, y);
          return;
        }
        if (getHasWon() || isGameOver) {
          return;
        }
        if (e.button === 0) {
          // Left click
          if (isFlagged[x][y]) return;
          if (!isRevealed[x][y]) {
            reveal(x, y);
          } else {
            const neighborFlagCount = getNeighborFlags(x, y).filter(
              (n) => n,
            ).length;
            const value = getValue(x, y);
            if (neighborFlagCount === value) {
              if (!isFlagged[x - 1]?.[y]) if (reveal(x - 1, y)) return;
              if (!isFlagged[x - 1]?.[y - 1]) if (reveal(x - 1, y - 1)) return;
              if (!isFlagged[x - 1]?.[y + 1]) if (reveal(x - 1, y + 1)) return;
              if (!isFlagged[x]?.[y - 1]) if (reveal(x, y - 1)) return;
              if (!isFlagged[x]?.[y + 1]) if (reveal(x, y + 1)) return;
              if (!isFlagged[x + 1]?.[y - 1]) if (reveal(x + 1, y - 1)) return;
              if (!isFlagged[x + 1]?.[y]) if (reveal(x + 1, y)) return;
              if (!isFlagged[x + 1]?.[y + 1]) if (reveal(x + 1, y + 1)) return;
            }
          }
        } else if (e.button === 2 && !isRevealed[x][y]) {
          flag(x, y);
        }
        e.preventDefault();
      }}
    >
      {content}
    </div>
  );
};
