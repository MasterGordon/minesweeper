import { on } from "./events";
import { handleRequest } from "./router";
import promClient, { Histogram } from "prom-client";

const allowCors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

promClient.collectDefaultMetrics();

const requestDuration = new Histogram({
  name: "request_duration",
  help: "Request duration",
  labelNames: ["action"],
});
// promClient.register.registerMetric(requestDuration);

const metricsUser = process.env.METRICS_USER;
const metricsPassword = process.env.METRICS_PASSWORD;

const server = Bun.serve({
  async fetch(request: Request) {
    if (request.method === "OPTIONS") {
      const res = new Response("Departed", { headers: allowCors });
      return res;
    }
    if (request.url.endsWith("ws")) {
      if (server.upgrade(request)) return new Response("ok");
    }
    if (request.url.endsWith("metrics")) {
      const [type, auth] =
        request.headers.get("Authorization")?.split(" ") ?? [];
      const [user, password] = Buffer.from(auth, "base64")
        .toString("utf-8")
        .split(":");
      if (
        type !== "Basic" ||
        user !== metricsUser ||
        password !== metricsPassword
      ) {
        return new Response("Unauthorized", { status: 401 });
      }
      return new Response(await promClient.register.metrics());
    }
    return new Response("Not Found", { status: 404 });
  },
  websocket: {
    message: (ws, message) => {
      if (typeof message !== "string") {
        return;
      }
      try {
        const msg = JSON.parse(message);
        console.log("Received message", msg);
        const start = Date.now();
        handleRequest(msg, ws);
        const duration = Date.now() - start;
        requestDuration.observe({ action: msg.type }, duration);
      } catch (e) {
        console.error("Faulty request", message, e);
        return;
      }
    },
    open: async (ws) => {
      ws.subscribe("minesweeper-global");
    },
  },
  port: 8072,
});
on((event) => {
  server.publish("minesweeper-global", JSON.stringify(event));
});

console.log("Listening on port 8072");
