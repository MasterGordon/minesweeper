import type { ServerWebSocket } from "bun";

const allowCors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const userName = new WeakMap<ServerWebSocket<unknown>, string>();
const server = Bun.serve({
  async fetch(request: Request) {
    if (request.method === "OPTIONS") {
      const res = new Response("Departed", { headers: allowCors });
      return res;
    }
    if (request.url.endsWith("ws")) {
      if (server.upgrade(request)) return new Response("ok");
    }
  },
  websocket: {
    message: (ws, message) => {
      if (typeof message !== "string") {
        return;
      }
      const user = userName.get(ws);
      try {
        const msg = JSON.parse(message);
        console.log(msg);
      } catch (e) {
        console.error("Faulty request", message, e);
        return;
      }
    },
    open: async (ws) => {
      ws.subscribe("minesweeper-global");
    },
  },
  port: 8076,
});
