/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Controller, Endpoint } from "./controller/controller";
import { gameController } from "./controller/gameController";
import { db } from "./database/db";
import { BadRequestError } from "./errors/BadRequestError";

const controllers = {
  game: gameController,
} satisfies Record<string, Controller<any>>;

export const handleRequest = (message: unknown, sessionUser?: string) => {
  const ctx = {
    user: sessionUser,
    db,
  };
  if (
    !message ||
    !(typeof message === "object") ||
    !("type" in message) ||
    !("payload" in message)
  )
    return;
  const { type, payload } = message;
  if (!(typeof type === "string")) return;
  const [controllerName, action] = type.split(".");
  if (!(controllerName in controllers)) return;
  // @ts-expect-error controllers[controllerName] is a Controller
  const endpoint = controllers[controllerName][action] as Endpoint<any, any>;
  const input = endpoint.validate.safeParse(payload);
  if (input.success) {
    const result = endpoint.handler(input.data, ctx);
    return result;
  }
  throw new BadRequestError(input.error.message);
};

export type Routes = typeof controllers;
