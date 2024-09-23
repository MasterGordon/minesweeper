/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ServerWebSocket } from "bun";
import type { Controller, Endpoint } from "./controller/controller";
import { gameController } from "./controller/gameController";
import { db } from "./database/db";
import { userController } from "./controller/userController";

const controllers = {
  game: gameController,
  user: userController,
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
  // TODO: Remove this
  const sessionUser = userName.get(ws) || "Gordon";
  const ctx = {
    user: sessionUser,
    db,
    ws,
  };
  if (
    !message ||
    !(typeof message === "object") ||
    !("type" in message) ||
    !("payload" in message) ||
    !("id" in message)
  )
    return;
  const { type, payload, id } = message;
  if (!(typeof type === "string")) return;
  const [controllerName, action] = type.split(".");
  if (!(controllerName in controllers)) return;
  try {
    // @ts-expect-error controllers[controllerName] is a Controller
    const endpoint = controllers[controllerName][action] as Endpoint<any, any>;
    const input = endpoint.validate.parse(payload);
    const result = await endpoint.handler(input, ctx);
    ws.send(JSON.stringify({ id, payload: result }));
    return;
  } catch (_) {
    ws.send(JSON.stringify({ id, error: "Bad Request" }));
  }
};

export type Routes = typeof controllers;
