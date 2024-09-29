/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ServerWebSocket } from "bun";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { z, ZodType } from "zod";

interface RequestContext {
  user?: string;
  db: BunSQLiteDatabase;
  ws: ServerWebSocket<unknown>;
}

export type Endpoint<TInputSchema extends ZodType, TResponse> = {
  validate: TInputSchema;
  handler: (
    input: z.infer<TInputSchema>,
    context: RequestContext,
  ) => Promise<TResponse>;
};

export const createEndpoint = <
  TInputSchema extends ZodType,
  TResponse,
  TInput = z.infer<TInputSchema>,
>(
  validate: TInputSchema,
  handler: (input: TInput, context: RequestContext) => Promise<TResponse>,
): Endpoint<TInputSchema, TResponse> => {
  return { validate, handler };
};

export type Controller<TEndpoints extends Record<string, Endpoint<any, any>>> =
  TEndpoints;

export const createController = <
  TEndpoints extends Record<string, Endpoint<any, any>>,
>(
  endpoints: TEndpoints,
): Controller<TEndpoints> => {
  return endpoints;
};
