import { z } from "zod";
import { createController, createEndpoint } from "./controller";
import {
  getCurrentGame,
  getGame,
  getGames,
  getTotalGamesPlayed,
  parseGameState,
  upsertGameState,
} from "../repositories/gameRepository";
import { serverToClientGame, type ServerGame } from "../../shared/game";
import crypto from "crypto";
import { game } from "../entities/game";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { emit, emitToWS } from "../events";
import { serverGame } from "../../shared/gameType";
import { pickRandom } from "../../shared/utils";
import { addGems } from "../repositories/gemsRepository";
import { getCollection } from "../repositories/collectionRepository";

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
    const collection = await getCollection(db, user);
    const newGame: ServerGame = game.createGame({
      uuid,
      user: user,
      mines: 2,
      width: 4,
      height: 4,
      theme: pickRandom(collection.entries.filter((e) => e.selected)).id,
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
    async ({ x, y }, { db, user, ws }) => {
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
          time: serverGame.finished - serverGame.started,
        });
        const reward = game.getRewards(serverGame);
        emitToWS(
          {
            type: "gemsRewarded",
            stage: serverGame.stage,
            gems: reward,
          },
          ws,
        );
        await addGems(db, user, reward);
      }
    },
  ),
  placeFlag: createEndpoint(
    z.object({ x: z.number(), y: z.number() }),
    async ({ x, y }, { db, user, ws }) => {
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
          time: serverGame.finished - serverGame.started,
        });
        const reward = game.getRewards(serverGame);
        emitToWS(
          {
            type: "gemsRewarded",
            stage: serverGame.stage,
            gems: reward,
          },
          ws,
        );
        await addGems(db, user, reward);
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
    async ({ x, y }, { db, user, ws }) => {
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
          time: serverGame.finished - serverGame.started,
        });
        const reward = game.getRewards(serverGame);
        emitToWS(
          {
            type: "gemsRewarded",
            stage: serverGame.stage,
            gems: reward,
          },
          ws,
        );
        await addGems(db, user, reward);
      }
    },
  ),
  getGames: createEndpoint(
    z.object({
      page: z.number().default(0),
      user: z.string(),
    }),
    async ({ page, user }, { db }) => {
      const perPage = 20;
      const offset = page * perPage;
      const games = await getGames(db, user);
      const parsedGames = games
        .slice(offset, offset + perPage)
        .map((game) => parseGameState(game.gameState));
      const isLastPage = games.length <= offset + perPage;
      return {
        data: parsedGames,
        nextPage: isLastPage ? undefined : page + 1,
      };
    },
  ),
  getTotalGamesPlayed: createEndpoint(
    z.object({
      user: z.string().optional(),
    }),
    async ({ user }, { db }) => {
      const total = await getTotalGamesPlayed(db, user);
      return total;
    },
  ),
});
