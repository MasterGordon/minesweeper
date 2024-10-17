import type { ServerWebSocket } from "bun";
import type { Events } from "../shared/events";

const listeners = new Set<(event: Events) => void>();

export const on = (listener: (event: Events) => void) => {
  listeners.add(listener);
};

export const off = (listener: (event: Events) => void) => {
  listeners.delete(listener);
};

export const emit = (event: Events) => {
  listeners.forEach((listener) => listener(event));
};

export const emitToWS = (event: Events, ws: ServerWebSocket<unknown>) => {
  ws.send(JSON.stringify(event));
};
