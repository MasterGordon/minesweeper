import { ReactNode } from "react";
import { updateGame, useGame } from "./GameContext";
import { Bomb, Flag } from "lucide-react";

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
  const game = useGame();

  let content: ReactNode = "";

  if (game?.isRevealed[x][y]) {
    content = game?.isMine(x, y) ? <Bomb /> : game?.getValue(x, y).toString();
  }

  if (game?.isFlagged[x][y]) {
    content = <Flag fill="red" />;
  }
  if (content === "0") content = "";

  return (
    <div
      className="mine-button"
      style={{
        background: game?.isRevealed[x][y] ? "#444" : undefined,
        borderRight: !game?.isRevealed[x][y] ? "3px solid black" : undefined,
        borderTop: !game?.isRevealed[x][y] ? "3px solid #999" : undefined,
        borderLeft: !game?.isRevealed[x][y] ? "3px solid #999" : undefined,
        borderBottom: !game?.isRevealed[x][y] ? "3px solid black" : undefined,
        color: game?.isRevealed[x][y]
          ? colorMap[String(content)] ?? "#eee"
          : undefined,
        fontSize: Number(content) > 0 ? "1.75rem" : undefined,
        cursor: game?.isRevealed[x][y] ? "default" : "pointer",
      }}
      onMouseUp={(e) => {
        if (game?.getHasWon() || game?.isGameOver) {
          return;
        }
        if (e.button === 0) {
          // Left click
          if (!game?.isRevealed[x][y] && !game?.isFlagged[x][y]) {
            updateGame((game) => game?.reveal(x, y));
          } else {
            const neighborFlagCount = game
              ?.getNeighborFlags(x, y)
              .filter((n) => n).length;
            const value = game?.getValue(x, y);
            if (neighborFlagCount === value) {
              updateGame((game) => {
                if (!game?.isFlagged[x - 1]?.[y]) game?.reveal(x - 1, y);
                if (!game?.isFlagged[x - 1]?.[y - 1])
                  game?.reveal(x - 1, y - 1);
                if (!game?.isFlagged[x - 1]?.[y + 1])
                  game?.reveal(x - 1, y + 1);
                if (!game?.isFlagged[x]?.[y - 1]) game?.reveal(x, y - 1);
                if (!game?.isFlagged[x]?.[y + 1]) game?.reveal(x, y + 1);
                if (!game?.isFlagged[x + 1]?.[y - 1])
                  game?.reveal(x + 1, y - 1);
                if (!game?.isFlagged[x + 1]?.[y]) game?.reveal(x + 1, y);
                if (!game?.isFlagged[x + 1]?.[y + 1])
                  game?.reveal(x + 1, y + 1);
              });
            }
          }
        } else if (e.button === 2 && !game?.isRevealed[x][y]) {
          // Right click
          updateGame((game) => game?.flag(x, y));
        }
        e.preventDefault();
      }}
    >
      {content}
    </div>
  );
};
