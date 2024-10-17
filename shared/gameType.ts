import { z } from "zod";

export const clientGame = z.object({
  user: z.string(),
  uuid: z.string(),
  width: z.number(),
  height: z.number(),
  isRevealed: z.array(z.array(z.boolean())),
  isFlagged: z.array(z.array(z.boolean())),
  isQuestionMark: z.array(z.array(z.boolean())),
  values: z.array(z.array(z.number())),
  minesCount: z.number(),
  lastClick: z.tuple([z.number(), z.number()]),
  started: z.number(),
  stage: z.number(),
  theme: z.string().default("default"),
});

export const serverGame = z.object({
  user: z.string(),
  uuid: z.string(),
  width: z.number(),
  height: z.number(),
  isRevealed: z.array(z.array(z.boolean())),
  isFlagged: z.array(z.array(z.boolean())),
  isQuestionMark: z.array(z.array(z.boolean())),
  mines: z.array(z.array(z.boolean())),
  minesCount: z.number(),
  lastClick: z.tuple([z.number(), z.number()]),
  started: z.number(),
  finished: z.number().default(0),
  stage: z.number(),
  theme: z.string().default("default"),
});

export type ClientGame = z.infer<typeof clientGame>;
export type ServerGame = z.infer<typeof serverGame>;

export interface UserCollectionEntry {
  id: string;
  aquired: number;
  selected: boolean;
}

export interface UserCollection {
  entries: UserCollectionEntry[];
}
