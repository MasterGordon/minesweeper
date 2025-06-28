import { z } from "zod";
import { createController, createEndpoint } from "./controller";
import {
  getUserCount,
  getUserSettings,
  loginUser,
  registerUser,
  upsertUserSettings,
} from "../repositories/userRepository";
import crypto from "crypto";
import { resetSessionUser, setSessionUser } from "../router";
import { userSettings } from "../../shared/user-settings";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { getGems, removeGems } from "../repositories/gemsRepository";
import {
  getCollection,
  upsertCollection,
} from "../repositories/collectionRepository";
import { getWeight, lootboxes } from "../../shared/lootboxes";
import { round, weightedPickRandom } from "../../shared/utils";
import { emit } from "../events";
import { Game, Gems } from "../schema";
import { and, count, eq, gt, max, not, sum } from "drizzle-orm";
import dayjs from "dayjs";

const secret = process.env.SECRET!;

const signString = (payload: string) => {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
};

export const userController = createController({
  getSelf: createEndpoint(z.null(), async (_, { user }) => {
    return user || null;
  }),
  login: createEndpoint(
    z.object({ username: z.string(), password: z.string() }),
    async (input, { db, ws }) => {
      const { name: user } = await loginUser(
        db,
        input.username,
        input.password,
      );
      const session = { user, expires: Date.now() + 1000 * 60 * 60 * 24 * 14 };
      const sig = signString(JSON.stringify(session));
      setSessionUser(ws, user);
      return { token: JSON.stringify({ session, sig }) };
    },
  ),
  loginWithToken: createEndpoint(
    z.object({ token: z.string() }),
    async (input, { ws }) => {
      const { session, sig } = JSON.parse(input.token);
      const { user } = session;
      if (sig !== signString(JSON.stringify(session))) {
        return { success: false };
      }
      if (Date.now() > session.expires) {
        return { success: false };
      }
      setSessionUser(ws, user);
      return { success: true };
    },
  ),
  logout: createEndpoint(z.null(), async (_, { ws }) => {
    resetSessionUser(ws);
  }),
  register: createEndpoint(
    z.object({
      username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(15, "Username cannot be longer than 15 characters"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    }),
    async (input, { db, ws }) => {
      await registerUser(db, input.username, input.password);
      const user = input.username;
      const session = { user, expires: Date.now() + 1000 * 60 * 60 * 24 * 14 };
      const sig = signString(JSON.stringify(session));
      setSessionUser(ws, user);
      return { token: JSON.stringify({ session, sig }) };
    },
  ),
  getSettings: createEndpoint(z.null(), async (_, { db, user }) => {
    if (!user) throw new UnauthorizedError("Unauthorized");
    const settings = await getUserSettings(db, user);
    return settings;
  }),
  updateSettings: createEndpoint(
    userSettings.partial(),
    async (input, { db, user }) => {
      if (!user) throw new UnauthorizedError("Unauthorized");
      const settings = await getUserSettings(db, user);
      const newSettings = { ...settings, ...input };
      await upsertUserSettings(db, user, newSettings);
      return newSettings;
    },
  ),
  getUserCount: createEndpoint(z.null(), async (_, { db }) => {
    const count = await getUserCount(db);
    return count;
  }),
  getOwnGems: createEndpoint(z.null(), async (_, { db, user }) => {
    if (!user) throw new UnauthorizedError("Unauthorized");
    const gems = await getGems(db, user);
    return gems;
  }),
  getOwnCollection: createEndpoint(z.null(), async (_, { db, user }) => {
    if (!user) throw new UnauthorizedError("Unauthorized");
    const collection = await getCollection(db, user);
    return collection;
  }),
  selectCollectionEntry: createEndpoint(
    z.object({
      id: z.string(),
    }),
    async ({ id }, { db, user }) => {
      if (!user) throw new UnauthorizedError("Unauthorized");
      const collection = await getCollection(db, user);
      if (!collection.entries.some((e) => e.id === id)) {
        throw new Error("Entry not found");
      }
      for (const entry of collection.entries) {
        entry.selected = entry.id === id;
      }
      await upsertCollection(db, user, collection);
    },
  ),
  addCollectionEntryToShuffle: createEndpoint(
    z.object({
      id: z.string(),
    }),
    async ({ id }, { db, user }) => {
      if (!user) throw new UnauthorizedError("Unauthorized");
      const collection = await getCollection(db, user);
      const entry = collection.entries.find((e) => e.id === id);
      if (!entry) {
        throw new Error("Entry not found");
      }
      entry.selected = true;
      await upsertCollection(db, user, collection);
    },
  ),
  openLootbox: createEndpoint(
    z.object({
      id: z.string(),
    }),
    async ({ id }, { db, user }) => {
      if (!user) throw new UnauthorizedError("Unauthorized");
      const collection = await getCollection(db, user);
      const lootbox = lootboxes.find((l) => l.id === id);
      if (!lootbox) {
        throw new Error("Lootbox not found");
      }
      let itemsCopy = [...lootbox.items];
      if (lootbox.noDuplicates) {
        itemsCopy = itemsCopy.filter(
          (i) => !collection.entries.some((e) => e.id === i.id),
        );
      }
      if (itemsCopy.length === 0) {
        throw new Error("No items left");
      }
      await removeGems(db, user, lootbox.price);
      const result = weightedPickRandom(itemsCopy, (i) => getWeight(i.rarity));
      collection.entries.push({
        id: result.id,
        aquired: Date.now(),
        selected: false,
      });
      await upsertCollection(db, user, collection);
      emit({
        type: "lootboxPurchased",
        user,
        lootbox: lootbox.id,
        reward: result.id,
        rarity: result.rarity,
      });
    },
  ),
  getHeatmap: createEndpoint(
    z.object({
      id: z.string(),
    }),
    async ({ id }, { db }) => {
      const now = dayjs();
      const firstOfYear = now.startOf("year");
      const gamesOfUser = await db.query.Game.findMany({
        where: and(eq(Game.user, id), gt(Game.finished, firstOfYear.valueOf())),
      });
      const heat = Array.from<number>({
        length: now.diff(firstOfYear, "days") + 1,
      }).fill(0);
      gamesOfUser.forEach((game) => {
        const day = dayjs(game.finished).diff(firstOfYear, "days");
        heat[day] += 1;
      });
      return heat;
    },
  ),
  getProfile: createEndpoint(
    z.object({
      id: z.string(),
    }),
    async ({ id }, { db }) => {
      const [{ value: totalGames }] = await db
        .select({
          value: count(),
        })
        .from(Game)
        .where(and(eq(Game.user, id), not(eq(Game.finished, 0))));
      const [{ value: highestStage }] = await db
        .select({
          value: max(Game.stage),
        })
        .from(Game)
        .where(and(eq(Game.user, id), not(eq(Game.finished, 0))));
      const [{ value: totalStages }] = await db
        .select({
          value: sum(Game.stage),
        })
        .from(Game)
        .where(and(eq(Game.user, id), not(eq(Game.finished, 0))));
      const [{ totalGems, currentGems }] = await db
        .select({
          totalGems: Gems.totalCount,
          currentGems: Gems.count,
        })
        .from(Gems)
        .where(eq(Gems.user, id));
      return {
        totalGames,
        highestStage,
        averageStage: round(Number(totalStages) / totalGames, 3),
        totalGems,
        currentGems,
      };
    },
  ),
});
