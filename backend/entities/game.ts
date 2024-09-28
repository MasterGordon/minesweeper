import { getValue } from "../../shared/game";
import type { ServerGame } from "../../shared/game";

interface CreateGameOptions {
  uuid: string;
  user: string;
  width: number;
  height: number;
  mines: number;
}

const isValid = (game: ServerGame, x: number, y: number) => {
  const { width, height } = game;
  return x >= 0 && x < width && y >= 0 && y < height;
};

const getNeighborFlagCount = (game: ServerGame, x: number, y: number) => {
  const { isFlagged } = game;
  const neighbors = [
    isFlagged[x - 1]?.[y - 1],
    isFlagged[x]?.[y - 1],
    isFlagged[x + 1]?.[y - 1],
    isFlagged[x - 1]?.[y],
    isFlagged[x + 1]?.[y],
    isFlagged[x - 1]?.[y + 1],
    isFlagged[x]?.[y + 1],
    isFlagged[x + 1]?.[y + 1],
  ];
  return neighbors.filter((n) => n).length;
};

export const game = {
  createGame: (options: CreateGameOptions): ServerGame => {
    const { uuid, user, width, height, mines } = options;
    if (mines > width * height) {
      throw new Error("Too many mines");
    }

    const minesArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );
    const isRevealedArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );
    const isFlaggedArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );
    const isQuestionMarkArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );

    let remainingMines = mines;
    while (remainingMines > 0) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      if (!minesArray[x][y]) {
        minesArray[x][y] = true;
        remainingMines--;
      }
    }

    return {
      uuid,
      user,
      finished: 0,
      started: Date.now(),
      width,
      height,
      mines: minesArray,
      isRevealed: isRevealedArray,
      isFlagged: isFlaggedArray,
      isQuestionMark: isQuestionMarkArray,
      stage: 1,
      lastClick: [-1, -1],
      minesCount: mines,
    };
  },
  reveal: (serverGame: ServerGame, x: number, y: number) => {
    const { mines, isRevealed, isFlagged, isQuestionMark, finished } =
      serverGame;
    if (finished) return;
    if (isQuestionMark[x][y]) return;
    if (isFlagged[x][y]) return;
    if (!isValid(serverGame, x, y)) return;
    serverGame.lastClick = [x, y];

    if (mines[x][y]) {
      serverGame.finished = Date.now();
      return;
    }

    const value = getValue(serverGame.mines, x, y);
    const neighborFlagCount = getNeighborFlagCount(serverGame, x, y);

    if (isRevealed[x][y] && value === neighborFlagCount) {
      if (!isFlagged[x - 1]?.[y]) game.reveal(serverGame, x - 1, y);
      if (!isFlagged[x - 1]?.[y - 1]) game.reveal(serverGame, x - 1, y - 1);
      if (!isFlagged[x - 1]?.[y + 1]) game.reveal(serverGame, x - 1, y + 1);
      if (!isFlagged[x]?.[y - 1]) game.reveal(serverGame, x, y - 1);
      if (!isFlagged[x]?.[y + 1]) game.reveal(serverGame, x, y + 1);
      if (!isFlagged[x + 1]?.[y - 1]) game.reveal(serverGame, x + 1, y - 1);
      if (!isFlagged[x + 1]?.[y]) game.reveal(serverGame, x + 1, y);
      if (!isFlagged[x + 1]?.[y + 1]) game.reveal(serverGame, x + 1, y + 1);
    }

    serverGame.isRevealed[x][y] = true;

    if (value === 0 && neighborFlagCount === 0) {
      const revealNeighbors = (nx: number, ny: number) => {
        if (isValid(serverGame, nx, ny) && !isRevealed[nx]?.[ny]) {
          game.reveal(serverGame, nx, ny);
        }
      };

      revealNeighbors(x - 1, y - 1);
      revealNeighbors(x, y - 1);
      revealNeighbors(x + 1, y - 1);
      revealNeighbors(x - 1, y);
      revealNeighbors(x + 1, y);
      revealNeighbors(x - 1, y + 1);
      revealNeighbors(x, y + 1);
      revealNeighbors(x + 1, y + 1);
    }
  },
};
