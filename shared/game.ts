import type { ServerGame, ClientGame } from "./gameType";
export type { ServerGame, ClientGame } from "./gameType";

export const isServerGame = (game: ServerGame | ClientGame) => "mines" in game;
export const isClientGame = (
  game: ServerGame | ClientGame,
): game is ClientGame => !("mines" in game);

export const getValue = (mines: boolean[][], x: number, y: number) => {
  const neighbors = [
    mines[x - 1]?.[y - 1],
    mines[x]?.[y - 1],
    mines[x + 1]?.[y - 1],
    mines[x - 1]?.[y],
    mines[x + 1]?.[y],
    mines[x - 1]?.[y + 1],
    mines[x]?.[y + 1],
    mines[x + 1]?.[y + 1],
  ];
  return neighbors.filter((n) => n).length;
};

export const serverToClientGame = (game: ServerGame): ClientGame => {
  return {
    user: game.user,
    uuid: game.uuid,
    width: game.width,
    height: game.height,
    isRevealed: game.isRevealed,
    isFlagged: game.isFlagged,
    isQuestionMark: game.isQuestionMark,
    minesCount: game.minesCount,
    values: game.mines.map((_, i) =>
      game.mines[0].map((_, j) => {
        if (!game.isRevealed[i][j]) return -1;
        return getValue(game.mines, i, j);
      }),
    ),
    lastClick: game.lastClick,
    started: game.started,
    stage: game.stage,
    theme: game.theme,
  };
};
