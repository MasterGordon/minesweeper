import type { ServerGame } from "../../shared/game";

interface CreateGameOptions {
  uuid: string;
  user: string;
  width: number;
  height: number;
  mines: number;
}

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
      stage: 1,
      lastClick: [-1, -1],
      minesCount: mines,
    };
  },
};
