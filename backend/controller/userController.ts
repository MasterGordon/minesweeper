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
  updateSettings: createEndpoint(userSettings, async (input, { db, user }) => {
    if (!user) throw new UnauthorizedError("Unauthorized");
    const settings = await getUserSettings(db, user);
    const newSettings = { ...settings, ...input };
    await upsertUserSettings(db, user, input);
    return newSettings;
  }),
  getUserCount: createEndpoint(z.null(), async (_, { db }) => {
    const count = await getUserCount(db);
    return count;
  }),
});
