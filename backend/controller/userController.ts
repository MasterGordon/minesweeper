import { z } from "zod";
import { createController, createEndpoint } from "./controller";
import { loginUser, registerUser } from "../repositories/userRepository";
import crypto from "crypto";
import { resetSessionUser, setSessionUser } from "../router";

const secret = process.env.SECRET!;

const signString = (payload: string) => {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
};

export const userController = createController({
  getSelf: createEndpoint(z.null(), async (_, { user }) => {
    return user;
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
    z.object({ username: z.string().max(15), password: z.string().min(6) }),
    async (input, { db, ws }) => {
      await registerUser(db, input.username, input.password);
      const user = input.username;
      const session = { user, expires: Date.now() + 1000 * 60 * 60 * 24 * 14 };
      const sig = signString(JSON.stringify(session));
      setSessionUser(ws, user);
      return { token: JSON.stringify({ session, sig }) };
    },
  ),
});
