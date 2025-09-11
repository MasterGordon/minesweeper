/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ServerWebSocket } from "bun";
import type { Controller, Endpoint } from "./controller/controller";
import { gameController } from "./controller/gameController";
import { db } from "./database/db";
import { userController } from "./controller/userController";
import { ZodError } from "zod";
import { scoreboardController } from "./controller/scoreboardController";

const controllers = {
  game: gameController,
  user: userController,
  scoreboard: scoreboardController,
} satisfies Record<string, Controller<any>>;

const userName = new WeakMap<ServerWebSocket<unknown>, string>();

export const setSessionUser = (ws: ServerWebSocket<unknown>, user: string) => {
  userName.set(ws, user);
};

export const resetSessionUser = (ws: ServerWebSocket<unknown>) => {
  userName.delete(ws);
};

export const handleRequest = async (
  message: unknown,
  ws: ServerWebSocket<unknown>,
) => {
  const sessionUser = userName.get(ws) || undefined;
  const ctx = {
    user: sessionUser,
    db,
    ws,
  };
  if (
    !message ||
    !(typeof message === "object") ||
    !("type" in message) ||
    !("id" in message)
  )
    return;
  const { type, id } = message;
  if (!(typeof type === "string")) return;

  // Handle ping message
  if (type === 'ping') {
    ws.send(JSON.stringify({ type: 'pong', id }));
    return;
  }

  if (!("payload" in message)) return;
  const { payload } = message;
  const [controllerName, action] = type.split(".");
  if (!(controllerName in controllers)) return;
  try {
    // @ts-expect-error controllers[controllerName] is a Controller
    const endpoint = controllers[controllerName][action] as Endpoint<any, any>;
    const input = endpoint.validate.parse(payload);
    console.time(action);
    const result = await endpoint.handler(input, ctx);
    ws.send(JSON.stringify({ id, payload: result }));
    console.timeEnd(action);
    return;
  } catch (e) {
    if (e instanceof ZodError) {
      ws.send(
        JSON.stringify({ id, error: e.issues[0].message, type: message.type }),
      );
    } else if (e instanceof Error) {
      ws.send(JSON.stringify({ id, error: e.message, type: message.type }));
    } else {
      ws.send(JSON.stringify({ id, error: "Bad Request", type: message.type }));
    }
    console.error(e);
  }
};

export type Routes = typeof controllers;
