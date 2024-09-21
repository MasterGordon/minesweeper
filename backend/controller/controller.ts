/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { z } from "zod";

interface RequestContext {
  user?: string;
  db: BunSQLiteDatabase;
}

export type Endpoint<TInput, TResponse> = {
  validate: z.ZodType<TInput>;
  handler: (input: TInput, context: RequestContext) => Promise<TResponse>;
};

export type Request<TEndpoint extends Endpoint<any, any>> = {
  method: "POST";
  url: string;
  body: z.infer<TEndpoint["validate"]>;
};

export const createEndpoint = <TInput, TResponse>(
  validate: z.ZodType<TInput>,
  handler: (input: TInput, context: RequestContext) => Promise<TResponse>,
): Endpoint<TInput, TResponse> => {
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
