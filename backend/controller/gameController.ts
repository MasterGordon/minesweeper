import { z } from "zod";
import { createController, createEndpoint } from "./controller";
import { getGame, upsertGameState } from "../repositories/gameRepository";
import {
  serverGame,
  serverToClientGame,
  type ServerGame,
} from "../../shared/game";
import crypto from "crypto";
import { game } from "../entities/game";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { emit } from "../events";

export const gameController = createController({
  getGameState: createEndpoint(z.string(), async (uuid, ctx) => {
    const game = await getGame(ctx.db, uuid);
    const parsed = JSON.parse(game.gameState);
    const gameState = await serverGame.parseAsync(parsed);
    if (game.finished) return gameState;
    return serverToClientGame(gameState);
  }),
  createGame: createEndpoint(z.undefined(), async (_, { user, db }) => {
    if (!user) throw new UnauthorizedError("Unauthorized");
    const uuid = crypto.randomUUID() as string;
    const newGame: ServerGame = game.createGame({
      uuid,
      user: user,
      mines: 2,
      width: 4,
      height: 4,
    });
    upsertGameState(db, newGame);
    emit({
      type: "new",
      user,
    });
    emit({
      type: "updateStage",
      game: uuid,
      stage: newGame.stage,
      started: newGame.started,
    });
    return newGame;
  }),
});
