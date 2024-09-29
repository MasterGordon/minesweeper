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

const hasWon = (serverGame: ServerGame) => {
  const { mines, isRevealed, isFlagged, finished, width, height } = serverGame;
  if (finished) return false;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (!isRevealed[i][j] && !isFlagged[i][j]) return false;
      if (mines[i][j] && !isFlagged[i][j]) return false;
      if (isFlagged[i][j] && !mines[i][j]) return false;
    }
  }

  return true;
};

const expandBoard = (serverGame: ServerGame) => {
  const { width, height, stage, mines, isFlagged, isRevealed, isQuestionMark } =
    serverGame;
  let dir = stage % 2 === 0 ? "down" : "right";
  if (stage > 11) {
    dir = "down";
  }
  // Expand the board by the current board size 8x8 -> 16x8
  if (dir === "down") {
    const newHeight = Math.floor(height * 1.5);
    const newWidth = width;
    const newMinesCount = Math.floor(
      width * height * 0.5 * (0.2 + 0.003 * stage),
    );
    // expand mines array
    const newMines = Array.from({ length: newWidth }, () =>
      new Array(newHeight).fill(false),
    );
    const newIsRevealed = Array.from({ length: newWidth }, () =>
      new Array(newHeight).fill(false),
    );
    const newIsFlagged = Array.from({ length: newWidth }, () =>
      new Array(newHeight).fill(false),
    );
    const newIsQuestionMark = Array.from({ length: newWidth }, () =>
      new Array(newHeight).fill(false),
    );
    for (let i = 0; i < newWidth; i++) {
      for (let j = 0; j < newHeight; j++) {
        const x = i;
        const y = j;
        if (mines[x]?.[y]) {
          newMines[i][j] = true;
        }
        if (isRevealed[x]?.[y]) {
          newIsRevealed[i][j] = true;
        }
        if (isFlagged[x]?.[y]) {
          newIsFlagged[i][j] = true;
        }
        if (isQuestionMark[x]?.[y]) {
          newIsQuestionMark[i][j] = true;
        }
      }
    }
    // generate new mines
    let remainingMines = newMinesCount;
    while (remainingMines > 0) {
      const x = Math.floor(Math.random() * width);
      const y = height + Math.floor(Math.random() * (newHeight - height));
      if (!newMines[x][y]) {
        newMines[x][y] = true;
        remainingMines--;
      }
    }
    Object.assign(serverGame, {
      width: newWidth,
      height: newHeight,
      mines: newMines,
      minesCount: newMinesCount,
      stage: stage + 1,
      isRevealed: newIsRevealed,
      isFlagged: newIsFlagged,
      isQuestionMark: newIsQuestionMark,
    });
  }
  if (dir === "right") {
    const newWidth = Math.floor(width * 1.5);
    const newHeight = height;
    const newMinesCount = Math.floor(
      width * height * 0.5 * (0.2 + 0.003 * stage),
    );
    // expand mines array
    const newMines = Array.from({ length: newWidth }, () =>
      new Array(newHeight).fill(false),
    );
    const newIsRevealed = Array.from({ length: newWidth }, () =>
      new Array(newHeight).fill(false),
    );
    const newIsFlagged = Array.from({ length: newWidth }, () =>
      new Array(newHeight).fill(false),
    );
    const newIsQuestionMark = Array.from({ length: newWidth }, () =>
      new Array(newHeight).fill(false),
    );
    for (let i = 0; i < newWidth; i++) {
      for (let j = 0; j < newHeight; j++) {
        const x = i;
        const y = j;
        if (mines[x]?.[y]) {
          newMines[i][j] = true;
        }
        if (isRevealed[x]?.[y]) {
          newIsRevealed[i][j] = true;
        }
        if (isFlagged[x]?.[y]) {
          newIsFlagged[i][j] = true;
        }
        if (isQuestionMark[x]?.[y]) {
          newIsQuestionMark[i][j] = true;
        }
      }
    }
    // generate new mines
    let remainingMines = newMinesCount;
    while (remainingMines > 0) {
      const x = width + Math.floor(Math.random() * (newWidth - width));
      const y = Math.floor(Math.random() * height);
      if (!newMines[x][y]) {
        newMines[x][y] = true;
        remainingMines--;
      }
    }
    Object.assign(serverGame, {
      width: newWidth,
      height: newHeight,
      mines: newMines,
      minesCount: newMinesCount,
      stage: stage + 1,
      isRevealed: newIsRevealed,
      isFlagged: newIsFlagged,
      isQuestionMark: newIsQuestionMark,
    });
  }
  const newMinesCount = serverGame.mines.flat().filter((m) => m).length;
  Object.assign(serverGame, { minesCount: newMinesCount });
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
  reveal: (serverGame: ServerGame, x: number, y: number, initial = false) => {
    const aux = (
      serverGame: ServerGame,
      x: number,
      y: number,
      initial: boolean = false,
    ) => {
      const { mines, isRevealed, isFlagged, isQuestionMark, finished } =
        serverGame;
      if (finished) return;
      if (!isValid(serverGame, x, y)) return;
      if (isQuestionMark[x][y]) return;
      if (isFlagged[x][y]) return;
      serverGame.lastClick = [x, y];

      if (mines[x][y]) {
        serverGame.finished = Date.now();
        return;
      }

      const value = getValue(serverGame.mines, x, y);
      const neighborFlagCount = getNeighborFlagCount(serverGame, x, y);

      if (isRevealed[x][y] && value === neighborFlagCount && initial) {
        if (!isFlagged[x - 1]?.[y]) aux(serverGame, x - 1, y);
        if (!isFlagged[x - 1]?.[y - 1]) aux(serverGame, x - 1, y - 1);
        if (!isFlagged[x - 1]?.[y + 1]) aux(serverGame, x - 1, y + 1);
        if (!isFlagged[x]?.[y - 1]) aux(serverGame, x, y - 1);
        if (!isFlagged[x]?.[y + 1]) aux(serverGame, x, y + 1);
        if (!isFlagged[x + 1]?.[y - 1]) aux(serverGame, x + 1, y - 1);
        if (!isFlagged[x + 1]?.[y]) aux(serverGame, x + 1, y);
        if (!isFlagged[x + 1]?.[y + 1]) aux(serverGame, x + 1, y + 1);
      }

      serverGame.isRevealed[x][y] = true;

      if (value === 0 && neighborFlagCount === 0) {
        const revealNeighbors = (nx: number, ny: number) => {
          if (isValid(serverGame, nx, ny) && !isRevealed[nx]?.[ny]) {
            aux(serverGame, nx, ny);
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
    };
    aux(serverGame, x, y, initial);
    if (hasWon(serverGame)) {
      expandBoard(serverGame);
    }
  },
  placeFlag: (serverGame: ServerGame, x: number, y: number) => {
    const { isRevealed, finished } = serverGame;
    if (finished) return;
    if (!isValid(serverGame, x, y)) return;
    if (isRevealed[x][y]) return;
    serverGame.isFlagged[x][y] = true;
    if (hasWon(serverGame)) {
      expandBoard(serverGame);
    }
  },
  placeQuestionMark: (serverGame: ServerGame, x: number, y: number) => {
    const { isRevealed, finished } = serverGame;
    if (finished) return;
    if (!isValid(serverGame, x, y)) return;
    if (isRevealed[x][y]) return;
    serverGame.isQuestionMark[x][y] = true;
  },
  clearTile: (serverGame: ServerGame, x: number, y: number) => {
    const { isRevealed, finished } = serverGame;
    if (finished) return;
    if (!isValid(serverGame, x, y)) return;
    if (isRevealed[x][y]) return;
    serverGame.isFlagged[x][y] = false;
    serverGame.isQuestionMark[x][y] = false;
    if (hasWon(serverGame)) {
      expandBoard(serverGame);
    }
  },
};
