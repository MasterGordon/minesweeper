import { z } from "zod";
import { createController, createEndpoint } from "./controller";
import { getScoreBoard } from "../repositories/scoreRepository";

export const scoreboardController = createController({
  getScoreBoard: createEndpoint(z.number(), async (limit, { db }) => {
    return (await getScoreBoard(db)).slice(0, limit);
  }),
});
