import { z } from "zod";
import { createController, createEndpoint } from "./controller";
import {
  getCurrentGame,
  getGame,
  parseGameState,
  upsertGameState,
} from "../repositories/gameRepository";
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
    const parsed = parseGameState(game.gameState);
    const gameState = await serverGame.parseAsync(parsed);
    if (game.finished) return gameState;
    return serverToClientGame(gameState);
  }),
  createGame: createEndpoint(z.null(), async (_, { user, db }) => {
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
  reveal: createEndpoint(
    z.object({ x: z.number(), y: z.number() }),
    async ({ x, y }, { db, user }) => {
      if (!user) throw new UnauthorizedError("Unauthorized");
      const dbGame = await getCurrentGame(db, user);
      const serverGame = parseGameState(dbGame.gameState);
      const ts = serverGame.finished;
      game.reveal(serverGame, x, y, true);
      await upsertGameState(db, serverGame);
      emit({
        type: "updateGame",
        game: dbGame.uuid,
      });
      if (ts === 0 && serverGame.finished !== 0) {
        emit({
          type: "loss",
          stage: serverGame.stage,
          user,
        });
      }
    },
  ),
  placeFlag: createEndpoint(
    z.object({ x: z.number(), y: z.number() }),
    async ({ x, y }, { db, user }) => {
      if (!user) throw new UnauthorizedError("Unauthorized");
      const dbGame = await getCurrentGame(db, user);
      const serverGame = parseGameState(dbGame.gameState);
      const ts = serverGame.finished;
      game.placeFlag(serverGame, x, y);
      await upsertGameState(db, serverGame);
      emit({
        type: "updateGame",
        game: dbGame.uuid,
      });
      if (ts === 0 && serverGame.finished !== 0) {
        emit({
          type: "loss",
          stage: serverGame.stage,
          user,
        });
      }
    },
  ),
  placeQuestionMark: createEndpoint(
    z.object({ x: z.number(), y: z.number() }),
    async ({ x, y }, { db, user }) => {
      if (!user) throw new UnauthorizedError("Unauthorized");
      const dbGame = await getCurrentGame(db, user);
      const serverGame = parseGameState(dbGame.gameState);
      game.placeQuestionMark(serverGame, x, y);
      await upsertGameState(db, serverGame);
      emit({
        type: "updateGame",
        game: dbGame.uuid,
      });
    },
  ),
  clearTile: createEndpoint(
    z.object({ x: z.number(), y: z.number() }),
    async ({ x, y }, { db, user }) => {
      if (!user) throw new UnauthorizedError("Unauthorized");
      const dbGame = await getCurrentGame(db, user);
      const serverGame = parseGameState(dbGame.gameState);
      const ts = serverGame.finished;
      game.clearTile(serverGame, x, y);
      upsertGameState(db, serverGame);
      emit({
        type: "updateGame",
        game: dbGame.uuid,
      });
      if (ts === 0 && serverGame.finished !== 0) {
        emit({
          type: "loss",
          stage: serverGame.stage,
          user,
        });
      }
    },
  ),
});
