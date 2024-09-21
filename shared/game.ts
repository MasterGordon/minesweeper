import { z } from "zod";

export const clientGame = z.object({
  user: z.string(),
  uuid: z.string(),
  width: z.number(),
  height: z.number(),
  isRevealed: z.array(z.array(z.boolean())),
  isFlagged: z.array(z.array(z.boolean())),
  values: z.array(z.array(z.number())),
  minesCount: z.number(),
  lastClick: z.tuple([z.number(), z.number()]),
  started: z.number(),
  stage: z.number(),
});

export const serverGame = z.object({
  user: z.string(),
  uuid: z.string(),
  width: z.number(),
  height: z.number(),
  isRevealed: z.array(z.array(z.boolean())),
  isFlagged: z.array(z.array(z.boolean())),
  mines: z.array(z.array(z.boolean())),
  minesCount: z.number(),
  lastClick: z.tuple([z.number(), z.number()]),
  started: z.number(),
  finished: z.number().default(0),
  stage: z.number(),
});

export type ClientGame = z.infer<typeof clientGame>;
export type ServerGame = z.infer<typeof serverGame>;

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
  };
};
